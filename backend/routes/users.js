const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require('axios')
const auth = require("../middlewares/auth");
const User = require("../Modele/Users.model");


router.post("/register", async (req, res) => {
    try {
      let { email, password, passwordCheck, nom, descrimination } = req.body;
      console.log(descrimination);
  
      if (!email || !password || !passwordCheck)
        return res.status(400).json({ msg: "Not all fields have been entered." });
      if (password.length < 5)
        return res
          .status(400)
          .json({ msg: "The password needs to be at least 5 characters long." });
      if (password !== passwordCheck)
        return res
          .status(400)
          .json({ msg: "Enter the same password twice for verification." });
  
      const existingUser = await User.findOne({ email: email });
      if (existingUser)
        return res
          .status(400)
          .json({ msg: "An account with this email already exists." });
  
      if (!nom) nom = email;
  
      //const salt = await bcrypt.genSalt();
      //const passwordHash = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        nom,
        email,
        password: password,
        descrimination : descrimination
      });
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password)
        return res.status(400).json({ msg: "Not all fields have been entered." });
  
      const user = await User.findOne({ email: email });
      if (!user)
        return res
          .status(400)
          .json({ msg: "No account with this email has been registered." });
  
      //const isMatch = await bcrypt.compare(password, user.password);
      if (password!=user.password) return res.status(400).json({ msg: "Invalid credentials." });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      
      res.json({
        token,
        user,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post("/update", async (req, res) => {
    try {
      const r = await User.update({_id:req.body._id}, req.body);
      res.json(r);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

router.post("/delete", async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.body);
      res.json(deletedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  
router.post("/tokenIsValid", async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);
  
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) return res.json(false);
  
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);
  
      return res.json(true);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({user});
  });

  router.post("/niveau", async (req, res) => {
    axios
    .post('http://127.0.0.1:9000/api', [[req.body.score ,req.body.nbrelesson]])
    .then(r => {
      let niveau="debutant";
      console.log(r.data);
      if (r.data==1)  niveau="intermediaire"
        else if(r.data==2)  niveau="avancé"
      res.send(niveau);
    })
    .catch(error => {
      console.error(error)
    })
  });



  module.exports = router;
