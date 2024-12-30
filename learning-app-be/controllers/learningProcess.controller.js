import {
  getCourseByUserIdInLearningProcess,
  findLearningProccessByUserIdAndCourseId,
  createNewLearningProcessByUserId,
  findAndUpdateRecentAccessAt,
} from "../repositories/learningProcess.repository.js";
import { findCourseById } from "../repositories/course.repository.js";
import { findSectionById } from "../repositories/section.repository.js";
import { getMilestoneById } from "../repositories/milestone.repository.js";

import LearningProcessModel from "../models/learningProcess.model.js";
import MilestoneModel from "../models/milestone.model.js";

export const getCourseOfLearningProcess = async (req, res) => {
  const { _id } = req.currentUser;
  try {
    const courses = await getCourseByUserIdInLearningProcess({
      userId: _id,
    }).populate('courseId').sort({recentAccessAt: -1});
    res.status(200).send({
      data: {
        courses,
      },
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};
export const addCourseToLearningProcess = async (req, res) => {
  const { _id } = req.currentUser;
  const { courseId } = req.query;
  try {
    const findCourse = await findCourseById(courseId);
    if (!findCourse) throw new Error(req.translate("course.findFalied"));
    const getLearningProcess = await getCourseByUserIdInLearningProcess({
      userId: _id,
      courseId,
    });
    if (getLearningProcess.length !== 0)
      throw new Error(req.translate("learning.process.addCourseFailed"));
    await createNewLearningProcessByUserId({
      userId: _id,
      courseId,
      recentAccessAt: new Date(),
      status: 1,
    });
    findCourse.numOfLearner = findCourse.numOfLearner + 1;
    await findCourse.save();
    res.status(201).send({
      message: req.translate("learning.process.addCourse"),
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};
export const updateRecentAccessOfCourseInLearningProcess = async (req, res) => {
  const { _id } = req.currentUser;
  const { courseId } = req.query;
  try {
    const result = await findAndUpdateRecentAccessAt(
      {
        userId: _id,
        courseId,
      },
      {
        recentAccessAt: new Date(),
      }
    );
    if (!result)
      throw new Error(
        req.translate("validation.update.failed", {
          field: req.translate("learning.process.recentAccess"),
        })
      );

    res.status(201).send({
      message: req.translate("validation.update.success", {
        field: req.translate("learning.process.recentAccess"),
      }),
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};
export const addSectionToLearningProcess = async (req, res) => {
  const { _id } = req.currentUser;
  const { courseId, sectionId } = req.body;
  try {
    const findSection = await findSectionById(sectionId);
    if (!findSection)
      throw new Error(
        req.translate("validation.find.failed", {
          field: req.translate("learning.process.section"),
        })
      );
    const getLearningProcess = await findLearningProccessByUserIdAndCourseId({
      userId: _id,
      courseId,
    });
    if (!getLearningProcess)
      throw new Error(
        req.translate("validation.find.failed", {
          field: req.translate("learning.process"),
        })
      );
    const findIndexSection = getLearningProcess.sections.findIndex(
      (section) => section.sectionId.toString() === sectionId.toString()
    );
    if (findIndexSection > -1)
      throw new Error(
        req.translate("validation.add.failed", {
          field: req.translate("learning.process.section"),
        })
      );
    getLearningProcess.sections.push({ sectionId, status: 1 });
    await getLearningProcess.save();
    res.status(201).send({
      message: req.translate("validation.add.success", {
        field: req.translate("learning.process.section"),
      }),
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};
export const addMilestoneToLearningProcess = async (req, res) => {
  const { _id } = req.currentUser;
  const { courseId, sectionId, milestoneId } = req.body;
  try {
    const findMilestone = await getMilestoneById(milestoneId);
    if (!findMilestone)
      throw new Error(
        req.translate("validation.find.failed", {
          field: req.translate("learning.process.milestone"),
        })
      );
    const getLearningProcess = await findLearningProccessByUserIdAndCourseId({
      userId: _id,
      courseId,
    });
    if (!getLearningProcess)
      throw new Error(
        req.translate("validation.find.failed", {
          field: req.translate("learning.process"),
        })
      );
    const findIndexSection = getLearningProcess.sections.findIndex(
      (section) => section.sectionId.toString() === sectionId.toString()
    );
    if (findIndexSection < 0)
      throw new Error(
        req.translate("validation.find.failed", {
          field: req.translate("learning.process.section"),
        })
      );
    const findIndexMilestone = getLearningProcess.sections[
      findIndexSection
    ].milestones.findIndex(
      (milestone) => milestone.milestoneId.toString() === milestoneId.toString()
    );
    if (findIndexMilestone > -1)
      throw new Error(
        req.translate("validation.add.failed", {
          field: req.translate("learning.process.milestone"),
        })
      );
    getLearningProcess.sections[findIndexSection].milestones.push({
      milestoneId,
      status: 1,
      currentLesson: 1
    });
    await getLearningProcess.save();
    res.status(201).send({
      message: req.translate("validation.add.success", {
        field: req.translate("learning.process.milestone"),
      }),
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};

export const updateStatusTotalMilestoneTotalMilestoneDoneInSection = async (req, res) => {
  const { _id } = req.currentUser;
  const { courseId, sectionId, status, totalMilestone, totalMilestoneDone } = req.body;
  try {
    const getLearningProcess = await findLearningProccessByUserIdAndCourseId({
      userId: _id,
      courseId,
    });
    if (!getLearningProcess)
      throw new Error(
        req.translate("validation.find.failed", {
          field: req.translate("learning.process"),
        })
      );
    const findIndexSection = getLearningProcess.sections.findIndex(
      (section) => section.sectionId.toString() === sectionId.toString()
    );
    if (findIndexSection < 0)
      throw new Error(
        req.translate("validation.find.failed", {
          field: req.translate("learning.process.section"),
        })
      );
    getLearningProcess.sections[findIndexSection].status = status ? 2 : getLearningProcess.sections[findIndexSection].status
    getLearningProcess.sections[findIndexSection].totalMilestone = totalMilestone ? totalMilestone : getLearningProcess.sections[findIndexSection].totalMilestone
    getLearningProcess.sections[findIndexSection].totalMilestoneDone = totalMilestoneDone ? +getLearningProcess.sections[findIndexSection].totalMilestoneDone + 1 : getLearningProcess.sections[findIndexSection].totalMilestoneDone
    await getLearningProcess.save();
    res.status(201).send({
      message: req.translate("validation.update.success", {
        field: req.translate("learning.process.section"),
      }),
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};
export const updateCurrentLessonStatusTotalLessonDoneMilestone = async (req, res) => {
  const { _id } = req.currentUser;
  const { courseId, sectionId, milestoneId, currentLesson, status, totalLessonDone } = req.body;
  try {
    const getLearningProcess = await findLearningProccessByUserIdAndCourseId({
      userId: _id,
      courseId,
    });
    if (!getLearningProcess)
      throw new Error(
        req.translate("validation.find.failed", {
          field: req.translate("learning.process"),
        })
      );
    const findIndexSection = getLearningProcess.sections.findIndex(
      (section) => section.sectionId.toString() === sectionId.toString()
    );
    if (findIndexSection < 0)
      throw new Error(
        req.translate("validation.find.failed", {
          field: req.translate("learning.process.section"),
        })
      );
    const findIndexMilestone = getLearningProcess.sections[
      findIndexSection
    ].milestones.findIndex(
      (milestone) => milestone.milestoneId.toString() === milestoneId.toString()
    );
    if (findIndexMilestone < 0)
      throw new Error(
        req.translate("validation.updated.failed", {
          field: req.translate("learning.process.milestone"),
        })
      );
    getLearningProcess.sections[findIndexSection].milestones[
      findIndexMilestone
    ].currentLesson = currentLesson
      ? getLearningProcess.sections[findIndexSection].milestones[
          findIndexMilestone
        ].currentLesson + 1
      : getLearningProcess.sections[findIndexSection].milestones[
          findIndexMilestone
        ].currentLesson;
    getLearningProcess.sections[findIndexSection].milestones[
      findIndexMilestone
    ].status = status
      ? 2
      : getLearningProcess.sections[findIndexSection].milestones[
          findIndexMilestone
        ].status;
    getLearningProcess.sections[findIndexSection].milestones[
      findIndexMilestone
      ].totalLessonDone = totalLessonDone
      ? getLearningProcess.sections[findIndexSection].milestones[
        findIndexMilestone
        ].totalLessonDone + 1
      : getLearningProcess.sections[findIndexSection].milestones[
        findIndexMilestone
        ].totalLessonDone;
    await getLearningProcess.save();
    res.status(201).send({
      message: req.translate("validation.update.success", {
        field: req.translate("learning.process.milestone"),
      }),
    });
  } catch (error) {
    res.status(401).send({
      message: error.message,
    });
  }
};
