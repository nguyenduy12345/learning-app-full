import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import randomstring from "randomstring";
import { v2 as cloudinary } from "cloudinary";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import sendEmail from "../services/mail.js";
import formatDate from "../functions/formatDate.js";
import verifyTokenGoogle from "../services/verifyTokenGoogle.js";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

import {
  findUserByEmail,
  createUser,
  findUser,
  findAllUser,
  findUserAndUpdate,
  findUserById,
  findOneUserByFacebookIdOrGoogleId,
} from "../repositories/user.repository.js";
import { createSummaryLessonByUserId } from "../repositories/summaryLesson.repository.js";


export const register = async (req, res) => {
  const { fullName, email, password, role } = req.body;
  try {
    const checkUser = await findUserByEmail(email);
    if (checkUser) throw new Error(req.translate("user.emailExisted"));
    const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS);
    const hash = bcrypt.hashSync(password, salt);
    const currentDay = formatDate();
    const newUser = await createUser({
      fullName,
      email,
      password: hash,
      role: role && role,
      activeDays: [currentDay]
    });
    const { _id } = newUser;
    const userObj = newUser.toObject();
    delete userObj.password;
    await createSummaryLessonByUserId({ userId: _id });
    res.status(201).send({
      message: req.translate("validation.add.success", {
        field: req.translate("user.account"),
      }),
      userObj,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUser({ email });
    if (!user) throw new Error(req.translate("user.wrong"));
    const checkPassword = bcrypt.compareSync(
      password.toString(),
      user.password
    );
    if (!checkPassword) throw new Error(req.translate("user.wrong"));
    if (user.status === 0) throw new Error(req.translate("user.banned"));
    const { _id  } = user;
    const accessToken = jwt.sign({ _id }, process.env.ACCESS_TK_KEY);
    const refreshToken = jwt.sign({ _id }, process.env.REFRESH_TK_KEY);
    res.status(201).send({
      message: req.translate("user.success"),
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};

export const handleLoginWithGoogle = async (req, res) => {
  const { token } = req.body;
  try {
    const payload = await verifyTokenGoogle(token)
    const { sub, email, name, picture } = payload
    const account = await findOneUserByFacebookIdOrGoogleId({ email })
    if (!account) {
      const newUser = await createUser({
        fullName: name,
        email,
        avatar: picture,
        googleId: sub,
      });
      const { _id } = newUser
      const access_token = jwt.sign({ _id }, process.env.ACCESS_TK_KEY);
      const refresh_token = jwt.sign({ _id }, process.env.REFRESH_TK_KEY);
      await createSummaryLessonByUserId({ userId: _id })
      res.status(201).send({
        message: req.translate("user.success"),
        data: {
          accessToken: access_token,
          refreshToken: refresh_token
        }
      });
      return
    }
    const { _id } = account
    if (!account.googleId) {
      account.googleId = sub;
      await account.save()
    }
    if (account.status === 0) throw new Error(req.translate("user.banned"));
    const access_token = jwt.sign({ _id }, process.env.ACCESS_TK_KEY);
    const refresh_token = jwt.sign({ _id }, process.env.REFRESH_TK_KEY);
    res.status(201).send({
      message: req.translate("user.success"),
      data: {
        accessToken: access_token,
        refreshToken: refresh_token
      }
    })
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const handleLoginWithFacebook = async (req, res) => {
  const { accessToken } = req.body;
  try {
    const getLongToken =
      await axios.get(`https://graph.facebook.com/v21.0/oauth/access_token?  
    grant_type=fb_exchange_token&          
    client_id=${process.env.APP_ID_FACEBOOK}&
    client_secret=${process.env.SECRET_FACEBOOK}&
    fb_exchange_token=${accessToken}`);
    const getUserData = await axios.get(
      `https://graph.facebook.com/me?access_token=${getLongToken.data.access_token}&fields=id,name,email,picture`
    );
    const { id, name, email } = getUserData.data;
    const largeProfilePictureUrl = await axios.get(`https://graph.facebook.com/v2.8/me?fields=id,name,picture.type(large)&access_token=${accessToken}`);
    const account = await findOneUserByFacebookIdOrGoogleId({ email })
    if (!account) {
      const newUser = await createUser({
        fullName: name,
        email,
        avatar: largeProfilePictureUrl.data.picture.data.url,
        facebookId: id,
      });
      const { _id } = newUser
      const access_token = jwt.sign({ _id }, process.env.ACCESS_TK_KEY);
      const refresh_token = jwt.sign({ _id }, process.env.REFRESH_TK_KEY);
      await createSummaryLessonByUserId({ userId: _id })
      res.status(201).send({
        message: req.translate("user.success"),
        data: {
          accessToken: access_token,
          refreshToken: refresh_token
        }
      });
      return
    }
    const { _id } = account
    if (!account.facebookId) {
      account.facebookId = id;
      await account.save()
    }
    if (account.status === 0) throw new Error(req.translate("user.banned"));
    const access_token = jwt.sign({_id}, process.env.ACCESS_TK_KEY);
    const refresh_token = jwt.sign({_id}, process.env.REFRESH_TK_KEY);
    res.status(201).send({
      message: req.translate("user.success"),
      data: {
        accessToken: access_token,
        refreshToken: refresh_token
      }
    })
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const profile = async (req, res) => {
  try {
    const user = req.currentUser;
    if (!user) throw new Error(req.translate("unauthorized"));
    res.status(200).send({
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(403).send({
      message: error.message,
    });
  }
};
export const getUsers = async (req, res) => {
  try {
    const limit = 20
    const users = await findAllUser(limit);
    res.status(200).send({
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};
export const handleChangeAvatar = async (req, res) => {
  const { _id } = req.currentUser;
  const file = req.file;
  try {
    let urlImage;
    const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString(
      "base64"
    )}`;
    const fileName = file.originalname.split(".")[0];
    await cloudinary.uploader.upload(
      dataUrl,
      {
        public_id: fileName,
        resource_type: "auto",
      },
      (err, result) => {
        if (err) throw new Error(req.translate("user.updateAvatarFailed"));
        if (result) {
          urlImage = result.secure_url;
          return urlImage;
        }
      }
    );
    await findUserAndUpdate(
      {
        _id,
      },
      {
        avatar: urlImage,
      }
    );
    res.status(201).send({
      message: req.translate("user.updateAvatarSuccess"),
      avatar: urlImage,
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};
export const updateInformationUser = async (req, res) => {
  const { _id } = req.currentUser;
  const { fullName, sex } = req.body;
  try {
    const user = await findUserById(_id);
    user.fullName = fullName;
    user.sex = sex;
    await user.save();
    res.status(201).send({
      message: req.translate("validation.update.success", {
        field: req.translate("user.information"),
      }),
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};

export const updateHeartExperienceGemDayStreakUser = async (req, res) => {
  const { _id } = req.currentUser;
  const { hearts, turns, experiences, gems } = req.body;
  try {
    const findUser = await findUserById(_id);
    if (hearts) {
      findUser.hearts = (hearts && findUser.hearts - 1) || findUser.hearts;
      await findUser.save();
      res.status(201).send({
        message: req.translate("validation.update.success", {
          field: req.translate("user.information"),
        }),
      });
      return;
    }
    const currentDay = formatDate();
    const findActiveDay = findUser.activeDays.includes(currentDay);
    findUser.hearts = (turns && findUser.hearts + +turns) || findUser.hearts;
    findUser.experiences =
      (experiences && +experiences + +findUser.experiences) ||
      findUser.experiences;
    findUser.gems = (gems && +gems + +findUser.gems) || findUser.gems;
    !findActiveDay && findUser.activeDays.push(currentDay);
    await findUser.save();
    res.status(201).send({
      message: req.translate("validation.update.success", {
        field: req.translate("user.information"),
      }),
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};

export const handleChangePassword = async (req, res) => {
  const { _id } = req.currentUser;
  const { password, newPassword } = req.body;
  try {
    const user = await findUser({ _id });
    const checkPassword = bcrypt.compareSync(
      password.toString(),
      user.password
    );
    if (!checkPassword)
      throw new Error(
        req.translate("validation.check.failed", {
          field: req.translate("user.password"),
        })
      );
    const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS);
    const hash = bcrypt.hashSync(newPassword.toString(), salt);
    user.password = hash;
    await user.save();
    res.status(201).send({
      message: req.translate("validation.update.success", {
        field: req.translate("user.password"),
      }),
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const handleForgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const newPassword = randomstring.generate(7);
    const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS);
    const hash = bcrypt.hashSync(newPassword, salt);
    const user = await findUserByEmail(email);
    if (!user)
      throw new Error(
        req.translate("validation.find.failed", {
          field: req.translate("user.account"),
        })
      );
    user.password = hash;
    await user.save();
    await sendEmail(email, newPassword);
    res.status(201).send({
      message: req.translate("validation.send.success", {
        field: req.translate("user.new.password"),
      }),
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
