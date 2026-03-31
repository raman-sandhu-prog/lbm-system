const User = require("../models/User");
const bcrypt = require("bcryptjs");
exports.gethome=(req,res)=>{
  res.render("home");
}

exports.getRegister = (req, res) => {
  res.render("register");
};

exports.postRegister = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await user.save();
    res.redirect("/login");

  } catch (error) {
    res.send("Error in registration");
  }
};

exports.getLogin = (req, res) => {
  res.render("login");
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send("Invalid password");

    req.session.user = user;

    if (user.role === "admin") {
      res.redirect("/admin");
    } else {
      res.redirect("/student");
    }

  } catch (error) {
    res.send("Login error");
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};