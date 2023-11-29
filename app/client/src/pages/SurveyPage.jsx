import CreateSurveyForm from '../components/CreateSurveyForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const SurveyPage = () => {
  const handleSurveySubmit = (surveyData) => {
    fetch('http://localhost:3003/encuestador/encuesta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(surveyData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Respuesta del servidor:', data);
      })
      .catch(error => {
        console.error('Error al enviar datos:', error); 
      });
  };

  return (
    
        <div className="card-body">
          <CreateSurveyForm onSubmit={handleSurveySubmit} />
        </div>
      
  );
};

export default SurveyPage;