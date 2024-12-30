import { useState, useEffect, useContext, useRef, useCallback } from "react";

import { UserInfo } from "../stores/user.store.jsx";
import { LoadingContext } from "../stores/loading.store.jsx";

import instance from "../utils/axiosRequest.js";

import QuestionTypeChoose from "../components/QuestionTypeChoose.jsx";
import QuestionTypeMatch from "../components/QuestionTypeMatch.jsx";
import QuestionTypeFill from "../components/QuestionTypeFill.jsx";
import QuestionTypeRearrange from "../components/QuestionTypeRearrange.jsx";
import Congratulation from "../components/Congratulation.jsx";
import ShowStatusMissons from "../components/ShowStatusMissons.jsx";

import formatDate from "../functions/formatDate.js";

const Lesson = ({
  courseId,
  sectionId,
  milestoneId,
  setIsLesson,
  lessons,
  currentLesson,
  setCurrentLesson,
}) => {
  const {
    profile,
    setProfile,
    missons,
    setMissons,
    courseOfLearningProcess,
    setCourseOfLearningProcess,
    lessonsOfSummaryLesson,
    setLessonOfSummaryLesson,
  } = useContext(UserInfo);
  const { setIsLoading } = useContext(LoadingContext);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [indexLesson, setIndexLesson] = useState(currentLesson || 1);
  const [questions, setQuestions] = useState(
    lessons[indexLesson - 1] && lessons[indexLesson - 1]?.questions,
  );
  const [lessonId, setLessonId] = useState(
    lessons[indexLesson - 1] && lessons[indexLesson - 1]._id,
  );
  const colorDiv = useRef(null);
  const [countRequest, setCountRequest] = useState(0);
  const [isCongratulation, setIsCongratulation] = useState(false);
  const [listMisson, setListMisson] = useState([]);
  const [isShowInfoMisson, setIsShowInfoMisson] = useState(false);
  const [questionsCorrect, setQuestionsCorrect] = useState(0);
  useEffect(() => {
    if (lessons.length === 0) {
      setIsLesson(false);
    }
  }, [lessons]);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const result = await instance.get(
          `lessons/${lessons[indexLesson - 1]._id}`);
        setQuestions(result?.data?.data?.lesson?.questions);
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        return error;
      }
    };
    fetchQuestions();
    setLessonId(lessons[indexLesson - 1] && lessons[indexLesson - 1]._id);
  }, [indexLesson, currentLesson]);

  // get misson not complete
  const listMissonUpdate = missons
    .map((misson, index) => {
      if (misson.completed === false) {
        return { index, misson };
      }
    })
    .filter((item) => item !== undefined);

  // create variable save listMisson send to components ShowStatusMissons
  let listMissonWhenUpdated = [...listMisson];
  useEffect(() => {
    // check and save status misson type questions
    listMissonUpdate?.map(async (misson) => {
      if (
        misson?.misson?.missonId?.type === "questions" &&
        +questionsCorrect === +misson?.misson?.missonId?.numberOfRequirements
      ) {
        try {
          await instance.patch(
            `user_missons/update?missonId=${misson.misson.missonId._id}`,
            {
              currentProgress: questionsCorrect,
              status: true,
            },
          );
          await instance.patch("users/update_asset", {
            experiences: misson.misson.missonId.experiences,
            gems: misson.misson.missonId.gems,
            turns: misson.misson.missonId.hearts,
          });
          setMissons((prevMissons) => {
            const updateMissons = [...prevMissons];
            updateMissons[misson.index].currentProgress = questionsCorrect;
            updateMissons[misson.index].completed = true;
            return updateMissons;
          });
          setProfile((prev) => {
            const updateProfile = { ...prev };
            updateProfile.experiences =
              +updateProfile.experiences + +misson.misson.missonId.experiences;
            updateProfile.gems =
              +updateProfile.gems + +misson.misson.missonId.gems;
            updateProfile.hearts =
              +updateProfile.hearts + +misson.misson.missonId.hearts;
            return updateProfile;
          });
          setListMisson((prev) => {
            let updateMisson = [...prev];
            const findMisson = updateMisson?.findIndex(
              (miss) =>
                miss.missonId._id.toString() ===
                misson.misson.milestoneId._id.toString(),
            );
            if (findMisson > -1) {
              return updateMisson;
            } else {
              return (updateMisson = [...prev, misson.misson]);
            }
          });
          setIsShowInfoMisson(true);
        } catch (error) {}
      }
      return;
    });
  }, [questionsCorrect]);
  // Next question and handle end lesson
  const handleNextQuestion = useCallback(async () => {
    if (countRequest === 1) return;
    setCountRequest(1);
    setIndexQuestion(indexQuestion + 1);
    if (indexQuestion + 1 > questions?.length - 1) {
      try {
        // update status milestone when complete all lessons
        if (indexLesson + 1 > lessons.length) {
          setIsLoading(true);
          await instance.patch("learning_process/update_milestone", {
            courseId,
            sectionId,
            milestoneId,
            currentLesson,
            totalLessonDone: currentLesson,
            status: 2,
          });
          const indexCourse = courseOfLearningProcess.findIndex(
            (course) => course.courseId._id.toString() === courseId.toString(),
          );
          const indexSection = courseOfLearningProcess[
            indexCourse
          ].sections.findIndex(
            (section) => section.sectionId.toString() === sectionId.toString(),
          );
          await instance.patch(`learning_process/update_section`, {
            courseId,
            sectionId,
            totalMilestoneDone: indexLesson,
            status:
              courseOfLearningProcess[indexCourse].sections[indexSection]
                .totalMilestoneDone +
                1 >=
              courseOfLearningProcess[indexCourse].sections[indexSection]
                .totalMilestone
                ? 2
                : "",
          });
          await instance.patch("users/update_asset", {
            experiences: +lessons[indexLesson - 1].experiences,
            gems: +lessons[indexLesson - 1].gems,
            turns: 5,
            dayStreak: Math.random(),
          });
          setProfile((prev) => {
            const updateProfile = { ...prev };
            updateProfile.experiences =
              +updateProfile.experiences +
              +lessons[indexLesson - 1].experiences;
            updateProfile.gems =
              +updateProfile.gems + +lessons[indexLesson - 1].gems;
            updateProfile.hearts = +updateProfile.hearts + 5;
            return updateProfile;
          });
          const updateMissonPromises = listMissonUpdate.map(async (misson) => {
            switch (misson?.misson?.missonId?.type) {
              case "gems":
                await instance.patch(
                  `user_missons/update?missonId=${misson.misson.missonId._id}`,
                  {
                    currentProgress: +lessons[indexLesson - 1].gems,
                    status:
                      +missons[misson.index].currentProgress +
                        +lessons[indexLesson - 1].gems >=
                      +missons[misson.index].missonId.numberOfRequirements,
                  },
                );
                setMissons((prevMissons) => {
                  const updateMissons = [...prevMissons];
                  updateMissons[misson.index].currentProgress =
                    +updateMissons[misson.index].currentProgress +
                    +lessons[indexLesson - 1].gems;
                  updateMissons[misson.index].completed =
                    +missons[misson.index].currentProgress >=
                    +missons[misson.index].missonId.numberOfRequirements;
                  return updateMissons;
                });
                listMissonWhenUpdated = [
                  ...listMissonWhenUpdated,
                  misson.misson,
                ];
                break;
              case "experiences":
                await instance.patch(
                  `user_missons/update?missonId=${misson.misson.missonId._id}`,
                  {
                    currentProgress: +lessons[indexLesson - 1].experiences,
                    status:
                      +missons[misson.index].currentProgress +
                        +lessons[indexLesson - 1].experiences >=
                      +missons[misson.index].missonId.numberOfRequirements,
                  },
                );
                setMissons((prevMissons) => {
                  const updateMissons = [...prevMissons];
                  updateMissons[misson.index].currentProgress =
                    +updateMissons[misson.index].currentProgress +
                    +lessons[indexLesson - 1].experiences;
                  updateMissons[misson.index].completed =
                    +missons[misson.index].currentProgress >=
                    +missons[misson.index].missonId.numberOfRequirements;
                  return updateMissons;
                });

                listMissonWhenUpdated = [
                  ...listMissonWhenUpdated,
                  misson.misson,
                ];
                break;
              case "lessons":
                await instance.patch(
                  `user_missons/update?missonId=${misson.misson.missonId._id}`,
                  {
                    currentProgress: 1,
                    status:
                      +missons[misson.index].currentProgress + 1 >=
                      +missons[misson.index].missonId.numberOfRequirements,
                  },
                );
                setMissons((prevMissons) => {
                  const updateMissons = [...prevMissons];
                  updateMissons[misson.index].currentProgress =
                    +updateMissons[misson.index].currentProgress + 1;
                  updateMissons[misson.index].completed =
                    +missons[misson.index].currentProgress >=
                    +missons[misson.index].missonId.numberOfRequirements;
                  return updateMissons;
                });
                listMissonWhenUpdated = [
                  ...listMissonWhenUpdated,
                  misson.misson,
                ];
                break;
              case "days":
                const currentDay = formatDate();
                const isHaveDay = profile.activeDays.includes(currentDay);
                await instance.patch(
                  `user_missons/update?missonId=${misson.misson.missonId._id}`,
                  {
                    currentProgress: isHaveDay ? "0" : 1,
                    status:
                      +missons[misson.index].currentProgress + (isHaveDay
                        ? "0"
                        : 1
                      ) >=
                          +missons[misson.index].missonId.numberOfRequirements,
                  },
                );
                setMissons((prevMissons) => {
                  const updateMissons = [...prevMissons];
                  updateMissons[misson.index].currentProgress =
                    +updateMissons[misson.index].currentProgress + (isHaveDay
                      ? 0
                      : 1)
                  updateMissons[misson.index].completed =
                    +missons[misson.index].currentProgress >=
                    +missons[misson.index].missonId.numberOfRequirements;
                  return updateMissons;
                });
                listMissonWhenUpdated = [
                  ...listMissonWhenUpdated,
                  misson.misson,
                ];
                break;
              default:
            }
          });
          await Promise.all(updateMissonPromises);
          setIsLoading(false);
          setListMisson((prevListMisson) => {
            const updateListMisson = [
              ...prevListMisson,
              ...listMissonWhenUpdated,
            ];
            return updateListMisson;
          });
          setIsCongratulation(true);
          setIsShowInfoMisson(true);
          setCourseOfLearningProcess((prevCourse) => {
            const updateCourse = [...prevCourse];
            const indexCourse = updateCourse.findIndex(
              (course) =>
                course.courseId._id.toString() === courseId.toString(),
            );
            const indexSection = updateCourse[indexCourse].sections.findIndex(
              (section) =>
                section.sectionId.toString() === sectionId.toString(),
            );
            updateCourse[indexCourse].sections[
              indexSection
            ].totalMilestoneDone =
              +updateCourse[indexCourse].sections[indexSection]
                .totalMilestoneDone + 1;
            updateCourse[indexCourse].sections[indexSection].status =
              updateCourse[indexCourse].sections[indexSection]
                .totalMilestoneDone >=
              updateCourse[indexCourse].sections[indexSection].totalMilestone
                ? 2
                : 1;
            const indexMilestone = updateCourse[indexCourse].sections[
              indexSection
            ].milestones.findIndex(
              (milestone) =>
                milestone.milestoneId.toString() === milestoneId.toString(),
            );
            updateCourse[indexCourse].sections[indexSection].milestones[
              indexMilestone
            ].currentLesson = indexLesson + 1;
            updateCourse[indexCourse].sections[indexSection].milestones[
              indexMilestone
            ].status = 2;
            return updateCourse;
          });
          setCountRequest(0);
          return;
        } else {
          // save asset user, increase current lesson, update currentProgress misson
          setIsLoading(true);
          await instance.patch("users/update_asset", {
            experiences: +lessons[indexLesson - 1].experiences,
            gems: +lessons[indexLesson - 1].gems,
            turns: 5,
            dayStreak: Math.random(),
          });
          setProfile((prev) => {
            const updateProfile = { ...prev };
            updateProfile.experiences =
              +updateProfile.experiences +
              +lessons[indexLesson - 1].experiences;
            updateProfile.gems =
              +updateProfile.gems + +lessons[indexLesson - 1].gems;
            updateProfile.hearts = +updateProfile.hearts + 5;
            return updateProfile;
          });
          await instance.patch("learning_process/update_milestone", {
            courseId,
            sectionId,
            milestoneId,
            currentLesson,
            totalLessonDone: currentLesson,
          });
          const updateMissonPromises = listMissonUpdate.map(async (misson) => {
            switch (misson?.misson?.missonId?.type) {
              case "gems":
                await instance.patch(
                  `user_missons/update?missonId=${misson.misson.missonId._id}`,
                  {
                    currentProgress: +lessons[indexLesson - 1].gems,
                    status:
                      +missons[misson.index].currentProgress +
                        +lessons[indexLesson - 1].gems >=
                      +misson.misson.missonId.numberOfRequirements,
                  },
                );
                setMissons((prevMissons) => {
                  const updateMissons = [...prevMissons];
                  updateMissons[misson.index].currentProgress =
                    +updateMissons[misson.index].currentProgress +
                    +lessons[indexLesson - 1].gems;
                  updateMissons[misson.index].completed =
                    +missons[misson.index].currentProgress >=
                    +misson.misson.missonId.numberOfRequirements;
                  return updateMissons;
                });
                listMissonWhenUpdated = [
                  ...listMissonWhenUpdated,
                  misson.misson,
                ];
                break;
              case "experiences":
                await instance.patch(
                  `user_missons/update?missonId=${misson.misson.missonId._id}`,
                  {
                    currentProgress: +lessons[indexLesson - 1].experiences,
                    status:
                      +missons[misson.index].currentProgress +
                        +lessons[indexLesson - 1].experiences >=
                      +misson.misson.missonId.numberOfRequirements,
                  },
                );
                setMissons((prevMissons) => {
                  const updateMissons = [...prevMissons];
                  updateMissons[misson.index].currentProgress =
                    +updateMissons[misson.index].currentProgress +
                    +lessons[indexLesson - 1].experiences;
                  updateMissons[misson.index].completed =
                    +missons[misson.index].currentProgress >=
                    +misson.misson.missonId.numberOfRequirements;
                  return updateMissons;
                });
                listMissonWhenUpdated = [
                  ...listMissonWhenUpdated,
                  misson.misson,
                ];
                break;
              case "lessons":
                await instance.patch(
                  `user_missons/update?missonId=${misson.misson.missonId._id}`,
                  {
                    currentProgress: 1,
                    status:
                      +missons[misson.index].currentProgress + 1 >=
                      +misson.misson.missonId.numberOfRequirements,
                  },
                );
                setMissons((prevMissons) => {
                  const updateMissons = [...prevMissons];
                  updateMissons[misson.index].currentProgress =
                    +updateMissons[misson.index].currentProgress + 1;
                  updateMissons[misson.index].completed =
                    +missons[misson.index].currentProgress >=
                    +misson.misson.missonId.numberOfRequirements;
                  return updateMissons;
                });
                listMissonWhenUpdated = [
                  ...listMissonWhenUpdated,
                  misson.misson,
                ];
                break;
              case "days":
                const currentDay = formatDate();
                const isHaveDay = profile.activeDays.includes(currentDay);
                await instance.patch(
                  `user_missons/update?missonId=${misson.misson.missonId._id}`,
                  {
                    currentProgress: isHaveDay ? "0" : 1,
                    status:
                      +missons[misson.index].currentProgress + (isHaveDay
                        ? "0"
                        : 1) >=
                          +missons[misson.index].missonId.numberOfRequirements,
                  },
                );
                setMissons((prevMissons) => {
                  const updateMissons = [...prevMissons];
                  updateMissons[misson.index].currentProgress =
                    +updateMissons[misson.index].currentProgress + (isHaveDay
                      ? 0
                      : 1)
                  updateMissons[misson.index].completed =
                    +missons[misson.index].currentProgress >=
                    +missons[misson.index].missonId.numberOfRequirements;
                  return updateMissons;
                });
                listMissonWhenUpdated = [
                  ...listMissonWhenUpdated,
                  misson.misson,
                ];
                break;
              default:
                break;
            }
          });
          await Promise.all(updateMissonPromises);
          setIsLoading(false);
          setListMisson((prevListMisson) => {
            const updateListMisson = [
              ...prevListMisson,
              ...listMissonWhenUpdated,
            ];
            return updateListMisson;
          });
          setIsCongratulation(true);
          setIsShowInfoMisson(true);
          setCurrentLesson(indexLesson + 1);
          setCourseOfLearningProcess((prevCourse) => {
            const updateCourse = [...prevCourse];
            const indexCourse = updateCourse.findIndex(
              (course) =>
                course.courseId._id.toString() === courseId.toString(),
            );
            const indexSection = updateCourse[indexCourse].sections.findIndex(
              (section) =>
                section.sectionId.toString() === sectionId.toString(),
            );
            const indexMilestone = updateCourse[indexCourse].sections[
              indexSection
            ].milestones.findIndex(
              (milestone) =>
                milestone.milestoneId.toString() === milestoneId.toString(),
            );
            updateCourse[indexCourse].sections[indexSection].milestones[
              indexMilestone
            ].currentLesson = indexLesson + 1;
            return updateCourse;
          });
          setCountRequest(0);
        }
      } catch (error) {
        setCountRequest(0);
      }
    }
    setCountRequest(0);
  }, [indexQuestion]);
  const handleBackToMilestonePage = () => {
    setIsLesson(false);
  };
  useEffect(() => {
    colorDiv.current.style.width =
      (indexQuestion / questions?.length) * 100 + "%";
  }, [questions, indexQuestion]);
  useEffect(() => {
    const addLessonToSummaryLesson = async () => {
      const findIndexLesson = lessonsOfSummaryLesson.findIndex(
        (lesson) => lesson.lesson._id.toString() === lessonId.toString(),
      );
      if (findIndexLesson > -1) return;
      try {
        await instance.patch("summary_lesson/add_lesson", { lessonId });
        setLessonOfSummaryLesson((prev) => {
          const updateSumaryLesson = [...prev];
          updateSumaryLesson.push({
            lesson: { _id: lessonId },
            wrongQuestions: [],
          });
          return updateSumaryLesson;
        });
      } catch (error) {}
    };
    addLessonToSummaryLesson();
  }, [lessonId]);
  return (
    <>
      {isCongratulation && (
        <Congratulation
          lessons={lessons}
          currentLesson={currentLesson}
          setIsCongratulation={setIsCongratulation}
          setIsLesson={setIsLesson}
        />
      )}
      <ShowStatusMissons
        listMisson={listMisson}
        setListMisson={setListMisson}
        isShowInfoMisson={isShowInfoMisson}
        setIsShowInfoMisson={setIsShowInfoMisson}
      />
      <div className="relative h-screen w-full py-6">
        <ul className="mx-auto flex w-[90%] items-center justify-center md:w-[75%]">
          <li>
            <i
              onClick={handleBackToMilestonePage}
              className="fa-solid fa-arrow-left cursor-pointer text-2xl md:text-3xl"
            ></i>
          </li>
          <li className="mx-3 h-4 w-full rounded-md bg-[#e5e5e5]">
            <div
              ref={colorDiv}
              className="ml-[2px] mt-[2px] h-[0.8rem] w-[0%] rounded-md bg-red-600 transition ease-linear"
            ></div>
          </li>
          <li className="flex items-center justify-center">
            <img src="/images/logo/heart.webp" className="h-7 w-7" />
            <p className="lazyload ml-1 flex items-center justify-center font-noto text-2xl font-medium text-red-600 md:text-3xl">
              {profile?.hearts ? profile?.hearts : 0}
            </p>
          </li>
        </ul>
        {questions && questions[indexQuestion]?.question?.type === "choose" ? (
          <QuestionTypeChoose
            question={questions[indexQuestion]?.question}
            lessonId={lessonId}
            handleNextQuestion={handleNextQuestion}
            setQuestionsCorrect={setQuestionsCorrect}
          />
        ) : questions &&
          questions[indexQuestion]?.question?.type === "match" ? (
          <QuestionTypeMatch
            question={questions[indexQuestion]?.question}
            lessonId={lessonId}
            handleNextQuestion={handleNextQuestion}
            setQuestionsCorrect={setQuestionsCorrect}
          />
        ) : questions && questions[indexQuestion]?.question?.type === "fill" ? (
          <QuestionTypeFill
            question={questions[indexQuestion]?.question}
            lessonId={lessonId}
            handleNextQuestion={handleNextQuestion}
            setQuestionsCorrect={setQuestionsCorrect}
          />
        ) : questions &&
          questions[indexQuestion]?.question?.type === "rearrange" ? (
          <QuestionTypeRearrange
            question={questions[indexQuestion]?.question}
            lessonId={lessonId}
            handleNextQuestion={handleNextQuestion}
            setQuestionsCorrect={setQuestionsCorrect}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Lesson;
