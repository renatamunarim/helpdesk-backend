import express from 'express'
import { registrarUsuario, loginUsuario } from '../controllers/authController.js'

const routerAuth = express.Router()

routerAuth.post('/auth/register', registrarUsuario)
routerAuth.post('/auth/login', loginUsuario)

export { routerAuth }