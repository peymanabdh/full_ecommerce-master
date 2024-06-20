
const jwt =require('jsonwebtoken');

// تولید توکن JWT
export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.emit.secret_key, { expiresIn: '10h' });
};

// بررسی و رمزگشایی توکن JWT
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.emit.secret_key);
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
