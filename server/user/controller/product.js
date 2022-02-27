const Product = require("../../model/product");
const Feedback = require("../../model/feedback");

exports.getProductDetails = async (req, res) => {
  try {
    const product_id = req.params.product_id;
    const product_details = await Product.findOne({
      _id: product_id,
      status: true,
    });

    const feedbacks = await Feedback.find({ product_id: product_id });

    res.status(200).json({
      message: "Product info",
      body: { product_details, feedbacks },
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      status: "try again please.",
      message: error.message,
      error: true,
    });
  }
};

exports.getproducts = async (req, res) => {
  try {
    let products = await Product.find({ status: true }).sort({ _id: -1 });

    res.status(200).json({
      message: "Showing All products",
      body: products,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      status: "try again please.",
      message: error.message,
      error: true,
    });
  }
};

exports.addFeedback = async (req, res) => {
  try {
    const userId = req.userData.id;
    const product_id = req.params.product_id;

    const feedbackExist = await Feedback.findOne({
      userId: userId,
      product_id: product_id,
    });

    if (feedbackExist) {
      res.status(200).json({
        message: "You have already have added feedback",
        error: true,
      });
    } else {

      const addFeedback = new Feedback({
        user_name: req.userData.name,
        comment: req.body.comment,
        userId: userId,
        product_id: product_id,
      });
      await addFeedback.save();

      const feedbackList = await Feedback.find({ product_id: product_id }).sort(
        { _id: -1 }
      );

      res.status(200).json({
        message: "Feedback added",
        body: feedbackList,
        error: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "try again please.",
      message: error.message,
      error: true,
    });
  }
};
