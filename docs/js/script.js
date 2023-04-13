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
  Resive por parametro una objeto + unstring que seta el nombre del atributo a selecccionar
    - Crea contenedor con id para los estilos
    - Crea input + label para una opcion general
    - Recorre el objeto buscando el atributo ambos entregados por parametro y va generando input + label cada que encuentra 1 diferente
    - Retorna un div+id que contiene los inputs + labels
*/
function createFilters(data, attributeName) {
  const attributeValues = new Set(data.map((item) => item[attributeName]));
  const radioGroup = document.createElement('div');
  radioGroup.id = 'items';
  const labelAll = document.createElement('label');
  const inputAll = document.createElement('input');
  inputAll.type = 'radio';
  inputAll.name = attributeName;
  inputAll.value = 'all';
  inputAll.checked = true;
  inputAll.id = 'all';
  labelAll.htmlFor = 'all';
  labelAll.textContent = 'All';
  radioGroup.appendChild(inputAll);
  radioGroup.appendChild(labelAll);
  attributeValues.forEach((value) => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = attributeName;
    input.id = value;
    label.htmlFor = value;
    label.textContent = value;
    radioGroup.appendChild(input);
    radioGroup.appendChild(label);
  });
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

  const info = document.createElement('div');
  info.classList.add('info');

  const img = document.createElement('img');
  img.src = item.thumbnail;
  img.alt = item.nomProyecto;

  const title = document.createElement('h2');
  title.textContent = item.nomProyecto;

  const level = document.createElement('p');
  level.textContent = item.level;
  if (item.level === "newbie") {
    level.style.color = "#6abecd";
  } else if (item.level === "junior") {
    level.style.color = "#aad742";
  } else if (item.level === "intermediate") {
    level.style.color = "#f1b604";
  } else if (item.level === "advanced") {
    level.style.color = "#f48925";
  } else if (item.level === "guru") {
    level.style.color = "#ed2c49";
  }

  const builtWith = document.createElement('p');
  builtWith.textContent = `${item.built.join(', ')}`;

  card.appendChild(img);
  info.appendChild(title);
  info.appendChild(builtWith);
  info.appendChild(level);
  card.appendChild(info);

  return card;
}







initFliterProyects();
filterCards();