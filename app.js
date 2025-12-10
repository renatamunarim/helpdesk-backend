import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { database } from './database.js'
import { routerAuth } from './routes/auth.routes.js'
import { routerChamados } from './routes/chamados.routes.js'

await database.sync({ alter: true })

const app = express()
app.use(cors())
app.use(express.json())

app.use("/", routerAuth)
app.use("/", routerChamados)

database.sync().then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`🚀 Servidor rodando na porta ${process.env.PORT}`)
  )
})

