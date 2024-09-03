const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const project = require('./routes/project');

dotenv.config();



const app = express();


app.use(express.json());


app.use('/uploads', express.static('uploads'));


app.use(cors({
  origin: 'https://f-portfolio-two.vercel.app',
}));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));


app.use('/api/projects', project);


app.get('/', (req, res) => {
  res.send('Portfolio Backend API');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
