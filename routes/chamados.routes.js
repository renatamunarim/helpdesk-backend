import express from 'express'
import { autenticarToken } from '../middleware/auth.js'
import {
  criarChamado,
  listarChamadosUsuario,
  listarTodosChamados,
  atualizarChamado,
  removerChamado,
  relatorioChamados
} from "../controllers/chamadosController.js"

const routerChamados = express.Router()

routerChamados.post('/chamados', autenticarToken, criarChamado)
routerChamados.get('/chamados', autenticarToken, listarChamadosUsuario)
routerChamados.get('/chamados/all', autenticarToken, listarTodosChamados)
routerChamados.put('/chamados/:id', autenticarToken, atualizarChamado)
routerChamados.delete('/chamados/:id', autenticarToken, removerChamado)
routerChamados.get('/chamados/relatorios', autenticarToken, relatorioChamados)


export { routerChamados }