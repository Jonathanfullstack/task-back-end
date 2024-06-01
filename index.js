const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database");
const TaskModel = require("./src/models/task.models");
dotenv.config();

const app = express();
app.use(express.json());
connectToDatabase();

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await TaskModel.find({});
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;

        const task = await TaskModel.findById(taskId);

        if (!task) {
            return res.status(404).send("essa tarefa nao foi encontrada!");
        }
        return res.status(200).send(task);
    } catch {
        res.status(500).send(error.message);
    }
});

app.post("/tasks", async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);
        await newTask.save();
        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
app.patch("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;

        // Verifica se a tarefa existe
        const taskToUpdate = await TaskModel.findById(taskId);
        if (!taskToUpdate) {
            return res.status(404).send("Tarefa não encontrada");
        }

        const allowedUpdates = ["isCompleted"];
        const requestedUpdates = Object.keys(req.body);

        // Verifica se os campos são permitidos
        for (const update of requestedUpdates) {
            if (allowedUpdates.includes(update)) {
                taskToUpdate[update] = req.body[update];
            } else {
                return res
                    .status(400)
                    .send("Um ou mais campos inseridos não são editáveis!");
            }
        }

        // Salva as alterações
        await taskToUpdate.save();

        return res.status(200).send(taskToUpdate);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

app.delete("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;

        const taskToDeleted = await TaskModel.findById(taskId);

        if (!taskToDeleted) {
            return res.status(404).send("Essa tarefa nao foi encontrada !");
        }

        const deletedTask = await TaskModel.findByIdAndDelete(taskId);

        res.status(200).send(deletedTask);
    } catch {
        res.status(500).send(error.message);
    }
});

app.listen(8000, () => console.log("listen on port 8000"));
