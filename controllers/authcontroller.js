const User = require("../models/user");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const userValidation=require("../validations/userValidation")
exports.gethome=(req,res)=>{
  res.render("home");
}

exports.getRegister = (req, res) => {
  res.render("register", {
    name: "",
    email: "",
    error: null,
    otpSent: false
  });
};

exports.postRegister = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, otp } = req.body;

    if (!otp) {

      if (password !== confirmPassword) {
        return res.render("register", {
          error: "Passwords do not match",
          name,
          email,
          otpSent: false
        });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.render("register", {
          error: "Email already exists",
          name,
          email,
          otpSent: false
        });
      }

      
      const generatedOtp = Math.floor(100000 + Math.random() * 900000);

      req.session.tempUser = { name, email, password };
      req.session.otp = generatedOtp;
      req.session.otpExpires = Date.now() + 1 * 60 * 1000; // 5 minutes


      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "ramansandhu73676@gmail.com",
          pass: "vzaj otcp sqwf bnyr" 
        }
      });

      await transporter.sendMail({
        to: email,
        subject: "OTP Verification",
        text: `Your OTP is ${generatedOtp}`
      });

      return res.render("register", {
        name,
        email,
        otpSent: true,
        error: "OTP sent to your email"
      });
    }

    // STEP 2: OTP verification
    if (!req.session.otp || Date.now() > req.session.otpExpires) {
      return res.render("register", {
        error: "OTP expired",
        name: req.session.tempUser?.name || "",
        email: req.session.tempUser?.email || "",
        otpSent: true
      });
    }

    if (otp != req.session.otp) {
      return res.render("register", {
        error: "Invalid OTP",
        name: req.session.tempUser?.name || "",
        email: req.session.tempUser?.email || "",
        otpSent: true
      });
    }

    const { name: n, email: e, password: p } = req.session.tempUser;
    const hashedPassword = await bcrypt.hash(p, 10);

    const user = new User({
      name: n,
      email: e,
      password: hashedPassword,
      role: "student"
    });

    await user.save();

    // Clear session
    req.session.tempUser = null;
    req.session.otp = null;
    req.session.otpExpires = null;

    res.redirect("/login");

  } catch (error) {
    console.error(error);
    res.render("register", {
      error: "Something went wrong",
      name: req.body.name || "",
      email: req.body.email || "",
      otpSent: false
    });
  }
};
exports.getLogin = (req, res) => {
  res.render("login");
};

// exports.postLogin = async (req, res) => {
  // try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.send("User not found");

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.send("Invalid password");

//     req.session.user = user;

//     if (user.role === "admin") {
//       res.redirect("/admin");
//     } else {
//       res.redirect("/student");
//     }

//   } catch (error) {
//     res.send("Login error");
//   }
// };


exports.postLogin = async (req, res) => {
  try {
    const validatedData = await userValidation.validate(req.body,{abortEarly:false});
    const { email, password } = validatedData;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid password");
    }
    req.session.user = user;
    if (user.role === "admin") {
      return res.redirect("/admin");
    } else {
      return res.redirect("/student");
    }

  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ errors: error.errors });
    }

   
    console.error(error);
    return res.status(500).send("Login error");
  }
}; 
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};