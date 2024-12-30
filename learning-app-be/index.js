import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

import CourseRouter from "./routes/course.route.js"
import UserRouter from "./routes/user.route.js"
import TokenRouter from "./routes/token.route.js"
import SectionRouter from "./routes/section.route.js"
import MilestoneRouter from "./routes/milestone.route.js"
import LessonRouter from "./routes/lesson.route.js"
import LearningProcessRouter from "./routes/learningProcess.route.js"
import SummaryLessonRouter from "./routes/summaryLesson.route.js"
import QuestionRouter from "./routes/question.route.js"
import GlyphsAndAlphabetRouter from "./routes/glyphsAndAlphabet.route.js"
import UserMissonRouter from "./routes/userMisson.route.js"
import AdminRouter from "./routes/admin.route.js"

import { register, logIn, handleLoginWithFacebook, handleLoginWithGoogle } from "./controllers/user.controller.js"
import { createToken } from "./controllers/token.controller.js"
import { handleForgotPassword } from "./controllers/user.controller.js"
import { sendMisson } from "./cronJobs/misson.cron.js"

import authMiddleware from "./middlewares/auth.middlewares.js"
import localizationMiddleware from "./middlewares/localization.middlewares.js"
import { validateRegisterRequest, validateLoginRequest, validateTokenRequest, validateForgotPasswordRequest } from "./validations/userRequest.validation.js"

await mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("database connected!"))

const PORT = process.env.PORT_LOCAL || 8080
const app = express()
app.use(express.json())
app.use(cors())
app.use(localizationMiddleware.applyLocalization)

// Send misson to user
sendMisson()

app.post("/api/v1/register",validateRegisterRequest, register)
app.post("/api/v1/login",validateLoginRequest, logIn)
app.post("/api/v1/facebook_login", handleLoginWithFacebook)
app.post("/api/v1/google_login", handleLoginWithGoogle)
app.post("/api/v1/token", validateTokenRequest, createToken)
app.post("/api/v1/users/forgot_password", validateForgotPasswordRequest, handleForgotPassword)

app.use(authMiddleware.authentication)

app.use("/api/v1/courses", CourseRouter)
app.use("/api/v1/users", UserRouter)
app.use("/api/v1/tokens", TokenRouter)
app.use("/api/v1/sections", SectionRouter)
app.use("/api/v1/milestones", MilestoneRouter)
app.use("/api/v1/lessons", LessonRouter)
app.use("/api/v1/questions", QuestionRouter)
app.use("/api/v1/learning_process", LearningProcessRouter)
app.use("/api/v1/summary_lesson", SummaryLessonRouter)
app.use("/api/v1/glyphs_alphabet", GlyphsAndAlphabetRouter)
app.use("/api/v1/user_missons", UserMissonRouter)
app.use("/api/v1/admin", AdminRouter)


app.listen(PORT, (err) => {
    if(err) throw new Error(err)
    console.log(`Server is running PORT: ${PORT}`)
})