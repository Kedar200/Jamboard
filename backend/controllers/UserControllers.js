const User = require('../models/UserModel');
const jwtUtils = require('../utils/jwtUtils');

const signup = async (req, res) => {
    try {
        console.log(req.body);
        const { name ,email, password } = req.body;
        console.log(email, password);
        const user = await User.create({ name ,email, password });
        console.log(user);
        const token = jwtUtils.generateToken(user._id);
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

const login = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const token = jwtUtils.generateToken(user._id);
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
}

module.exports = { signup, login };