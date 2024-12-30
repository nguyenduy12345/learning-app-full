import {
  findAllQuestions,
  findQuestionById,
} from "../repositories/question.repository.js";

export const getQuestionAndCheckCorrect = async (req, res) => {
  const { questionId } = req.params;
  const { answer } = req.body;
  try {
    const question = await findQuestionById(questionId);
    if (!question)
      throw new Error(
        req.translate("validation.find.failed", {
          field: req.translate("question"),
        })
      );
    let correct;
    switch (question.type) {
      case "choose":
        const checkTypeChoose = +answer === +question.correctChoose;
        checkTypeChoose ? (correct = true) : (correct = false);
        break;
      case "fill":
        let convertObjectToArray = new Array(answer.length);
        answer.forEach((item) => {
          convertObjectToArray[item.index] = item.word;
        });
        let checkTypeFill =
          convertObjectToArray.length === question.correctDocument.length &&
          convertObjectToArray.every(
            (value, index) => value == question.correctDocument[index]
          );
        checkTypeFill ? (correct = true) : (correct = false);
        break;
      case "rearrange":
        const result = question.correctDocument[0].replace(/\.$/, "")
        const checkTypeRearrange = answer.toLowerCase() === result.toLowerCase()
        checkTypeRearrange ? (correct = true) : (correct = false);
        break
      default:
        let formatArrDeleteKeyId = question.correctMatches.map((item) => {
          let plainItem = item.toObject();
          delete plainItem._id;
          return plainItem;
        });
        let listPaire = answer;
        listPaire = listPaire.map(JSON.stringify).sort();
        formatArrDeleteKeyId = formatArrDeleteKeyId.map(JSON.stringify).sort();
        for (let i = 0; i < listPaire.length; i++) {
          if (listPaire[i] !== formatArrDeleteKeyId[i]) {
            correct = false;
            break;
          } else {
            correct = true;
          }
        }
    }
    res.status(201).send({
      data: {
        correct,
      },
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const getQuestions = async (req, res) => {
  const quesId =  "6747dce78e031f702746eeff"
  try {
    const question = await findQuestionById(quesId);
    res.send(question)
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
