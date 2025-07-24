import { Router } from "express";
import { register ,login} from "../controller/auth-controller.js";

export const authRouter=Router()
authRouter.post("/",register)
authRouter.post("/login",login)