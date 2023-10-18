const express = require('express');
const userRouter = express.Router();
const UsuarioController = require('../controller/UserController');

userRouter.get('/', UsuarioController.listarUsuarios);
userRouter.get('/:email', UsuarioController.buscarUsuarios);
userRouter.post('/', UsuarioController.adicionarUsuario);
userRouter.delete('/:email', UsuarioController.deleteUsuarios);
userRouter.put('/:email', UsuarioController.atualizarUsuarios);

module.exports = userRouter;