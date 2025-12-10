import jwt from 'jsonwebtoken'

export function autenticarToken(req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(401).json({ erro: 'Token não informado' })

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRET)
    req.usuario = usuario
    next()
  } catch {
    res.status(403).json({ erro: 'Token inválido ou expirado' })
  }
}