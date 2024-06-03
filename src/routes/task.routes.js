const express = require("express");
const TaskController = require("../controller/task.controller");
const TaskModel = require("../models/task.models");
const router = express.Router();

//  usamos essa rota para ler um recurso do nosso bamco de dados
router.get("/", async (req, res) => {
    return new TaskController(req, res).getTask();
});

//  usamos essa rota para ler um recurso no nosso banco de dados
router.get("/:id", async (req, res) => {
    return new TaskController(req, res).getTaskById();
});
//  usamos essa rota para criar um recurso para nosso banco de dados
router.post("/", async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);
        await newTask.save();
        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//  usamos essa rota para atualizar recursos especifico na nossa aplicacao
router.patch("/:id", async (req, res) => {
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

//  usamos essa rota para  deletar alguns tipos de rotas na nossa aplicacao
router.delete("/:id", async (req, res) => {
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

//esse modulo fara a exportacao do nosso arquivo Router
module.exports = router;
