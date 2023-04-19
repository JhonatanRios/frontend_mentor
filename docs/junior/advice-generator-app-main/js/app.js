const apiAdvice = 'https://api.adviceslip.com/advice';
let lastAdvice;
let adviceId = document.getElementById('adviceId');
let advice = document.getElementById('advice');
let btnAdvice = document.getElementById('submit');

function conectarAPI(urlAPI) {
  // Desactivamos el botón
  btnAdvice.disabled = true;
  
  fetch(urlAPI)
  .then(res => res.json())
  .then(data => {
    if (lastAdvice != data.slip.advice) {
      conectarInfo(data.slip);
      lastAdvice = data.slip.advice;
    } else {
      //console.log('Este consejo ya se mostró antes');
      conectarAPI(urlAPI);
    }
    // Reactivamos el botón
    btnAdvice.disabled = false;
  })
  .catch(err => {
    // Aquí puedes manejar el error
    console.error(err);
    
    // Reactivamos el botón en caso de error
    btnAdvice.disabled = false;
  });
}

function conectarInfo(data) {
  adviceId.innerHTML = `ADVICE #${data.id}`;
  advice.innerHTML = data.advice;
}

conectarAPI(apiAdvice);

btnAdvice.addEventListener('click', () => conectarAPI(apiAdvice));