import express from "express"
import { getOtherUsers, getProfile, login, logout, register } from "../controllers/user.controllers.js"
import { isAuthenticated } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.post("/logout", isAuthenticated, logout);
router.get("/getprofile", isAuthenticated, getProfile);
router.get("/getOtherusers", isAuthenticated, getOtherUsers);

export default router