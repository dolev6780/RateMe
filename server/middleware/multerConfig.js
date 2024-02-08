const multer = require('multer');

// Set up Multer to store files in memory
const upload = multer({
    storage: multer.memoryStorage(), // Use memory storage instead of disk storage
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB file size limit
  });
module.exports = upload;
