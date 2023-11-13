const info = require("../models/info.model");

exports.getInfo = async (req, res, next) => {
  try {
    const infoData = await info.find();

    res.status(200).json({
      status: true,
      message: "Info data fetched successfully",
      data: infoData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getInfoById = async (req, res, next) => {
  try {
    const infoData = await info.findById(req.params.id);

    if (!infoData) {
      return res.status(404).json({
        status: false,
        message: "Info data not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Info data fetched successfully",
      data: infoData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.postInfo = async (req, res, next) => {
  try {
    const infoData = await info.create(req.body);

    res.status(201).json({
      status: true,
      message: "Info data posted successfully",
      data: infoData,
    });
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      // Handle Mongoose validation error
      return res.status(400).json({
        status: false,
        message: "Validation error",
        errors: err.errors,
      });
    }
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.deleteInfo = async (req, res, next) => {
  try {
    const deletedInfo = await info.findByIdAndDelete(req.params.id);

    if (!deletedInfo) {
      return res.status(404).json({
        status: false,
        message: "Info data not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Info data deleted successfully",
      data: deletedInfo,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
