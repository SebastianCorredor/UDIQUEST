const { survey, question, opt_uniq_ques, opt_mult_ques } = require('../models');

async function createSurvey(req, res) {
    try {
        const {
            pollsterId,
            titulo,
            descripcion,
            estado,
            fechacreacion,
            fechaactivacion,
            fechadesactivacion,
            preguntas,
        } = req.body;

        const newSurvey = await survey.create({
            pollsterId,
            titulo,
            descripcion,
            estado,
            fechacreacion,
            fechaactivacion,
            fechadesactivacion,
        });

        const createdQuestions = await Promise.all(
            preguntas.map(async (pregunta) => {
                const { textopregunta, tipo, opciones } = pregunta;

                const newQuestion = await question.create({
                    surveyId: newSurvey.id,
                    textopregunta,
                    tipo,
                });

                await Promise.all(
                    opciones.map(async (opcion) => {
                        const { tipo: tipoOpcion, texto } = opcion;

                        if (tipoOpcion === 'única') {
                            await opt_uniq_ques.create({
                                questionId: newQuestion.id,
                                texto,
                            });
                        } else if (tipoOpcion === 'múltiple') {
                            await opt_mult_ques.create({
                                questionId: newQuestion.id,
                                texto,
                            });
                        }
                    })
                );

                return newQuestion;
            })
        );

        res.status(201).json({
            message: 'Encuesta creada correctamente',
            survey: newSurvey,
            questions: createdQuestions,
        });
    } catch (error) {
        console.error('Error al crear la encuesta:', error);
        res.status(500).json({ message: 'Error al crear la encuesta' });
    }
}
async function getEncuestasByEncuestadorId(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'SecretKey'); 
    const encuestadorId = decoded.encuestadorId; 

    try {
        const encuestas = await Encuesta.findAll({
            where: {
                encuestadorId 
            },
            include: [Encuestador] 
        });

        res.status(200).json({ encuestas });
    } catch (error) {
        console.error('Error al obtener las encuestas:', error);
        res.status(500).json({ message: 'Error al obtener las encuestas' });
    }
}

module.exports = {
    getEncuestasByEncuestadorId,
    createSurvey
};