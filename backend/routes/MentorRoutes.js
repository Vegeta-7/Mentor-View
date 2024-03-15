const express = require('express');
const router = express.Router();

const {
    getMentors,addMentor,getMentor
} = require('../controller/mentorsController.js');


//routes

router.get('/',getMentors);
router.get('/:id',getMentor);
router.post('/addMentor',addMentor);


module.exports = router;