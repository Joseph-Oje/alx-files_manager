const sha1 = require('sha1');
const User = require('../utils/User');

exports.postNew = async (req, res) => {
    // Get the email and password from the request body
    const { email, password } = req.body;

    // Check if the email and password are present in the request body
    if (!email) {
        return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
        return res.status(400).json({ error: 'Missing password' });
    }

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: 'Already exist' });
    }

    // Hash the password using SHA1
    const hashedPassword = sha1(password);

    // Create a new user object with the email and hashed password
    const newUser = new User({
        email,
        password: hashedPassword,
    });

    // Save the new user to the database
    try {
        await newUser.save();
        // Return the new user with only the email and id fields and a status code of 201
        res.status(201).json({ email: newUser.email, id: newUser._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
