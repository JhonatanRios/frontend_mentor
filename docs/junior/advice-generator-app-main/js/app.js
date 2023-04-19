const apiAdvice = 'https://api.adviceslip.com/advice';
const adviceId = document.getElementById('adviceId');
const advice = document.getElementById('advice');
const btnAdvice = document.getElementById('submit')

function conectarAPI(urlAPI) {
  fetch(urlAPI)
  .then(response => response.json())
  .then(data => {
    // Aquí puedes trabajar con los datos recibidos
    conectarInfo(data.slip);
  })
  .catch(error => {
    // Aquí puedes manejar el error
    console.error(error);
  });
}

function conectarInfo(data) {
  adviceId.innerHTML = `ADVICE #${data.id}`;
  advice.innerHTML = data.advice;
}

conectarAPI(apiAdvice);

btnAdvice.addEventListener('click', () => {
  conectarAPI(apiAdvice);
});