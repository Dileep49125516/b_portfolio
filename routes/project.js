const express = require('express');
const Project = require('../models/project');
const router = express.Router(); 
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage: storage });


router.get('/get-details', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/put-details', upload.single('image'), async (req, res) => {
  
  const project = new Project({
    title: req.body.title,
    technicalSkills: req.body.technicalSkills,
    description: req.body.description,
    link: req.body.link,
    image: req.file ? `/uploads/${req.file.filename}` : null 
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Project.findByIdAndDelete(id);

    if (result) {
      res.status(200).send(`Project with title "${result.title}" deleted`);
    } else {
      res.status(404).send('Project not found');
    }
  } catch (error) {
    res.status(500).send('Error deleting the project');
  }
});

module.exports = router;
