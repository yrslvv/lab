const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3001;

const studentSchema = new mongoose.Schema({
  myName: { type: String, required: true },
  mySID: { type: String, required: true }
});


const Student = mongoose.model('Student', studentSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

app.post('/', async (req, res) => {
  const mongoURI = req.body.myuri;
  
  try {

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');

 
    const student = new Student({
      myName: 'Yaroslav', 
      mySID: '300368181'  
    });

    await student.save();


    res.send('<h1>Document Added</h1>');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    res.status(500).send('Failed to connect to MongoDB');
  } finally {
    mongoose.connection.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
