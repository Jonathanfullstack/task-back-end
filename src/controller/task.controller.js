const mongoose = require("mongoose");
const TaskModel = require("../models/task.models");
const { notfoundError } = require("../errors/mongo.db.error");
const { notAllowedFieldsToUpdateErrors } = require("../errors/general.errors");
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

            // Verificar se o taskId é um ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(taskId)) {
                return notfoundError(this.res);
            }

            const task = await TaskModel.findById(taskId);

            if (!task) {
                return notfoundError(this.res);
            }
            return this.res.status(200).send(task);
        } catch (error) {
            this.res.status(500).send(error.message);
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
            if (!mongoose.Types.ObjectId.isValid(taskToUpdate)) {
                return notfoundError(this.res);
            }

            const allowedUpdates = ["isCompleted"];
            const requestedUpdates = Object.keys(taskData);

            // Verifica se os campos são permitidos
            for (const update of requestedUpdates) {
                if (allowedUpdates.includes(update)) {
                    taskToUpdate[update] = this.req.body[update];
                } else {
                    return notAllowedFieldsToUpdateErrors(this.res);
                }
            }

            // Salva as alterações
            await taskToUpdate.save();

            return this.res.status(200).send(taskToUpdate);
        } catch (error) {
            return this.res.status(500).send(error.message);
        }
    }
    async getDeleted() {
        try {
            const taskId = this.req.params.id;

            const taskToDeleted = await TaskModel.findById(taskToDeleted);

            if (!mongoose.Types.ObjectId.isValid(taskId)) {
                return notfoundError(this.res);
            }

            const deletedTask = await TaskModel.findByIdAndDelete(taskId);

            this.res.status(200).send(deletedTask);
        } catch {
            this.res.status(500).send(error.message);
        }
    }
}

module.exports = TaskController;
