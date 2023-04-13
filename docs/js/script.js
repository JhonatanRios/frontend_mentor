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
  labelAll.textContent = 'All';
  radioGroup.appendChild(inputAll);
  radioGroup.appendChild(labelAll);
  attributeValues.forEach((value) => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = attributeName;
    input.value = value;
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
  Crear tarjetas debido al JSON
*/
async function createCards() {
  jsonData = await readJson('js/proyects.json');
  
  for (const item of jsonData) {
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
    console.log(level.textContent);

    const builtWith = document.createElement('p');
    builtWith.textContent = `${item.built.join(', ')}`;

    card.appendChild(img);
    info.appendChild(title);
    info.appendChild(builtWith);
    info.appendChild(level);
    card.appendChild(info);
    cards.appendChild(card);
  }
}




initFliterProyects();
createCards();