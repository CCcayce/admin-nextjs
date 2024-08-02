// pages/api/form.js

const { getFormData } = require('../../db');

export default function handler (req, res) {
  const { startDate, endDate, page = 1, perPage = 10 } = req.query;
  const offset = (page - 1) * perPage;
  getFormData(startDate, endDate, offset, perPage, (err, data) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
    return res.status(200).json(data || []);
  });
}
