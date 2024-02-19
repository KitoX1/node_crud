import jwt from 'jsonwebtoken'

export function authMiddleware(req, res, next) {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1] // Bearer TOKEN

    if (!token) return res.status(401).json({ message: 'Пользователь не авторизован' })

    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ message: 'Пользователь не авторизован' })
  }
}