class Activity {
    constructor(id, title, description, imgUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl
    }
}

class Repository {
    constructor() {
        this.activities = [];
        this.id = 0;
    }

    createActivity(title, description, imgUrl) {
        this.id++;
        const activity = new Activity(this.id, title, description, imgUrl);
        this.activities.push(activity)
    }

    getAllActivities() {
        return this.activities;
    }

    deleteActivities(id) {
        this.activities = this.activities.filter((activity) => activity.id != id)
    }
}

const repository = new Repository();

function deleteCard(event) {
    repository.deleteActivities(event.target.id);
    convertIntencesToElement();
}

// Función que tomará una instancia de Activity yla convertirá en un elemento HTML. 
// La función deberá:
// 1. Recibir por parámetro un objeto instancia de Activity.
// 2. Extraer sus propiedades en variables usando destructuring.
// 3. Crear los elemtnos HTML que formaran parte de la tarjeta: Título, descripción e Imagen. 
// 4. Asignar los valores a las propiedades correspondientes a cada uno de los elementos. 
// 5 Agregar a los elemtentos las clases correspondientes. 
// 6. Crear un elemento que será la tarjeta, en dónde se incluirán los demás elementos. 
// 7. Appendear o agregarlos como hijos de la tarjeta.  
// 8. 

function objToElement(activity) {
    const {id, title, description, imgUrl} = activity;
    const titleCard = document.createElement('h3');
    const paragraph = document.createElement('p');
    const image = document.createElement('img');
    const card = document.createElement('div');
    const deleteButton = document.createElement('button');

    titleCard.textContent = title;
    paragraph.textContent = description;
    image.src = imgUrl;
    deleteButton.textContent = 'X'; 

    titleCard.classList.add('titleCard');
    paragraph.classList.add('paragraphCard');
    image.classList.add('imageCard');
    deleteButton.classList.add('deleteBoton');
    card.classList.add('divCard');

    deleteButton.id = id;
    deleteButton.addEventListener('click', deleteCard);

    card.appendChild(titleCard);
    card.appendChild(paragraph);
    card.appendChild(image);
    card.appendChild(deleteButton);

    return card;
}

// Implementar una función que se encargará de convertir todas las instancias 
// de Activity en elementos HTML para agregarlos al contenedor correspondiente. 
// La función deberá:
// 1. Seleccionar el contenedor donde queremos agregar actividades. 
// 2. Vaciar el contenido actual del contenedor. Se puede hacer manipulando la 
//     propiedad innerHTML. 
// 3. Obtener el listado completo de actividades mediante el método 
//     correspondiente de una instancia de Repository. 
// 4. Mapear el listado de actividades para convertirlos todos en elementos HTML. para 
//    ello use el método map, aprovechando como callback la función anterior "objToElement". 
//    Guardar el resultado del mapeo en una nueva varaible. 
//5. Appendear todos los elementos HTML del nuevo array dentro del contenedor 
//   seleccionado. Para ello puedes esar el método forEach.  

function convertIntencesToElement() {
    const containerCards = document.getElementById('divContainerCards');
    containerCards.innerHTML = ''

    const activities = repository.getAllActivities();

    console.log(activities);

    const myActivities = activities.map(objToElement);

    myActivities.forEach(activ => containerCards.appendChild(activ))
}

// Implementar la función Handler que se ejecutará al disparar el evento del 
// botón. la misma deberá: 
// 1. Seleccionar los inputs de title, description e imgUrl. 
// 2. Tomar los valores ingresados en los inputs y guardarlos en variables. 
// 3. Validar los valores. De lo contrario deberá cortar el proceso y mostrar un mensaje al usuario
//     de que hay datos incompletos.
// 4. Llamar al método correspondiente de la instancia Repository para crear una nueva actividad. 
// 5. Invocar la función que implementamos en el punto anterior para refrescar el contenedor de actividades. 

function handleSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('form');

    const inputTitle = document.getElementById('title').value;
    const inputImgUrl = document.getElementById('image').value;
    const inputDescription = document.getElementById('description').value;
    
    if(!inputTitle || !inputImgUrl || !inputDescription) {
        return alert('Hay campos incompletos');
    }

    repository.createActivity(inputTitle, inputDescription, inputImgUrl);

    convertIntencesToElement();

    console.log(repository.getAllActivities());  //eliminar

    form.reset();
}

// Seleciona el botón que dispara el evento de agregar actividad y agrega un eventListener. 
// El evento, al dispararse, debe ejecutar la función handleSubmit.
// Extra: implementar la funcionalidad de eliminar tarjetas del contenedor al hacer click sobre
// ellas o sobre algún nuevo botón.  

const botonSubmit = document.getElementById('addButton');

botonSubmit.addEventListener('click', handleSubmit);

