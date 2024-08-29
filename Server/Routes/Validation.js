const mongoose = require('mongoose');

const validateAndConvertObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid movie ID" });
  }
  req.params.id = new mongoose.Types.ObjectId(id);
  next();
};

module.exports = validateAndConvertObjectId;
