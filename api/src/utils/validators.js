require('dotenv').config(); // biblioteca dotenv para acessar as variáveis de ambiente
const jwt = require('jsonwebtoken'); // biblioteca para gerar e validar o token jwt

// verifica o formato do email usando regex
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

//Validação do tamanho da senha, que deve ter no mínimo 8 caracteres
const validateLenPassword = (password) => {
  return password?.toString().length >= 8 ? true : false
}

// valida o token de usuário
const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const user = req.body
    
    // Verifica se o userId do token corresponde ao userId da requisição
    if (!user.userId || decoded.userId !== user.userId) {
      return res.status(403).json({ message: 'Token inválido para este usuário.' });
    }
    next();
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return res.status(403).json({ message: 'Token inválido.' });
  }
};

module.exports = {
    validateEmail,
    validateLenPassword,
    validateToken
}
