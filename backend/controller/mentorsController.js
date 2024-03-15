const Mentor = require('../modals/MentorSchema.js');
const asyncHandler = require('express-async-handler');

const getMentors = async (req, res) => {
    try {
        const mentors = await Mentor.find({});
        res.status(200).json(mentors);
    } catch (error) {
        console.log(`error:${error.message}`);
    }
};

const getMentor = asyncHandler(async(req, res) => {
    const mentor = await Mentor.findOne({ mentorId: req.params.id });
    if(mentor){
        res.status(200).send(mentor);
    }else{
        throw new Error("Please Enter Valid Id");
    }
});



const addMentor = asyncHandler(async (req, res) => {
    const { name, mentorId, counter} = req.body;

    // create admin
    const mentor = await Mentor.create({
        name,
        mentorId,
        counter,
    })

    if (mentor) {
        res.status(201).send("create successfully");
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
})




module.exports = {
    getMentors,
    addMentor,
    getMentor
} 