import { Router } from "express";
import { getUsers, registerUser, getUserByEmail } from "../controllers/user.controller";
import { loginController } from "../controllers/auth.controller";

const router: Router = Router();

router.get("/", getUsers);
router.get("/:email", getUserByEmail);
router.post("/", registerUser);

// auth
// router.post("/login", loginController);

export default router;