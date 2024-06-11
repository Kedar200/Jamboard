const CanvasModel = require('../models/CanvasModel');
const jwtUtils = require('../utils/jwtUtils');

const createCanvas = async(req, res) => {
    try {
        const userId = req.userData.userId;
        const canvas = await CanvasModel.create({ createdBy: userId, viewAccess: [userId], editAccess: [userId] });
        res.status(201).json({ canvas });
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
}

const getAllCanvas = async(req, res) => {
    try {
        const userId = req.userData.userId;
        const canvases = await CanvasModel.find({ $or: [{ createdBy: userId }, { viewAccess: userId }, { editAccess: userId }] }).populate('createdBy');
        res.status(200).json({ canvases });
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
}

const getCanvas = async(req, res) => {
    try {
        const userId = req.userData.userId;

        const canvasId = req.params.code;
        const canvas = await CanvasModel.findOne({ _id: canvasId, $or: [{ createdBy: userId }, { viewAccess: userId }, { editAccess: userId }] }).populate('createdBy');
        if (!canvas) {
            res.status(404).json({ message: 'Canvas not found' });
            return;
        }
        res.status(200).json({ canvas });
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
}

const updateAccess = async(req, res) => {
    try {
        const userId = req.userData.userId;
        const { code } = req.params;
        const { accessType, email } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const canvas = await CanvasModel.findOne({ code, createdBy: userId });
        if (!canvas) {
            res.status(404).json({ message: 'Canvas not found' });
            return;
        }
        if (accessType === 'view') {
            canvas.viewAccess.push(user._id);
        } else if (accessType === 'edit') {
            canvas.editAccess.push(user._id);
        }
        await canvas.save();
        res.status(200).json({ canvas });
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
}

const deleteCanvas = async(req, res) => {
    try {
        const userId = req.userData.userId;
        const { code } = req.params;
        const canvas = await CanvasModel.findOne({ code, createdBy: userId });
        if (!canvas) {
            res.status(404).json({ message: 'Canvas not found' });
            return;
        }
        await canvas.delete();
        res.status(200).json({ message: 'Canvas deleted' });
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
}

const updateCanvas = async(req, res) => {
    try {
        const userId = req.userData.userId;
        const { code } = req.params;
        console.log(code)
        const { drawing } = req.body;
        const canvas = await CanvasModel.findOne({ _id: code, $or: [{ createdBy: userId }, { viewAccess: userId }, { editAccess: userId }] }).populate('createdBy');

        if (!canvas) {
            res.status(404).json({ message: 'Canvas not found' });
            return;
        }
        canvas.drawing = drawing;
        await canvas.save()
        res.status(200).json({ message: 'Canvas Updated' });
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
}



module.exports = { createCanvas, getAllCanvas, getCanvas, updateAccess, deleteCanvas, updateCanvas };