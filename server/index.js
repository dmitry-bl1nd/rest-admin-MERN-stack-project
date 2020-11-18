import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import path from 'path';
import Pusher from 'pusher';
import db from './db.js';


const __dirname = path.resolve();

// console.log(path.join('../client/build/index.html'))

Grid.mongo = mongoose.mongo
const mongoURI = 'mongodb+srv://dmitry-admin:DgT6wWHZW40cOjVc@cluster0.biogq.mongodb.net/rest-db?retryWrites=true&w=majority'
const storage = new GridFsStorage({ url: mongoURI });
const upload = multer({ storage });

mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

const conn = mongoose.createConnection(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
    console.log('DB connected')
})

conn.once('open', () => {
    const gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('employees')
})

export const emplTable = mongoose.model('employees', db.emplSchema) 

const app = express()
const port = process.env.PORT || 9000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({extended: true}))
app.use(cors())

app.get('/', (req, res) => {
  res.send('DB connected <a href="/get">Show data<a>')
})


app.get('/get', async (req, res) => {
   await emplTable.find({}, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
    console.log(req.body)
  });


app.post('/post', async (req, res) => {
  try {
    console.log(req.body)
    const {name, surname, lastname, age, rank} = req.body
    const empl = await emplTable({name, surname, lastname, age, rank})
    await empl.save().then(() => console.log('data uploaded'))

    res.status(201).json({message: 'Данные отправлены'})
  }
  catch (e) {
    res.status(500).json({message: 'Ошибка! Данные не отправлены'})
  }
})




// app.post('/upload', upload.single('file'), (req, res) => {
//     res.status(201).send(req.file)
// })

// app.post('/post', upload.single('file'), function(req, res) {
//     console.log(req.file);
//    res.send("file saved on server");
//    });

// app.get('/download', (req, res) => {
//     gfs.files.findOne({filename: req.query.name}, (err, file) => {
//         if (err) {
//             res.status(500).send(err)
//         }
//         else {
//             if (!file || file.length===0) {
//                 res.status(404).json({err: 'file not found'})
//             }
//             else {
//                 const readstream = gfs.createReadStream(file.filename)
//                 readstream.pipe(res)
//             }
//         }
//     })
// })

app.listen(port, () => console.log(`Server started on ${port}`))

// app.use(express.static(path.join(__dirname, '../build')))

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'))
//     res.end()
// })


// const Dmitry = new emplTable (sampleData)
// Dmitry.save().then(() => console.log('data uploaded'))