const express = require('express');
const router = express.Router();
const { getAllStudents, createStudent } = require('../controllers/studentController.js');
const authMiddlewareAdmin = require('../middleware/authMiddlewareAdmin.js'); 
const authMiddlewareStudent = require('../middleware/authMiddlewareStudent.js'); 
const authMiddlewarePollster = require('../middleware/authMiddlewarePollster.js'); 
const { createSurvey } = require('../controllers/surveyController.js');
const { getAllSurveys } = require('../controllers/surveyController.js');
const { createPollster, getPollsterById } = require('../controllers/pollsterControler.js');


router.post('/login/admin', authMiddlewareAdmin);
router.post('/login/student', authMiddlewareStudent);
router.post('/login/pollster', authMiddlewarePollster);

router.post('/login/student', createStudent);
router.post('/login/pollster', createPollster);


router.delete ('/admin:id',getAllStudents);
router,get('/admin:id',getAllStudents);

router.post('/encuestador',createSurvey, getAllSurveys);
router.post('/encuestas', createSurvey); 
router.post('/estadisticas', getAllStudents);

router.get('/students', getAllStudents);
router.post('/estudiante/encuestas:{encuestaId}', getPollsterById);


module.exports = router;