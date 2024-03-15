const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    studentId: {
        type: Number,
        required: true,
        unique: true
    },
    isAssigned: {
        type: Boolean,
        default: false
    },
    mentorId: {
        type: Number,
        ref:'Mentor'
    },    
    OOPS: Number,
    C: Number,
    Java: Number,
    Python: Number,
    NALR: Number,    
    total: {
        type:Number,
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);