const Student = require("../models/student");

const createStudent = async(req, res, next) => {
    try {
        const student = new Student({
          name: req.body.name,
          age: req.body.age,
          gender: req.body.gender,
          email: req.body.email,
          phone: req.body.phone,
        });
        
         const result = await student.save()
            console.log(result);
            res.status(201).json({
              message: "Created Student successfully",
              result: result,
            });
      
      } catch (err) {
          console.log(err);
          res.status(500).json({
          error: message.err,
          });
        }
};

const getAllStudent = async(req, res, next) => {
    try {
        const docs = await Student.find()
          .select("name age gender email phone")
        //   .exec();
    
        // const response = {
        //   count: docs.length,
        //   students: docs.map((doc) => ({
        //     name: doc.name,
        //     age: doc.age,
        //     gender: doc.gender,
        //     email: doc.email,
        //     phone: doc.phone,
        //   })),
        // };
    
        res.status(200).json({
          count:docs.length,
          students: docs,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
      }
};

const getStudentById = async(req, res, next) => {
    try {
        const id = req.params.id;
        const doc = await Student.findById(id)
          .select("name age gender email phone")
          .exec()
      
            console.log("From database", doc);
            if (doc) {
              res.status(200).json({
                student: doc,
              });
      
            } else {
              res.status(404).json({ message: "Student not found" });
            }
            
          } catch(err)  {
            console.log(err);
            res.status(500).json({ error: message.err});
          };
};

const updateStudentById = async(req, res, next) => {
    try {
        const id = req.params.id;
        const result = await Student.findOneAndUpdate({ _id: id },{ $set: {
          name: req.body.name,
          age: req.body.age,
          gender: req.body.gender,
          email: req.body.email,
          phone: req.body.phone,
        }},{new: true}
        )
          .exec()
            console.log(result);
            res.status(200).json({
              message: "Student Updated",
              students: result,
            });
        }
          catch(err) {
            console.log(err);
            res.status(500).json({
              error: message.err,
            });
          };
          
};

const deleteStudentById = async(req, res, next) => {
    try{
        const id = req.params.id;
        const result = await Student.deleteOne({ _id: id })
          .exec()
            console.log(result);
            res.status(200).json({
              message: "Student deleted",
            });
        }
          catch(err) {
            console.log(err);
            res.status(500).json({
              error: message.err,
            });
          };
};

module.exports ={
    createStudent,
    getAllStudent,
    getStudentById,
    updateStudentById,
    deleteStudentById,
};