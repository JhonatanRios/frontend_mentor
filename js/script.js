const filtroLevels = document.getElementById('filtros');
const cards = document.getElementById('cards');
let jsonData = '';

/*
  try: Lee archivo que se le pase por parametro y retorna un objeto
  catch: si no se devuelve la promesa (await) lanza un error
*/
async function readJson(filename) {
  try {
    const response = await fetch(filename);
    jsonData = await response.json();
    //console.log(jsonData);
    return jsonData;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo leer el archivo json.');
  }
}

/*
  Resive por parametro una objeto + un string que setea el nombre del atributo a selecccionar
    - Crea contenedor con id para los estilos
    - Crea input + label para una opcion general
    - Recorre el objeto buscando el atributo ambos entregados por parametro y va generando input + label cada que encuentra 1 diferente
    - Retorna un div+id que contiene los inputs + labels
*/
function createFilters(data, attributeName) {
  const attributeValues = new Set(data.map(item => item[attributeName]));
  const radioGroup = document.createElement('div');
  radioGroup.id = 'items';

  let html = `
    <input type="radio" name="${attributeName}" value="all" checked id="all">
    <label for="all">All</label>
  `;

  attributeValues.forEach(value => {
    html += `
      <input type="radio" name="${attributeName}" id="${value}">
      <label for="${value}">${value}</label>
    `;
  });

  radioGroup.innerHTML = html;
  return radioGroup;
}

/*
  Usa las 2 funciones readJson(), createFilters()
*/
async function initFliterProyects() {
  try {
    jsonData = await readJson('js/proyects.json');
    if (jsonData) {
      filtroLevels.innerHTML = '';
      const radioGroup = createFilters(jsonData, 'level');
      filtroLevels.appendChild(radioGroup);
    } else {
      filtroLevels.textContent = 'No se pudo leer el archivo json.';
    }
  } catch (error) {
    filtroLevels.textContent = error.message;
  }
}

/*
  Decide que trajetas cargar dependiendo que input esta checked
*/
async function filterCards() {
  jsonData = await readJson('js/proyects.json');
  
  // Agregar tarjetas al cargar la página
  for (const item of jsonData) {
    const card = createCards(item);
    cards.appendChild(card);
  }

  // Agregar event listeners a los botones de radio
  const radioButtons = document.querySelectorAll('input[name="level"]');
  radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
      const selectedLevel = radio.id;
      console.log(selectedLevel);
      cards.innerHTML = ''; // clear previous cards
      
      if (selectedLevel === 'all') {
        for (const item of jsonData) {
          const card = createCards(item);
          cards.appendChild(card);
        }
      } else {
        const filteredData = jsonData.filter(item => item.level === selectedLevel);
        for (const item of filteredData) {
          const card = createCards(item);
          cards.appendChild(card);
        }
      }
    });
  });
}

/*
  Crear tarjetas
*/
function createCards(item) {
  const card = document.createElement('a');
  card.classList.add('card');
  card.href = item.url;

  const levelColor = (() => {
    if (item.level === "newbie") return "#6abecd";
    if (item.level === "junior") return "#aad742";
    if (item.level === "intermediate") return "#f1b604";
    if (item.level === "advanced") return "#f48925";
    if (item.level === "guru") return "#ed2c49";
  })();

  const info = `
    <img src="${item.thumbnail}" alt="${item.nomProyecto}">
    <div class="info">
      <h2>${item.nomProyecto}</h2>
      <p>${item.built.join(', ')}</p>
      <p style="color: ${levelColor}">${item.level}</p>
    </div>
  `;

  card.innerHTML = info;
  return card;
}

initFliterProyects();
filterCards();