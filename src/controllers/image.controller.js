const fileUpload = require("../utils/fileUpload");

class ImageController {
  serveImage = async (req, res) => {
    const { filename } = req.params;

    try {
      const imagePath = fileUpload.getImagePath(filename);
      res.sendFile(imagePath);
    } catch (error) {
      res.status(404).json({ message: "Image not found" });
    }
  };
}

module.exports = new ImageController();
