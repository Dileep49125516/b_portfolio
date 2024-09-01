const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  technicalSkills:{type:String,required:true},
  description: { type: String, required: true },
  link: { type: String, required: true },
  image:{type:String}
  
});

module.exports = mongoose.model('Project', ProjectSchema);
