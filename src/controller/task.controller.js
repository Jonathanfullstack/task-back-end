const TaskModel = require("../models/task.models");

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getTask() {
        try {
            const tasks = await TaskModel.find({});
            this.res.status(200).send(tasks);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async getTaskById() {
        try {
            const taskId = this.req.params.id;

            const task = await TaskModel.findById(taskId);

            if (!task) {
                return this.res
                    .status(404)
                    .send("essa tarefa nao foi encontrada!");
            }
            return this.res.status(200).send(task);
        } catch {
            res.status(500).send(error.message);
        }
    }

    async getCreated() {
        try {
            const newTask = new TaskModel(this.req.body);
            await newTask.save();
            this.res.status(201).send(newTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async gatAtualizar() {
        try {
            const taskId = this.req.params.id;
            const taskData = this.req.body;

            // Verifica se a tarefa existe
            const taskToUpdate = await TaskModel.findById(taskId);
            if (!taskToUpdate) {
                return this.res.status(404).send("Tarefa não encontrada");
            }

            const allowedUpdates = ["isCompleted"];
            const requestedUpdates = Object.keys(taskData);

            // Verifica se os campos são permitidos
            for (const update of requestedUpdates) {
                if (allowedUpdates.includes(update)) {
                    taskToUpdate[update] = this.req.body[update];
                } else {
                    return this.res
                        .status(400)
                        .send("Um ou mais campos inseridos não são editáveis!");
                }
            }

            // Salva as alterações
            await taskToUpdate.save();

            return this.res.status(200).send(taskToUpdate);
        } catch (error) {
            return this.res.status(500).send(error.message);
        }
    }
}

module.exports = TaskController;
