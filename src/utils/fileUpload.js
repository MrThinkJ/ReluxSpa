const path = require("path");
const fs = require("fs").promises;
const { v7 } = require("uuid");

const UPLOAD_DIR = path.join(__dirname, "..", "..", "uploads");

const fileUpload = {
  async saveImage(file) {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const extension = path.extname(file.originalname);
    const filename = `${v7()}${extension}`;
    const filepath = path.join(UPLOAD_DIR, filename);
    await fs.writeFile(filepath, file.buffer);
    return filename;
  },

  getImagePath(filename) {
    return path.join(UPLOAD_DIR, filename);
  },
};

module.exports = fileUpload;
