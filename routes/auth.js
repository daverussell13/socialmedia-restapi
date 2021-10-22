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
    res.status(400).json({
      status: 'Bad request',
      message: err.message
    });
  }
})

module.exports = router;