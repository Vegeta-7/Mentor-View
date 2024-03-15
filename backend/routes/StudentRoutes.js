const express = require('express');
const router = express.Router();

const {
    addStudent,
    getStudents,
    upStudents,
    notAssignStudent,
} = require('../controller/studentController.js');


//routes

router.post('/addStudent',addStudent);
router.get('/getStudents',getStudents);
router.put('/assignData/:id',upStudents);
router.put('/resetData/:id',notAssignStudent);



module.exports = router;