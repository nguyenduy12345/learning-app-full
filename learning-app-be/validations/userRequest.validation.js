import Joi from "joi";
import jwt from "jsonwebtoken";

import { getValidationError } from "../utils/joi.utils.js";
export const validateRegisterRequest = async (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string()
      .pattern(
        new RegExp(
          "^[A-Za-zÀ-ÿáàảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờở̃ỡợùúủũụưứừửữựỳýỷỹỵđĐ0-9]+(?: [A-Za-zÀ-ÿáàảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờở̃ỡợùúủũụưứừửữựỳýỷỹỵđĐ0-9]+)*$"
        )
      )
      .max(255)
      .required()
      .messages({
        "any.required": req.translate("validation.required", {
          field: req.translate("user.fullName"),
        }),
        "string.max": req.translate("validation.maxLength", {
          field: req.translate("user.fullName"),
          value: 255,
        }),
        "string.pattern.base": req.translate("validation.invalid", {
          field: req.translate("user.fullName"),
        }),
      }),
    email: Joi.string()
      .email()
      .max(255)
      .required()
      .messages({
        "any.required": req.translate("validation.required", {
          field: req.translate("user.email"),
        }),
        "string.email": req.translate("user.invalidEmail"),
        "string.max": req.translate("validation.maxLength", {
          field: req.translate("user.email"),
          value: 255,
        }),
      }),
    password: Joi.string()
      .pattern(new RegExp('^[A-Za-z0-9!@#$%^&*(),.?":{}|<>_-]+$'))
      .min(6)
      .max(255)
      .required()
      .messages({
        "any.required": req.translate("validation.required", {
          field: req.translate("user.password"),
        }),
        "string.empty": req.translate("validation.required", {
          field: req.translate("user.password"),
        }),
        "string.pattern.base": req.translate("validation.invalid", {
          field: req.translate("user.password"),
        }),
        "string.max": req.translate("validation.maxLength", {
          field: req.translate("user.password"),
          value: 255,
        }),
        "string.min": req.translate("validation.minLength", {
          field: req.translate("user.password"),
          value: 6,
        }),
      }),
    role: Joi.array(),
  }).options({
    abortEarly: false,
  });
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).send(getValidationError(error));
  }
};

export const validateLoginRequest = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .max(255)
      .messages({
        "any.required": req.translate("validation.required", {
          field: req.translate("user.email"),
        }),
        "string.email": req.translate("user.invalidEmail"),
        "string.max": req.translate("validation.maxLength", {
          field: req.translate("user.email"),
          value: 255,
        }),
      }),
    password: Joi.string()
      .required()
      .max(255)
      .messages({
        "any.required": req.translate("validation.required", {
          field: req.translate("user.password"),
        }),
        "string.max": req.translate("validation.maxLength", {
          field: req.translate("user.password"),
          value: 255,
        }),
      }),
  }).options({
    abortEarly: false,
  });
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).send(getValidationError(error));
  }
};
export const validateUpdateUserRequest = async (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string()
      .pattern(
        new RegExp(
          "^[A-Za-zÀ-ÿáàảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờở̃ỡợùúủũụưứừửữựỳýỷỹỵđĐ0-9]+(?: [A-Za-zÀ-ÿáàảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờở̃ỡợùúủũụưứừửữựỳýỷỹỵđĐ0-9]+)*$"
        )
      )
      .required()
      .max(255)
      .empty("")
      .messages({
        "any.required": req.translate("validation.required", {
          field: req.translate("user.fullName"),
        }),
        "string.max": req.translate("validation.maxLength", {
          field: req.translate("user.fullName"),
          value: 255,
        }),
        "string.empty": req.translate("validation.required", {
          field: req.translate("user.fullName"),
        }),
        "string.pattern.base": req.translate("validation.invalid", {
          field: req.translate("user.fullName"),
        }),
      }),
    sex: Joi.string()
      .required()
      .valid(0, 1)
      .empty("")
      .messages({
        "any.required": req.translate("validation.required", {
          field: req.translate("user.sex"),
        }),
        "string.max": req.translate("validation.maxLength", {
          field: req.translate("user.sex"),
          value: 1,
        }),
        "string.empty": req.translate("validation.required", {
          field: req.translate("user.sex"),
        }),
        "any.only": req.translate("validation.invalid", {
          field: req.translate("user.sex"),
        }),
      }),
  }).options({
    abortEarly: false,
  });
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).send(getValidationError(error));
  }
};
export const validateUpdateAvatarRequest = async (req, res, next) => {
  const schema = Joi.object({
    mimetype: Joi.string()
      .required()
      .valid(
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/tiff",
        "image/jpg"
      )
      .messages({
        "any.required": req.translate("validation.required", {
          field: req.translate("user.avatar"),
        }),
        "any.only": req.translate("validation.file.image", {
          field: req.translate("user.avatar"),
        }),
      }),
  }).options({
    abortEarly: false,
  });
  try {
    const file = req.file;
    const mimetype = file?.mimetype;
    await schema.validateAsync({ mimetype });
    next();
  } catch (error) {
    res.status(400).send(getValidationError(error));
  }
};
export const validateUserChangePassword = async (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string()
      .pattern(new RegExp('^[A-Za-z0-9!@#$%^&*(),.?":{}|<>_-]+$'))
      .empty("")
      .max(255)
      .required()
      .messages({
        "any.required": req.translate("validation.required", {
          field: req.translate("user.password"),
        }),
        "string.pattern.base": req.translate("validation.invalid", {
          field: req.translate("user.password"),
        }),
        "string.empty": req.translate("validation.required", {
          field: req.translate("user.password"),
        }),
        "string.max": req.translate("validation.maxLength", {
          field: req.translate("user.password"),
          value: 255,
        }),
      }),
    newPassword: Joi.string()
      .pattern(new RegExp('^[A-Za-z0-9!@#$%^&*(),.?":{}|<>_-]+$'))
      .empty("")
      .required()
      .max(255)
      .min(6)
      .messages({
        "any.required": req.translate("validation.required", {
          field: req.translate("user.new.password"),
        }),
        "string.pattern.base": req.translate("validation.invalid", {
          field: req.translate("user.new.password"),
        }),
        "string.empty": req.translate("validation.required", {
          field: req.translate("user.new.password"),
        }),
        "string.max": req.translate("validation.maxLength", {
          field: req.translate("user.new.password"),
          value: 255,
        }),
        "string.min": req.translate("validation.minLength", {
          field: req.translate("user.password"),
          value: 6,
        }),
      }),
  }).options({
    abortEarly: false,
  });
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).send(getValidationError(error));
  }
};

export const validateForgotPasswordRequest = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .empty("")
      .required()
      .messages({
        "any.required": req.translate("validation.required", {
          field: req.translate("user.email"),
        }),
        "string.email": req.translate("user.invalidEmail"),
        "string.empty": req.translate("validation.required", {
          field: req.translate("user.email"),
        }),
      }),
  }).options({
    abortEarly: false,
  });
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).send(getValidationError(error));
  }
};
export const validateTokenRequest = async (req, res, next) => {
  const schema = Joi.object({
    token: Joi.string()
      .required()
      .messages({
        "any.required": req.translate("tokenInvalid"),
      }),
  }).options({
    abortEarly: false,
  });
  try {
    const { token } = req.body;
    await schema.validateAsync({ token });
    const verifyToken = jwt.verify(token, process.env.REFRESH_TK_KEY);
    const { _id } = verifyToken;
    req.token = { _id, token };
    next();
  } catch (error) {
    res.status(400).send({
      message: req.translate("tokenInvalid"),
    });
  }
};
