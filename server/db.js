import mongoose from 'mongoose';



export default {
  emplSchema: mongoose.Schema({
    name: String,
    surname: String,
    lastname: String,
    age: Number,
    rank: String,
  }), 
  // actions: {
  //   findAll: (req, res, Tutorial) => {
  //     Tutorial.find({})
  //       .then(data => {
  //         res.send(data);
  //       })
  //       .catch(err => {
  //         res.status(500).send({
  //           message:
  //             err.message || "Some error occurred while retrieving tutorials."
  //         })
  //       })
  //   }
  // },
  
}
