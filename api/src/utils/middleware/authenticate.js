require('dotenv').config(); // biblioteca dotenv para acessar as variáveis de ambiente
const jwt = require('jsonwebtoken'); // biblioteca para gerar e validar o token jwt

// valida o token de usuário
const validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).json({ message: 'Token não fornecido.' });
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
  
      if (!decoded) {
        return res.status(403).json({ message: 'Token inválido para este usuário.' });
      }
      req.user = decoded
      next();
  
    } catch (error) {
      console.error("Error verifying token:", error.message);
      return res.status(403).json({ message: 'Token inválido.' });
    }
};

module.exports = validateToken
