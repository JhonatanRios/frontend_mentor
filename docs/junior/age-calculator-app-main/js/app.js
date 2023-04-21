// Obtener elementos del DOM
const form = document.getElementById('date');
const { day: dayInput, month: monthInput, year: yearInput } = form.elements;
const yearResult = document.getElementById('yearResult');
const monthResult = document.getElementById('monthResult');
const dayResult = document.getElementById('dayResult');
const btnSubmit = document.getElementById('submit');

const fechaActual = new Date();
const anioActual = fechaActual.getFullYear();
const mesActual = fechaActual.getMonth() + 1;
const diaActual = fechaActual.getDate();

const diasPorMes = Object.freeze([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);

// Función para calcular la edad a partir de una fecha de nacimiento
function calcularEdad(dia, mes, anio) {
  // Verificar si el año es bisiesto
  const diasPorFebrero = (anio % 4 === 0 && (anio % 100 !== 0 || anio % 400 === 0)) ? 29 : 28;
  const diasPorMesActual = [...diasPorMes.slice(0, mesActual - 1), diasPorFebrero, ...diasPorMes.slice(mesActual)];

  let edadAnios = anioActual - anio;
  let edadMeses = mesActual - mes;
  let edadDias = diaActual - dia;

  if (edadDias < 0) {
    edadDias += diasPorMesActual[mesActual - 2];
    edadMeses--;
  }
  if (edadMeses < 0) {
    edadMeses += 12;
    edadAnios--;
  }

  return { anios: edadAnios, meses: edadMeses, dias: edadDias };
}

// Función para validar los campos vacios
function validarCamposVacios(dia, mes, anio) {
  const campos = [
    { campo: dayInput, mensaje: 'Por favor ingrese el día' },
    { campo: monthInput, mensaje: 'Por favor ingrese el mes' },
    { campo: yearInput, mensaje: 'Por favor ingrese el año' }
  ];

  let hayErrores = false;

  campos.forEach(({ campo, mensaje }) => {
    if (!campo.value) {
      campo.insertAdjacentHTML('afterend', `<p class="errMsg">${mensaje}</p>`);
      campo.classList.add('errInput');
      campo.previousElementSibling.classList.add('errLabel');
      hayErrores = true;
    }
  });

  return !hayErrores;
}

// Función para validar los campos de fecha
function validarFecha(dia, mes, anio) {
  let esFechaValida = true;

  // Validar día
  if (dia < 1 || dia > diasPorMes[mes - 1]) {
    dayInput.insertAdjacentHTML('afterend', '<p class="errMsg">Ingrese un día valido</p>');
    dayInput.classList.add('errInput');
    dayInput.previousElementSibling.classList.add('errLabel');
    esFechaValida = false;
  }

  // Validar mes
  if (mes < 1 || mes > diasPorMes.length) {
    monthInput.insertAdjacentHTML('afterend', '<p class="errMsg">Ingrese un mes valido</p>');
    monthInput.classList.add('errInput');
    monthInput.previousElementSibling.classList.add('errLabel');
    esFechaValida = false;
  }

  // Validar año
  if (anio < 1900 || anio > anioActual) {
    yearInput.insertAdjacentHTML('afterend', '<p class="errMsg">Ingrese un año valido</p>');
    yearInput.classList.add('errInput');
    yearInput.previousElementSibling.classList.add('errLabel');
    esFechaValida = false;
  }

  return esFechaValida;
}

function procesarBtn(event) {
  event.preventDefault();
  
  // Obtener valores de los campos de entrada de fecha
  const [day, month, year] = [dayInput.value, monthInput.value, yearInput.value].map(Number);
  
  // Verificar si ya hay mensajes de error en la página
  const errores = document.querySelectorAll('.errMsg');
  
  if (errores.length > 0) {
    errores.forEach(error => error.remove());
    const errorInputs = document.querySelectorAll('.errInput');
    errorInputs.forEach(input => input.classList.remove('errInput'));
    const errorLabels = document.querySelectorAll('.errLabel');
    errorLabels.forEach(label => label.classList.remove('errLabel'));
  }
  
  // Verificar si los campos están vacíos
  if (!validarCamposVacios(day, month, year)) {
    return;
  }
  
  // Verificar si los campos son válidos
  if (!validarFecha(day, month, year)) {
    return;
  }
  
  // Calcular edad
  const edad = calcularEdad(day, month, year);
  
  // Actualizar valores en la página
  if (yearResult) {
    yearResult.textContent = `${edad.anios}`;
  }
  if (monthResult) {
    monthResult.textContent = `${edad.meses}`;
  }
  if (dayResult) {
    dayResult.textContent = `${edad.dias}`;
  }
}

// Agregar evento click al botón "submit"
btnSubmit.addEventListener('click', procesarBtn);