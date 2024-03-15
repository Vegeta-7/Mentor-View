const mongoose = require('mongoose');

const mentorSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    
    mentorId:{
        type:Number,
        required:true,
        unique:true,
    },
    counter:{
        type:Number,
        required: true,
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Mentor', mentorSchema);