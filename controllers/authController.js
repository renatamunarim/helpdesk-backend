import Usuario from '../models/Usuario.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export async function registrarUsuario(req, res) {
  try {
    const { nome, email, senha, perfil } = req.body

    const existente = await Usuario.findOne({ where: { email } })
    if (existente) return res.status(400).json({ erro: 'E-mail já cadastrado' })

    const senhaCriptografada = await bcrypt.hash(senha, 10)

    const novo = await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada,
      perfil
    })

    res.status(201).json(novo)
  } catch (erro) {
    res.status(500).json({ erro: erro.message })
  }
}

export async function loginUsuario(req, res) {
  try {
    const { email, senha } = req.body

    const usuario = await Usuario.findOne({ where: { email } })
    if (!usuario) return res.status(401).json({ erro: 'Credenciais inválidas' })

    const senhaValida = await bcrypt.compare(senha, usuario.senha)
    if (!senhaValida)
      return res.status(401).json({ erro: 'Credenciais inválidas' })

    const token = jwt.sign(
      { id: usuario.id, perfil: usuario.perfil, nome: usuario.nome },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.json({ token })
  } catch (erro) {
    res.status(500).json({ erro: erro.message })
  }
}
