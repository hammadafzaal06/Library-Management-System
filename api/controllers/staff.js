const Staff = require("../models/staff");

const createStaff = async(req, res , next) => {
    try {
        const staff = new Staff({
          name: req.body.name,
          age: req.body.age,
          adress: req.body.adress,
          phone: req.body.phone,
        });
        const result = await staff.save();
        console.log(result);
        res.status(201).json({
          message: "Created Staff successfully",
          result: result,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          error: message.err,
        });
      }
};

const getAllStaff = async(req, res, next) => {
    try {
        const docs = await Staff.find().select("name age adress phone");
        // .exec()
    
        //   const response = {
        //   count: docs.length,
        //  staff: docs.map((doc) => ({
        //         name: doc.name,
        //         age: doc.age,
        //         adress: doc.adress,
        //         phone: doc.phone
    
        //    })),
        //  };
        //   if (docs.length >= 0) {
        res.status(200).json({
          count: docs.length,
          staff: docs,
        });
        //  } else {
        //  res.status(404).json({
        //      message: "No entries found",
        //    });
        //  }
      } catch (err) {
        console.log(err);
        res.status(500).json({
          error: message.err,
        });
      }
};

const getStaffById = async(req, res, next) => {
    try {
        const id = req.params.id;
        const doc = await Staff.findById(id).select("name age adress phone").exec();
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
            staff: doc,
          });
        } else {
          res.status(404).json({ message: "Staff member not found" });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: message.err });
      }
};

const updateStaffById = async(req, res, next) => {
    try {
        const id = req.params.id;
        const result = await Staff.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              name: req.body.name,
              age: req.body.age,
              adress: req.body.adress,
              phone: req.body.phone,
            },
          },
          {new: true}
        ).exec();
        console.log(result);
        res.status(200).json({
          message: "Staff Updated",
          staff: result,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          error: message.err,
        });
      }
};

const deleteStaffById = async(req, res, next) => {
    try {
        const id = req.params.id;
        const result = await Staff.deleteOne({ _id: id }).exec();
        console.log(result);
        res.status(200).json({
          message: "Staff deleted",
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          error: message.err,
        });
      }
};


module.exports={
    createStaff,
    getAllStaff,
    getStaffById,
    updateStaffById,
    deleteStaffById,
};