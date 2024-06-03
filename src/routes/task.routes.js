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
    return new TaskController(req, res).getCreated();
});

//  usamos essa rota para atualizar recursos especifico na nossa aplicacao
router.patch("/:id", async (req, res) => {
    return new TaskController(req, res).gatAtualizar();
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
