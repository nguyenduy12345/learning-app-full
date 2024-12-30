import Joi from "joi";

import { getValidationError } from "../utils/joi.utils.js";

// Course
export const validateCreateCourseRequest = async (req, res, next) => {
  const { name } = req.body;
  const schema = Joi.object({
    name: Joi.string()
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
          field: req.translate("course.name"),
        }),
        "string.max": req.translate("validation.maxLength", {
          field: req.translate("course.name"),
          value: 255,
        }),
        "string,empty": req.translate("validation.required", {
          field: req.translate("course.name"),
        }),
        "string.pattern.base": req.translate("validation.invalid", {
          field: req.translate("course.name"),
        }),
      }),
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
          field: req.translate("image"),
        }),
        "any.only": req.translate("validation.file.image", {
          field: req.translate("image"),
        }),
      }),
  }).options({
    abortEarly: false,
  });
  try {
    const file = req.file;
    const mimetype = file?.mimetype;
    await schema.validateAsync({ name, mimetype });
    next();
  } catch (error) {
    res.status(400).send(getValidationError(error));
  }
};
export const validateUpdateInfomationCourseRequest = async (req, res, next) => {
  const { name } = req.body;
  const schema = Joi.object({
    name: Joi.string()
      .pattern(
        new RegExp(
          "^[A-Za-zÀ-ÿáàảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờở̃ỡợùúủũụưứừửữựỳýỷỹỵđĐ0-9]+(?: [A-Za-zÀ-ÿáàảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờở̃ỡợùúủũụưứừửữựỳýỷỹỵđĐ0-9]+)*$"
        )
      )
      .max(255)
      .empty("")
      .messages({
        "string.max": req.translate("validation.maxLength", {
          field: req.translate("course.name"),
          value: 255,
        }),
        "string,empty": req.translate("validation.required", {
          field: req.translate("course.name"),
        }),
        "string.pattern.base": req.translate("validation.invalid", {
          field: req.translate("course.name"),
        }),
      }),
    mimetype: Joi.string()
      .valid(
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/tiff",
        "image/jpg"
      )
      .messages({
        "any.only": req.translate("validation.file.image", {
          field: req.translate("image"),
        }),
      }),
  }).options({
    abortEarly: false,
  });
  try {
    const file = req?.file;
    const mimetype = file?.mimetype;
    await schema.validateAsync({ name, mimetype });
    next();
  } catch (error) {
    res.status(400).send(getValidationError(error));
  }
};

// Section
export const validateCreateSectionRequest = async (req, res, next) => {
  const { name } = req.body;
  const { courseId } = req.query;
  const schema = Joi.object({
    name: Joi.string()
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
          field: req.translate("section.name"),
        }),
        "string.max": req.translate("validation.maxLength", {
          field: req.translate("section.name"),
          value: 255,
        }),
        "string,empty": req.translate("validation.required", {
          field: req.translate("section.name"),
        }),
        "string.pattern.base": req.translate("validation.invalid", {
          field: req.translate("section.name"),
        }),
      }),
    courseId: Joi.string()
      .required()
      .pattern(new RegExp("^[0-9a-fA-F]{24}$"))
      .message({
        "string.pattern.base": req.translate("courseId.invalid"),
      }),
  }).options({
    abortEarly: false,
  });
  try {
    await schema.validateAsync({ name, courseId });
    next();
  } catch (error) {
    res.status(400).send(getValidationError(error));
  }
};
export const validateUpdateSectionRequest = async (req, res, next) => {
  const { name } = req.body;
  const schema = Joi.object({
    name: Joi.string()
      .pattern(
        new RegExp(
          "^[A-Za-zÀ-ÿáàảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờở̃ỡợùúủũụưứừửữựỳýỷỹỵđĐ0-9]+(?: [A-Za-zÀ-ÿáàảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờở̃ỡợùúủũụưứừửữựỳýỷỹỵđĐ0-9]+)*$"
        )
      )
      .max(255)
      .empty("")
      .messages({
        "string.max": req.translate("validation.maxLength", {
          field: req.translate("section.name"),
          value: 255,
        }),
        "string,empty": req.translate("validation.required", {
          field: req.translate("section.name"),
        }),
        "string.pattern.base": req.translate("validation.invalid", {
          field: req.translate("section.name"),
        }),
      }),
  }).options({
    abortEarly: false,
  });
  try {
    await schema.validateAsync({ name });
    next();
  } catch (error) {
    res.status(400).send(getValidationError(error));
  }
};

// Milestone
export const validateCreateMilestoneRequest = async (req, res, next) => {
  const { name } = req.body;
  const { sectionId } = req.query;
  const schema = Joi.object({
    name: Joi.string()
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
          field: req.translate("milestone.name"),
        }),
        "string.max": req.translate("validation.maxLength", {
          field: req.translate("milestone.name"),
          value: 255,
        }),
        "string,empty": req.translate("validation.required", {
          field: req.translate("milestone.name"),
        }),
        "string.pattern.base": req.translate("validation.invalid", {
          field: req.translate("milestone.name"),
        }),
      }),
    sectionId: Joi.string()
      .required()
      .pattern(new RegExp("^[0-9a-fA-F]{24}$"))
      .message({
        "string.pattern.base": req.translate("sectionId.invalid"),
      }),
  }).options({
    abortEarly: false,
  });
  try {
    await schema.validateAsync({ name, sectionId });
    next();
  } catch (error) {
    res.status(400).send(getValidationError(error));
  }
};
export const validateUpdateMilestoneRequest = async (req, res, next) => {
  const { name } = req.body;
  const schema = Joi.object({
    name: Joi.string()
      .pattern(
        new RegExp(
          "^[A-Za-zÀ-ÿáàảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờở̃ỡợùúủũụưứừửữựỳýỷỹỵđĐ0-9]+(?: [A-Za-zÀ-ÿáàảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờở̃ỡợùúủũụưứừửữựỳýỷỹỵđĐ0-9]+)*$"
        )
      )
      .max(255)
      .empty("")
      .messages({
        "string.max": req.translate("validation.maxLength", {
          field: req.translate("milestone.name"),
          value: 255,
        }),
        "string,empty": req.translate("validation.required", {
          field: req.translate("milestone.name"),
        }),
        "string.pattern.base": req.translate("validation.invalid", {
          field: req.translate("milestone.name"),
        }),
      }),
  }).options({
    abortEarly: false,
  });
  try {
    await schema.validateAsync({ name });
    next();
  } catch (error) {
    res.status(400).send(getValidationError(error));
  }
};

// Lesson
export const validateCreateLessonRequest = async (req, res, next) => {
  const { data } = req.body;
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .pattern(
        new RegExp(
          "^[A-Za-zÀ-ÿáàảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờở̃ỡợùúủũụưứừửữựỳýỷỹỵđĐ0-9]+(?: [A-Za-zÀ-ÿáàảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờở̃ỡợùúủũụưứừửữựỳýỷỹỵđĐ0-9]+)*$"
        )
      )
      .max(255)
      .empty("")
      .min(1)
      .messages({
        "any.required": req.translate("validation.required", {
          field: req.translate("lesson.name"),
        }),
        "string.max": req.translate("validation.maxLength", {
          field: req.translate("lesson.name"),
          value: 255,
        }),
        "string.min": req.translate("validation.required", {
          field: req.translate("lesson.name"),
        }),
        "string.empty": req.translate("validation.required", {
          field: req.translate("lesson.name"),
        }),
        "string.pattern.base": req.translate("validation.invalid", {
          field: req.translate("lesson.name"),
        }),
      }),
    experiences: Joi.number()
      .required()
      .min(0)
      .max(500)
      .integer()
      .empty("")
      .messages({
        "any.required": req.translate("validation.required", {
          field: req.translate("lesson.experiences"),
        }),
        "number.max": req.translate("validation.max", {
          field: req.translate("lesson.experiences"),
          value: 500,
        }),
        "number.min": req.translate("validation.min", {
          field: req.translate("lesson.experiences"),
          value: 0,
        }),
        "number.empty": req.translate("validation.required", {
          field: req.translate("lesson.experiences"),
        }),
      }),
    gems: Joi.number()
      .required()
      .min(0)
      .max(500)
      .integer()
      .empty("")
      .messages({
        "any.required": req.translate("validation.required", {
          field: req.translate("lesson.gems"),
        }),
        "number.max": req.translate("validation.max", {
          field: req.translate("lesson.gems"),
          value: 500,
        }),
        "number.min": req.translate("validation.min", {
          field: req.translate("lesson.gems"),
          value: 0,
        }),
        "number.empty": req.translate("validation.required", {
          field: req.translate("lesson.gems"),
        }),
      }),
    sectionId: Joi.string()
      .required()
      .pattern(/^[0-9a-fA-F]{24}$/, "ObjectId")
      .message(req.translate("sectionId.invalid")),
    milestoneId: Joi.string()
      .required()
      .pattern(/^[0-9a-fA-F]{24}$/, "ObjectId")
      .message(req.translate("milestoneId.invalid")),
    questions: Joi.array()
      .items(
        Joi.object({
          question: Joi.string()
            .required()
            .pattern(/^[0-9a-fA-F]{24}$/, "ObjectId")
            .message(req.translate("questionId.invalid")),
        })
      )
      .required()
      .messages({
        "any.required": req.translate("validation.required", {
          field: req.translate("question"),
        }),
      }),
  }).options({
    abortEarly: false,
  });
  try {
    await schema.validateAsync(data);
    next();
  } catch (error) {
    res.status(400).send(getValidationError(error));
  }
};
export const validateUpdateLessonRequest = async (req, res, next) => {
  const { name, experiences, gems, questions } = req.body;
  const schema = Joi.object({
    name: Joi.string()
      .pattern(
        new RegExp(
          "^[A-Za-zÀ-ÿáàảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờở̃ỡợùúủũụưứừửữựỳýỷỹỵđĐ0-9]+(?: [A-Za-zÀ-ÿáàảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờở̃ỡợùúủũụưứừửữựỳýỷỹỵđĐ0-9]+)*$"
        )
      )
      .max(255)
      .empty("")
      .min(1)
      .messages({
        "string.max": req.translate("validation.maxLength", {
          field: req.translate("lesson.name"),
          value: 255,
        }),
        "string.min": req.translate("validation.required", {
          field: req.translate("lesson.name"),
        }),
        "string.empty": req.translate("validation.required", {
          field: req.translate("lesson.name"),
        }),
        "string.pattern.base": req.translate("validation.invalid", {
          field: req.translate("lesson.name"),
        }),
      }),
    experiences: Joi.number()
      .min(0)
      .max(500)
      .integer()
      .empty("")
      .messages({
        "number.max": req.translate("validation.max", {
          field: req.translate("lesson.experiences"),
          value: 500,
        }),
        "number.min": req.translate("validation.min", {
          field: req.translate("lesson.experiences"),
          value: 0,
        }),
        "number.empty": req.translate("validation.required", {
          field: req.translate("lesson.experiences"),
        }),
      }),
    gems: Joi.number()
      .min(0)
      .max(500)
      .integer()
      .empty("")
      .messages({
        "number.max": req.translate("validation.max", {
          field: req.translate("lesson.gems"),
          value: 500,
        }),
        "number.min": req.translate("validation.min", {
          field: req.translate("lesson.gems"),
          value: 0,
        }),
        "number.empty": req.translate("validation.required", {
          field: req.translate("lesson.gems"),
        }),
      }),
    questions: Joi.array()
      .items(
        Joi.object({
          question: Joi.string()
            .empty("")
            .allow(null)
            .pattern(/^[0-9a-fA-F]{24}$/, "ObjectId")
            .message(req.translate("questionId.invalid")),
        })
      )
      .empty("")
      .allow(null),
  }).options({
    abortEarly: false,
  });
  try {
    await schema.validateAsync({ name, experiences, gems, questions });
    next();
  } catch (error) {
    res.status(400).send(getValidationError(error));
  }
};

// Question
export const validateCreateQuestionsRequest = async (req, res, next) => {
  const schema = Joi.object({
    questions: Joi.array()
      .items(
        Joi.object({
          type: Joi.string()
            .required()
            .messages({
              "any.required": req.translate("validation.required", {
                field: req.translate("question.type"),
              }),
            }),
          courseId: Joi.string()
            .required()
            .pattern(/^[0-9a-fA-F]{24}$/, "ObjectId")
            .message(req.translate("courseId.invalid")),
          question: Joi.string()
            .max(255)
            .messages({
              "string.max": req.translate("validation.maxLength", {
                field: "question",
                value: 255,
              }),
            })
            .empty("")
            .allow(null),

          answers: Joi.array()
            .items(
              Joi.string()
                .max(255)
                .messages({
                  "string.max": req.translate("validation.maxLength", {
                    field: "answer",
                    value: 255,
                  }),
                })
            )
            .required()
            .messages({
              "any.required": req.translate("validation.required", {
                field: req.translate("question.answers"),
              }),
            })
            .allow(null),

          correctChoose: Joi.number()
            .min(0)
            .max(10)
            .integer()
            .messages({
              "number.max": req.translate("validation.max", {
                field: "correctChoose",
                value: 10,
              }),
              "number.min": req.translate("validation.min", {
                field: "correctChoose",
                value: 0,
              }),
            })
            .allow(null),
          leftOptions: Joi.array()
            .items(
              Joi.string()
                .max(255)
                .messages({
                  "string.max": req.translate("validation.maxLength", {
                    field: "word",
                    value: 255,
                  }),
                })
            )
            .allow(null),

          rightOptions: Joi.array()
            .items(
              Joi.string()
                .max(255)
                .messages({
                  "string.max": req.translate("validation.maxLength", {
                    field: "word",
                    value: 255,
                  }),
                })
            )
            .allow(null),
          correctMatches: Joi.array()
            .items(
              Joi.object({
                left: Joi.string()
                  .max(255)
                  .messages({
                    "string.max": req.translate("validation.maxLength", {
                      field: "word",
                      value: 255,
                    }),
                  }),
                right: Joi.string()
                  .max(255)
                  .messages({
                    "string.max": req.translate("validation.maxLength", {
                      field: "word",
                      value: 255,
                    }),
                  }),
              })
            )
            .allow(null),

          document: Joi.string()
            .max(1000)
            .messages({
              "string.max": req.translate("validation.maxLength", {
                field: "document",
                value: 1000,
              }),
            })
            .empty("")
            .allow(null),

          words: Joi.array()
            .items(
              Joi.string()
                .max(255)
                .message({
                  "string.max": req.translate("validation.maxLength", {
                    field: "word",
                    value: 255,
                  }),
                })
            )
            .allow(null),

          correctDocument: Joi.array()
            .items(
              Joi.string()
                .max(255)
                .messages({
                  "string.max": req.translate("validation.maxLength", {
                    field: "word",
                    value: 255,
                  }),
                })
            )
            .allow(null),

          countCorrect: Joi.number()
            .max(10)
            .integer()
            .messages({
              "number.max": req.translate("validation.max", {
                field: "countCorrect",
                value: 100,
              }),
              "number.min": req.translate("validation.min", {
                field: "countCorrect",
                value: 0,
              }),
            })
            .allow(null),
          stringMatches: Joi.string().empty("").allow(null),
        })
      )
      .required(),
  }).options({
    abortEarly: false,
  });

  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).send(getValidationError(error)); // Gửi lại lỗi cho client
  }
};
export const validateUpdateQuestionsRequest = async (req, res, next) => {
  const schema = Joi.object({
    type: Joi.string()
      .required()
      .messages({
        "any.required": req.translate("validation.required", {
          field: req.translate("question.type"),
        }),
      }),
    question: Joi.string()
      .max(255)
      .messages({
        "string.max": req.translate("validation.maxLength", {
          field: "question",
          value: 255,
        }),
      })
      .empty("")
      .allow(null),
    answers: Joi.array()
      .items(
        Joi.string()
          .max(255)
          .messages({
            "string.max": req.translate("validation.maxLength", {
              field: "answer",
              value: 255,
            }),
          })
      )
      .required()
      .messages({
        "any.required": req.translate("validation.required", {
          field: req.translate("question.answers"),
        }),
      })
      .allow(null),

    correctChoose: Joi.number()
      .min(0)
      .max(10)
      .integer()
      .messages({
        "number.max": req.translate("validation.max", {
          field: "correctChoose",
          value: 10,
        }),
        "number.min": req.translate("validation.min", {
          field: "correctChoose",
          value: 0,
        }),
      })
      .allow(null),
    leftOptions: Joi.array()
      .items(
        Joi.string()
          .max(255)
          .messages({
            "string.max": req.translate("validation.maxLength", {
              field: "word",
              value: 255,
            }),
          })
      )
      .allow(null),

    rightOptions: Joi.array()
      .items(
        Joi.string()
          .max(255)
          .messages({
            "string.max": req.translate("validation.maxLength", {
              field: "word",
              value: 255,
            }),
          })
      )
      .allow(null),
    correctMatches: Joi.array()
      .items(
        Joi.object({
          left: Joi.string()
            .max(255)
            .messages({
              "string.max": req.translate("validation.maxLength", {
                field: "word",
                value: 255,
              }),
            }),
          right: Joi.string()
            .max(255)
            .messages({
              "string.max": req.translate("validation.maxLength", {
                field: "word",
                value: 255,
              }),
            }),
        })
      )
      .allow(null),

    document: Joi.string()
      .max(1000)
      .messages({
        "string.max": req.translate("validation.maxLength", {
          field: "document",
          value: 1000,
        }),
      })
      .empty("")
      .allow(null),

    words: Joi.array()
      .items(
        Joi.string()
          .max(255)
          .message({
            "string.max": req.translate("validation.maxLength", {
              field: "word",
              value: 255,
            }),
          })
      )
      .allow(null),

    correctDocument: Joi.array()
      .items(
        Joi.string()
          .max(255)
          .messages({
            "string.max": req.translate("validation.maxLength", {
              field: "word",
              value: 255,
            }),
          })
      )
      .allow(null),

    countCorrect: Joi.number()
      .max(10)
      .integer()
      .messages({
        "number.max": req.translate("validation.max", {
          field: "countCorrect",
          value: 100,
        }),
        "number.min": req.translate("validation.min", {
          field: "countCorrect",
          value: 0,
        }),
      })
      .allow(null),
  }).options({
    abortEarly: false,
  });

  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).send(getValidationError(error)); // Gửi lại lỗi cho client
  }
};

// Misson
export const validateCreateAndUpdateMissonRequest = async (req, res, next) => {
  const schema = Joi.object({
    misson: Joi.string()
      .required()
      .max(500)
      .empty("")
      .min(1)
      .messages({
        "any.required": req.translate("validation.required", {
          field: req.translate("misson"),
        }),
        "string.max": req.translate("validation.maxLength", {
          field: req.translate("misson"),
          value: 500,
        }),
        "string.min": req.translate("validation.required", {
          field: req.translate("misson"),
        }),
        "string.empty": req.translate("validation.required", {
          field: req.translate("misson"),
        })
      }),
    type: Joi.string()
      .required()
      .max(255)
      .empty("")
      .min(1)
      .messages({
        "any.required": req.translate("validation.required", {
          field: req.translate("misson.type"),
        }),
        "string.max": req.translate("validation.maxLength", {
          field: req.translate("misson.type"),
          value: 500,
        }),
        "string.min": req.translate("validation.required", {
          field: req.translate("misson.type"),
        }),
        "string.empty": req.translate("validation.required", {
          field: req.translate("misson.type"),
        }),
      }),
    experiences: Joi.number()
      .min(0)
      .max(500)
      .integer()
      .empty("")
      .required()
      .messages({
        "any.required": req.translate("validation.required", {
          field: req.translate("misson.experiences"),
        }),
        "number.max": req.translate("validation.max", {
          field: req.translate("misson.experiences"),
          value: 500,
        }),
        "number.min": req.translate("validation.min", {
          field: req.translate("misson.experiences"),
          value: 0,
        }),
        "number.empty": req.translate("validation.required", {
          field: req.translate("misson.experiences"),
        }),
      }),
    gems: Joi.number()
      .min(0)
      .max(500)
      .integer()
      .empty("")
      .required()
      .messages({
        "any.required": req.translate("validation.required", {
          field: req.translate("misson.gems"),
        }),
        "number.max": req.translate("validation.max", {
          field: req.translate("misson.gems"),
          value: 500,
        }),
        "number.min": req.translate("validation.min", {
          field: req.translate("misson.gems"),
          value: 0,
        }),
        "number.empty": req.translate("validation.required", {
          field: req.translate("misson.gems"),
        }),
      }),
    hearts: Joi.number()
      .min(0)
      .max(500)
      .integer()
      .empty("")
      .required()
      .messages({
        "any.required": req.translate("validation.required", {
          field: req.translate("misson.hearts"),
        }),
        "number.max": req.translate("validation.max", {
          field: req.translate("misson.hearts"),
          value: 500,
        }),
        "number.min": req.translate("validation.min", {
          field: req.translate("misson.hearts"),
          value: 0,
        }),
        "number.empty": req.translate("validation.required", {
          field: req.translate("misson.hearts"),
        }),
      }),
    numberOfRequirements: Joi.number()
      .min(0)
      .max(500)
      .integer()
      .empty("")
      .required()
      .messages({
        "any.required": req.translate("validation.required", {
          field: req.translate("misson.numberOfRequirements"),
        }),
        "number.max": req.translate("validation.max", {
          field: req.translate("misson.numberOfRequirements"),
          value: 500,
        }),
        "number.min": req.translate("validation.min", {
          field: req.translate("misson.numberOfRequirements"),
          value: 0,
        }),
        "number.empty": req.translate("validation.required", {
          field: req.translate("misson.numberOfRequirements"),
        }),
      }),
    gifts: Joi.string()
      .pattern(
        new RegExp(
          "^[A-Za-zÀ-ÿáàảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờở̃ỡợùúủũụưứừửữựỳýỷỹỵđĐ0-9]+(?: [A-Za-zÀ-ÿáàảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờở̃ỡợùúủũụưứừửữựỳýỷỹỵđĐ0-9]+)*$"
        )
      )
      .max(500)
      .min(1)
      .messages({
        "string.max": req.translate("validation.maxLength", {
          field: req.translate("misson.gifts"),
          value: 500,
        }),
        "string.min": req.translate("validation.required", {
          field: req.translate("misson.gifts"),
        }),
        "string.empty": req.translate("validation.required", {
          field: req.translate("misson.gifts"),
        }),
        "string.pattern.base": req.translate("validation.invalid", {
          field: req.translate("misson.gifts"),
        }),
      })
      .empty("")
      .allow(null),
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
