const User = require("../../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      throw new Error("Email already in use");
    }
    if (password.length < 5) {
      throw new Error("Password must contain atleast 5 character");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name: req.body.name,
      email: email,
      password: hashedPassword,
      role: "customer",
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Your acccount is created.",
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      status: "unsuccessful SignUp, try again please.",
      message: error.message,
      error: true,
    });
  }
};

exports.logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email, role: "customer" });

    if (!user) {
      throw new Error("Invalid email, try again!");
    }
    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
      throw new Error("Invalid password, try again!");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Successful Login",
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      status: "Unsuccessful Login",
      message: error.message,
      error: true,
    });
  }
};
