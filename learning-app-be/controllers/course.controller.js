import { findAllCourse, findCourseById } from "../repositories/course.repository.js";

export const getAllCourse = async(req, res) =>{
    try {
        const courses = await findAllCourse()
        res.status(200).send({
            data: {
                courses
            }
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
        });
    }
}

export const getOneCourse = async(req, res) => {
    const { courseId } = req.params
    try {
        const course = await findCourseById(courseId)
        res.status(200).send({
            data: {
                course
            }
        });
    } catch (error) {
        res.status(403).send({
            message: error.message,
        });
    }
}
