const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
//const path = require('path');


const Student = require("../models/student");
const { createStudent, getAllStudent, getStudentById, updateStudentById, deleteStudentById } = require("../controllers/students");


router.get('/students', getAllStudent);

router.post('/students', createStudent);

router.get('/students/:id',getStudentById);

router.patch('/students/:id', updateStudentById);

router.delete('/students/:id', deleteStudentById);
  
module.exports = router;