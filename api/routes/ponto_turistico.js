const express = require("express");
const router = express.Router();
const ponto_turis_controller = require("../controllers/ponto_turistico_controller");

router.get("/", ponto_turis_controller.getPontosTuristicos);

router.get("/:textodebusca", ponto_turis_controller.getBuscarPontosTuristicos);

router.post("/", ponto_turis_controller.salvarPontoTuristico);

router.patch("/", ponto_turis_controller.editarPontoTuristico);

router.delete("/", ponto_turis_controller.deletarPontoTuristico);

module.exports = router;
