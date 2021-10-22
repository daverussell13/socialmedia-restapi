const router = require('express').Router();
const bcrypt = require('bcrypt');

/* Models */
const User = require('../models/User');

/* Register */
router.post('/register', async (req,res) => {
  try {
    /* Hash Password using BCRYPT */
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch(err) {
    res.status(500).json(err);
  }
});

/* Login */
router.post('/login', async (req,res) => {
  const { email, password } = req.body;
  try {
    // Returns null when document not found
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ status: 'User not found' });
    } else {
      // Check Hashed Password with User entered password
      const validPassword = await bcrypt.compare(password,user.password);
      if (!validPassword) res.status(400).json({ status: 'Wrong password' });
      else res.status(200).json(user);
    }
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;