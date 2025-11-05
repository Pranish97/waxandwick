const { imageUploadUtils } = require("../../helpers/cloudinary");

const productModel = require("../../models/productModel");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await imageUploadUtils(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      productName,
      image,
      price,
      discountPrice,
      description,
      quantity,
      inStock,
    } = req.body;

    const product = new productModel({
      productName,
      image,
      price,
      discountPrice,
      description,
      quantity,
      inStock,
    });

    await product.save();

    res.status(200).json({
      message: "Product Added Successfully!",
      data: product,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findByIdAndUpdate(id);

    if (!product) {
      return res.json({
        message: "Product Not Found!",
        success: false,
        error: true,
      });
    }

    product.productName = productName || product.productName;
    product.price = price || product.price;
    product.discountPrice = discountPrice || product.discountPrice;
    product.description = description || product.description;
    product.quantity = quantity || product.quantity;
    product.inStock = inStock || product.inStock;

    await product.save();

    return res.status(200).json({
      message: "Product Updated Successfullyt!",
      data: product,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const listOfProducts = await productModel.find();

    res.status(200).json({
      message: "List of Products",
      data: listOfProducts,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      return res.json({
        message: "Product Not Found!",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      message: "Product Deleted Successfully!",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  editProduct,
  getAllProducts,
  deleteProduct,
};
