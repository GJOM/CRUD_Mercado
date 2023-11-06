import { Router } from "express";
import { getUsers, postUsers, checkToken, updateUser } from "../../controllers/users";
import { userUpload } from "../../Config/multer";

export const userRouter = Router();


userRouter.post("/", getUsers);
userRouter.post("/register", postUsers);
userRouter.post("/token", checkToken);
userRouter.put("/upload",userUpload.single('avatar'), updateUser);

