import express, { NextFunction, Request, Response } from "express";

import { ApiError } from "./errors/api-error";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

// app.delete("/users/:userId", async (req, res) => {
//   try {
//     const users = await readData();
//     const userId = Number(req.params.userId);
//     const userIndex = users.findIndex((user) => user.id === userId);
//     if (userIndex === -1) {
//       return res.status(404).send("User not found");
//     }
//     users.splice(userIndex, 1);
//     await writeData(users);
//     res.sendStatus(204);
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// });

app.use(
  "*",
  (error: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).send(error.message);
  },
);

process.on("uncaughtException", (error) => {
  console.error("uncaughtException", error.message, error.stack);
  process.exit(1);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
