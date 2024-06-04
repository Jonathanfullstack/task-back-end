const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const taskRouter = require("./src/routes/task.routes");

const connectToDatabase = require("./src/database/mongoose.database");

const TaskModel = require("./src/models/task.models");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
connectToDatabase();
app.use("/tasks", taskRouter);

app.listen(8000, () => console.log("listen on port 8000"));
