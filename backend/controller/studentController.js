const Student = require('../modals/StudentSchema.js');
const asyncHandler = require('express-async-handler');
// const nodemailer = require('nodemailer');



const addStudent = asyncHandler(async (req, res) => {
    const { name,
        studentId,
        isAssigned,
        mentorId,
        email} = req.body;

    // create admin
    const student = await Student.create({
        name,
        studentId,
        isAssigned,
        mentorId,
        email
    })

    if (student) {
        res.status(201).send("create successfully");
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
})

// let transporter=nodemailer.createTransport()({
//     service:"gmail",
//     auth:{
//         user:process.env.AUTH_EMAIL,
//         pass:process.env.AUTH_PASS
//     }
// })

const getStudents = async (req, res) => {
    try {
        const students = await Student.find({});
        res.status(200).json(students);
    } catch (error) {
        console.log(`error:${error.message}`);
    }
};

const upStudents = asyncHandler(async (req, res) => {    
    
    // Extract the update fields from the request body
 console.log(req);
    const updateFields = {};
    if (req.body.isAssigned) updateFields.isAssigned = req.body.isAssigned;
    if (req.body.OOPS) updateFields.OOPS = req.body.OOPS;
    if (req.body.C) updateFields.C = req.body.C;
    if (req.body.Java) updateFields.Java = req.body.Java;
    if (req.body.Python) updateFields.Python = req.body.Python;
    if (req.body.NALR) updateFields.NALR = req.body.NALR;
    if(req.body.total) updateFields.total = req.body.total;
    if(req.body.mentorId) updateFields.mentorId = req.body.mentorId;

    
    
    
    // Perform the update    
    const updatedProject = await Student.updateOne(
        { studentId: req.params.id },
        { $set: updateFields }
    );
    
    // Check if the update was successful
    if (updatedProject.modifiedCount === 0) {
        res.status(400);
        throw new Error('Failed to update the student');
    }
    
    res.status(200).json({ message: 'Project updated successfully', data: updatedProject });
    
})


const notAssignStudent = asyncHandler(async (req, res) => {    
    
    // Extract the update fields from the request body
    const resetFields = {};
    if (!req.body.isAssigned) resetFields.isAssigned = req.body.isAssigned;
    if (!req.body.OOPS) resetFields.OOPS = req.body.OOPS;
    if (!req.body.C) resetFields.C = req.body.C;
    if (!req.body.Java) resetFields.Java = req.body.Java;
    if (!req.body.Python) resetFields.Python = req.body.Python;
    if (!req.body.NALR) resetFields.NALR = req.body.NALR;
    if(!req.body.total) resetFields.total = req.body.total;
    if(req.body.mentorId) resetFields.mentorId = req.body.mentorId;    
    
    // Perform the update    
    const updatedProject = await Student.updateOne(
        { studentId: req.params.id },
        { $set: resetFields }
    );
    
    // Check if the update was successful
    if (updatedProject.modifiedCount === 0) {
        res.status(400);
        throw new Error('Failed to update the student');
    }
    
    res.status(200).json({ message: 'Project updated successfully', data: updatedProject });
    
})



module.exports = {
    addStudent,
    getStudents,
    upStudents,
    notAssignStudent
} 