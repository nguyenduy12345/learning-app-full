import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});
//User
import {
  adminFindUsers,
  findUserAndUpdate,
  countUsers,
} from "../repositories/user.repository.js";
//Course
import {
  adminFindCourses,
  createCourse,
  findOneAndUpdateCourse,
  findCourseById,
} from "../repositories/course.repository.js";
//Section
import {
  adminFindSectionByCourseId,
  createSection,
  findOneAndUpdateSection,
  findSectionById,
} from "../repositories/section.repository.js";
//Milestone
import {
  adminFindMilestoneBySectionId,
  getMilestoneById,
  createMilestone,
  findOneAndUpdateMilestone,
} from "../repositories/milestone.repository.js";
//Lesson
import {
  createLesson,
  findLessonById,
  adminFindLessonsBySectionAndMilestoneId,
  findOneAndUpdateLesson,
} from "../repositories/lesson.repository.js";
//Question
import { createNewQuestion, findQuestionByIdAndUpdate } from "../repositories/question.repository.js";
//Misson 
import { createNewMisson, findMissonById, findOneAndUpdateMisson, adminFindMissons } from "../repositories/misson.respository.js";

// User:
export const adminGetAllUsers = async (req, res) => {
  const { page, pageSize } = req.query;
  try {
    let perPage = pageSize ? pageSize : 50;
    const skip = +page ? (+page - 1) * +perPage : 0;
    const limit = +perPage;
    const users = await adminFindUsers(skip, limit, { updatedAt: -1 });
    const count = await countUsers();
    const countPage = Math.ceil(+count / +pageSize);
    res.status(200).send({
      data: {
        countPage,
        users,
      },
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};

export const adminHandleBanAccount = async (req, res) => {
  const { userId } = req.params;
  const { ban } = req.query;
  try {
    const result = await findUserAndUpdate(
      {
        _id: userId,
      },
      {
        status: ban === "true" ? 0 : 2,
      }
    );
    if (!result)
      throw new Error(
        req.translate("validation.update.failed", {
          field: req.translate("user.status"),
        })
      );
    res.status(200).send({
      message: req.translate("validation.update.success", {
        field: req.translate("user.status"),
      }),
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};

// Course :
export const getAllCourse = async (req, res) => {
  try {
    const courses = await adminFindCourses();
    res.status(200).send({
      data: {
        courses,
      },
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
export const adminHandleCreateCourse = async (req, res) => {
  const file = req.file;
  const { name } = req.body;
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
        if (err)
          throw new Error(
            req.translate("validation.add.failed", {
              field: req.translate("image"),
            })
          );
        if (result) {
          urlImage = result.secure_url;
          return urlImage;
        }
      }
    );
    const course = await createCourse({
      name,
      image: urlImage,
    });
    const courses = await adminFindCourses();
    if (!course)
      throw new Error(
        req.translate("validation.add.failed", {
          field: req.translate("course"),
        })
      );
    res.status(201).send({
      message: req.translate("validation.add.success", {
        field: req.translate("course"),
      }),
      data: { courses },
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};
export const adminHandleUpdateStatusCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const result = await findOneAndUpdateCourse(
      {
        _id: courseId,
      },
      {
        deleted: true
      }
    );
    if (!result)
      throw new Error(
        req.translate("validation.delete.failed", {
          field: req.translate("course"),
        })
      );
    res.status(201).send({
      message: req.translate("validation.delete.success", {
        field: req.translate("course"),
      }),
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};
export const adminHandleUpdateInfomationCourse = async (req, res) => {
  const { courseId } = req.params;
  const file = req.file;
  const { name } = req.body;
  try {
    if (!file && !name)
      throw new Error(
        req.translate("validation.update.failed", {
          field: req.translate("course"),
        })
      );
    let urlImage;
    if (file) {
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
          if (err)
            throw new Error(
              req.translate("validation.update.failed", {
                field: req.translate("image"),
              })
            );
          if (result) {
            urlImage = result.secure_url;
            return urlImage;
          }
        }
      );
    }
    const course = await findCourseById(courseId);
    if (!course)
      throw new Error(
        req.translate("validation.find.failed", {
          field: req.translate("course"),
        })
      );
    course.name = name ? name : course.name;
    course.image = file ? urlImage : course.image;
    await course.save();
    res.status(201).send({
      message: req.translate("validation.update.success", {
        field: req.translate("course"),
      }),
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};
// Section:
export const getAllSection = async (req, res) => {
  const { courseId } = req.query;
  try {
    const sections = await adminFindSectionByCourseId({ courseId, deleted: false });
    res.status(200).send({
      data: {
        sections,
      },
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};

export const adminHandleCreateSection = async (req, res) => {
  const { name } = req.body;
  const { courseId } = req.query;
  try {
    const section = await createSection({
      name,
      courseId,
    });
    if (!section)
      throw new Error(
        req.translate("validation.add.failed", {
          field: req.translate("section"),
        })
      );
    const sections = await adminFindSectionByCourseId({ courseId, deleted: false });
    res.status(201).send({
      message: req.translate("validation.add.success", {
        field: req.translate("section"),
      }),
      data: { sections },
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};
export const adminHandleUpdateSection = async (req, res) => {
  const { sectionId } = req.params;
  const { deleted } = req.query;
  const { name } = req.body;
  try {
    if (name) {
      const section = await findSectionById(sectionId);
      if (!section) throw new Error(req.translate("section.findFalied"));
      section.name = name;
      await section.save();
      res.status(201).send({
        message: req.translate("validation.update.success", {
          field: req.translate("section"),
        }),
      });
      return;
    }
    if (deleted) {
      const result = await findOneAndUpdateSection(
        {
          _id: sectionId,
        },
        {
          deleted: deleted === "true" ? true : false,
        }
      );
      if (!result)
        throw new Error(
          req.translate("validation.delete.failed", {
            field: req.translate("section"),
          })
        );
      res.status(201).send({
        message: req.translate("validation.delete.success", {
          field: req.translate("section"),
        }),
      });
    }
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};

// Milestone
export const getAllMilestoneBySectionId = async (req, res) => {
  const { sectionId } = req.query;
  try {
    const milestones = await adminFindMilestoneBySectionId({ sectionId, deleted: false });
    res.status(200).send({
      data: {
        milestones,
      },
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};

export const adminHandleCreateMilestone = async (req, res) => {
  const { sectionId } = req.query;
  const { name } = req.body;
  try {
    const milestone = await createMilestone({
      name,
      sectionId,
    });
    if (!milestone)
      throw new Error(
        req.translate("validation.add.failed", {
          field: req.translate("milestone"),
        })
      );
    const milestones = await adminFindMilestoneBySectionId({ sectionId, deleted: false });
    res.status(201).send({
      message: req.translate("validation.add.success", {
        field: req.translate("milestone"),
      }),
      data: { milestones },
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};
export const adminHandleUpdateMilestone = async (req, res) => {
  const { milestoneId } = req.params;
  const { deleted } = req.query;
  const { name } = req.body;
  try {
    if (name) {
      const milestone = await getMilestoneById(milestoneId);
      if (!milestone) throw new Error(req.translate("milestone.findFalied"));
      milestone.name = name;
      await milestone.save();
      res.status(201).send({
        message: req.translate("validation.update.success", {
          field: req.translate("milestone"),
        }),
      });
      return;
    }
    if (deleted) {
      const result = await findOneAndUpdateMilestone(
        {
          _id: milestoneId,
        },
        {
          deleted: deleted === "true" ? true : false,
        }
      );
      if (!result)
        throw new Error(
          req.translate("validation.delete.failed", {
            field: req.translate("milestone"),
          })
        );
      res.status(201).send({
        message: req.translate("validation.delete.success", {
          field: req.translate("milestone"),
        }),
      });
    }
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};

// Lesson:
export const getAllLessonBySectionIdAndMilestoneId = async (req, res) => {
  const { sectionId, milestoneId } = req.query;
  try {
    const lessons = await adminFindLessonsBySectionAndMilestoneId({
      sectionId,
      milestoneId,
      deleted: false
    }).populate({
      path: 'questions.question',
      match: { deleted: false }
    });
    res.status(200).send({
      data: {
        lessons,
      },
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};

export const adminHandleCreateLesson = async (req, res) => {
  const {data} = req.body;
  const { name, experiences, gems, milestoneId, sectionId, questions} = data
  try {
    const lesson = await createLesson({
      name,
      experiences,
      gems,
      sectionId,
      milestoneId,
      questions
    });
    if (!lesson)
      throw new Error(
        req.translate("validation.add.failed", {
          field: req.translate("lesson"),
        })
      );
    const lessons = await adminFindLessonsBySectionAndMilestoneId({
      sectionId,
      milestoneId,
      deleted: false
    }).populate({
      path: 'questions.question',
      match: { deleted: false }
    });
    res.status(201).send({
      message: req.translate("validation.add.success", {
        field: req.translate("lesson"),
      }),
      data: { lessons },
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};
export const adminHandleUpdateLesson = async (req, res) => {
  const { lessonId } = req.params;
  const { deleted } = req.query;
  const { questions, name, gems, experiences } = req.body
  try {
    if (deleted) {
      const result = await findOneAndUpdateLesson(
        {
          _id: lessonId,
        },
        {
          deleted: deleted === "true" ? true : false,
        }
      );
      if (!result)
        throw new Error(
          req.translate("validation.delete.failed", {
            field: req.translate("lesson"),
          })
        );
      res.status(201).send({
        message: req.translate("validation.delete.success", {
          field: req.translate("lesson"),
        }),
      });
      return;
    }
    const lesson = await findLessonById(lessonId);
    if (!lesson)
      throw new Error(
        req.translate("validation.find.failed", {
          field: req.translate("lesson"),
        })
      );
    lesson.name = name
    lesson.gems = gems
    lesson.experiences = experiences
    if(questions && questions.length !== 0){
      lesson.questions = lesson.questions.concat(questions)
    }
    await lesson.save()
    res.status(201).send({
      message: req.translate("validation.update.success", {
        field: req.translate("lesson"),
      }),
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
}
export const adminHandleDeleteQuestionInLesson = async (req, res) => {
  const { index } = req.query
  const { lessonId } = req.params;
  try {
    const lesson = await findLessonById({ _id: lessonId, deleted: false});
    if (!lesson)
      throw new Error(
        req.translate("validation.delete.failed", {
          field: req.translate("question"),
        })
      );
    lesson.questions.splice(index, 1)
    await lesson.save()
    res.status(201).send({
      message: req.translate("validation.delete.success", {
        field: req.translate("question"),
      }),
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
}
// Question
export const adminHandleCreateQuestions = async (req, res) => {
  const { questions } = req.body;
  try {
    const resultAddQuestions = await createNewQuestion(questions)
    if(!resultAddQuestions) throw new Error(req.translate("validation.add.failed", {
      field: req.translate("question"),
    }))
    res.status(201).send({
      message: req.translate("validation.add.success", {
        field: req.translate("question"),
      }),
      data: {
        resultAddQuestions
      }
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};
export const adminHandleUpdateQuestion = async (req, res) => {
  const { questionId } = req.params;
  const body = req.body
  try {
    const result = await findQuestionByIdAndUpdate(
        {
          _id: questionId,
        },
        {
          ...body
        }
      )
      if (!result)
        throw new Error(
          req.translate("validation.update.failed", {
            field: req.translate("question"),
          })
        );
      res.status(201).send({
        message: req.translate("validation.update.success", {
          field: req.translate("question"),
        }),
      });
      return;
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};
export const adminHandleDeleteQuestion = async (req, res) => {
  const { questionId } = req.params;
  try {
    const result = await findQuestionByIdAndUpdate(
        {
          _id: questionId,
        },
        {
          deleted: true,
        }
      )
      if (!result)
        throw new Error(
          req.translate("validation.delete.failed", {
            field: req.translate("question"),
          })
        );
      res.status(201).send({
        message: req.translate("validation.delete.success", {
          field: req.translate("question"),
        }),
      });
      return;
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};

// Misson
export const adminHandleCreateMisson = async (req, res) => {
  const body = req.body
  try {
    const misson = await createNewMisson({...body})
    res.status(201).send({
      message: req.translate("validation.add.success", {
        field: req.translate("misson"),
      }),
      data: { misson },
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};
export const adminFindAllMisson = async(req,res) => {
  const {type} = req.query
  try {
    const missons = await adminFindMissons({type, deleted: false})
    res.status(200).send({
      data: { missons },
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
}
export const adminHandleUpdateMisson = async(req,res) => {
  const { missonId } = req.params
  const body = req.body
  try {
    const misson = await findOneAndUpdateMisson({
      _id: missonId
    },{
      ...body
    })
    if(!misson) throw new Error(req.translate("validation.update.failed", {
      field: req.translate("misson")
    }))
    res.status(201).send({
      message : req.translate("validation.update.success", {
        field: req.translate("misson")
      })
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
}
export const adminHandleDeleteMisson = async(req,res) => {
  const {missonId} = req.params
  try {
    const misson = await findMissonById(missonId)
    if(!misson) throw new Error(req.translate("validation.delete.failed", {
      field: req.translate("misson")
    }))
    misson.deleted = true
    await misson.save()
    res.status(201).send({
      message : req.translate("validation.delete.success", {
        field: req.translate("misson")
      })
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
}