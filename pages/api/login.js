// pages/api/login.js
const { login } = require('../../db');

export default function handler (req, res) {
  const { email, password } = req.body;
  login(email, password, (err, user) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    if (user) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  });
}
