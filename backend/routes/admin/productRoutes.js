const express = require("express");
const {
  addProduct,
  handleImageUpload,
  getAllProducts,
  editProduct,
  deleteProduct,
} = require("../../controller/admin/productController");
const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

router.post("/image-upload", upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.get("/get", getAllProducts);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
