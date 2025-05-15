import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routers/user.router";
import { errorResponse } from "./middlewares/errorHandler.middleware";

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "5000", 10);

app.use(cors());
app.use(express.json());

// Middleware untuk route user
app.use("/api/users", userRoutes);

// Middleware untuk error handling
app.use(errorResponse);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});