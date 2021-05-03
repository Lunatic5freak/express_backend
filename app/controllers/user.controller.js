const db = require("./../model/index");
const User = db.users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
  console.log("inside service");
  const password = await bcrypt.hash(req.params.password, 10);
  console.log(req.params.email);
  var user = new User({
    name: req.body.name,
    email: req.body.email,
    password: password,
  });
  const user1 = await user.save();
  res.send(user1);
};

exports.update = async (req, res) => {
  let cookie = await jwt.verify(req.cookies.token, "supersecret");
  const user = await User.findOne({ email: cookie.email });
  if (user.token === req.cookies.token && cookie.role == "user") {
    let id = { _id: user._id };
    await User.findOneAndUpdate(id, req.body);
    let msg = { msg: "update successfully" };
    res.send(msg);
  } else {
    res.send({ msg: "unauthorized" });
  }
};

exports.delete = async (req, res) => {
  let cookie = await jwt.verify(req.cookies.token, "supersecret");
  const user = await User.findOne({ email: cookie.email });
  if (user.token === req.cookies.token && cookie.role == "admin") {
    let id = { _id: user._id };
    await User.findOneAndRemove(id);
    let msg = { msg: "deleted successfully" };
    res.send(msg);
  } else {
    let msg = { msg: "unauthorized" };
    res.send(msg);
  }
};

exports.findone = async (req, res) => {
  let cookie = await jwt.verify(req.cookies.token, "supersecret");
  if (cookie.email === req.params.id) {
    const user = await User.findOne({ email: req.params.id });
    res.send(user);
  } else {
    res.send({ msg: "authentication failure" });
  }
};

exports.findall = async (req, res) => {
  let cookie = await jwt.verify(req.cookies.token, "supersecret");
  if (cookie.role === "admin") {
    if (req.params.keyword != null) {
      const user = await User.find({ $text: { $search: req.params.keyword } });
      res.send(user);
    } else {
      const users = await User.find({});
      res.send(users);
    }
  } else {
    res.send({ msg: "unauthorized" });
  }
};
