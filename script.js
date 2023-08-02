const addBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const resetBtn = document.getElementById("reset-btn");
const recordContainer = document.querySelector(".record-container");

const name = document.getElementById("name");
const email = document.getElementById("email");
const number = document.getElementById("contact-num");
const city = document.getElementById("city");
const address = document.getElementById("address");

let ContactArray = [];
let id = 0;

function Contact(id, name, email, number, city, address) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.number = number;
  this.city = city;
  this.address = address;
}

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("contacts") == null) {
    ContactArray = [];
  } else {
    ContactArray = JSON.parse(localStorage.getItem("contacts"));
    lastID(ContactArray);
  }
  displayRecord();
});

function displayRecord() {
  ContactArray.forEach(function (singleContact) {
    addToList(singleContact);
  });
}

function lastID(ContactArray) {
  if (ContactArray.length > 0) {
    id = ContactArray[ContactArray.length - 1].id;
  } else {
    id = 0;
  }
}

addBtn.addEventListener('click', function(){
  if(checkInputFields([name, email, number, city, address])){
      setMessage("success", "Registro existoso!");
      id++;
      const contact = new Contact(id, name.value, email.value, number.value, city.value, address.value);
      ContactArray.push(contact);
      // Storing contact record in local storage
      localStorage.setItem('contacts', JSON.stringify(ContactArray));
      clearInputFields();
      addToList(contact);
    printContacts();
  } else {
    setMessage("error", "¡Campos de entrada vacíos o ingreso inválido!");
  }
});

function addToList(item) {
  const newRecordDiv = document.createElement("div");
  newRecordDiv.classList.add("record-item");
  newRecordDiv.innerHTML = `
  <div class="record-el">
      <span id="labelling">Identificación de contacto:</span>
      <span id="contact-id-content">${item.id}</span>
  </div>
  <div class="record-el">
      <span id="labelling">Nombre:</span>
      <span id="contact-id-content">${item.name}</span>
  </div>
  <div class="record-el">
      <span id="labelling">Correo electrónico:</span>
      <span id="contact-id-content">${item.email}</span>
  </div>
  <div class="record-el">
      <span id="labelling">Número telefónico:</span>
      <span id="contact-id-content">${item.number}</span>
  </div>
  <div class="record-el">
      <span id="labelling">Ciudad:</span>
      <span id="contact-id-content">${item.city}</span>
  </div>
  <div class="record-el">
      <span id="labelling">Dirección:</span>
      <span id="contact-id-content">${item.address}</span>
  </div>
  
  <button type="button" id="delete-btn">
      <span>
          <i class="fas fa-trash"></i>
      </span>
      Eliminar
  </button>
`;

  recordContainer.appendChild(newRecordDiv);
}

recordContainer.addEventListener("click", function (event) {
  if (event.target.classLis.contains("edit-btn")) {

      const contactId = event.target.dataset.contactId;
    }
});

recordContainer.addEventListener("click", function (event) {
    if (event.target.id === "delete-btn") {
      let recordItem = event.target.parentElement;
      recordContainer.removeChild(recordItem);
      let tempContactList = ContactArray.filter(function (record) {
        return  (record.id !== parseInt(recordItem.firstElementChild.lastElementChild.textContent));
      });
      ContactArray = tempContactList;
      localStorage.setItem("contacts", JSON.stringify(ContactArray));
    }
  });
  
  // reiniciando todo (la identificación se establecerá en 0)
  resetBtn.addEventListener("click", function () {
    ContactArray = [];
    localStorage.setItem("contacts", JSON.stringify(ContactArray));
    location.reload();
  })
  
//Funcion para actualizar contacto 
updateBtn.addEventListener("click", function () {
  updateContact();
});

//Mostrar estados y alertas

function setMessage(status, message) {
  let messageBox = document.querySelector(".message");
  if (status === "error") {
    messageBox.innerHTML = `${message}`;
    messageBox.classList.add("error");
    removeMessage(status, messageBox);
  }
  if (status === "success") {
    messageBox.innerHTML = `${message}`;
    messageBox.classList.add("success");
    removeMessage(status, messageBox);
  }
}

cancelBtn.addEventListener("click", function () {
  clearInputFields();
});

function clearInputFields() {
  name.value = "";
  email.value = "";
  number.value = "";
  city.value = "";
  address.value = "";
}

function removeMessage(status, messageBox) {
  setTimeout(function () {
    messageBox.classList.remove(`${status}`);
  }, 2000);
}

function checkInputFields(inputArr) {
  for (let i = 0; i < inputArr.length; i++) {
    if (inputArr[i].value === "") {
      return false;
    }
  }
  if(!phoneNumCheck(inputArr[2].value)){
    return false;
  }
  return true;
}

function phoneNumCheck(inputtxt) {
  let phoneNo = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (inputtxt.match(phoneNo)) {
    return true;
  } else {
    return false;
  }
}

function printContacts() {
  console.log("Lista de contactos:");
  ContactArray.forEach(function (contact) {
    console.log("%cID: %s", "font-weight: bold;", contact.id);
    console.log("%cNombre: %s", "font-weight: bold;", contact.name);
    console.log("%cCorreo electrónico: %s", "font-weight: bold;", contact.email);
    console.log("%cNúmero telefónico: %s", "font-weight: bold;", contact.number);
    console.log("%cCiudad: %s", "font-weight: bold;", contact.city);
    console.log("%cDirección: %s", "font-weight: bold;", contact.address);
    console.log("------------------");
  });
}

addBtn.addEventListener("click", function () {
  if (checkInputFields([name, email, number, city, address])) {
    setMessage("success", "Registro agregado exitosamente!");
    id++;
    const contact = new Contact(id, name.value, email.value, number.value, city.value, address.value);
    ContactArray.push(contact);
    localStorage.setItem("contacts", JSON.stringify(ContactArray));
    clearInputFields();
    addToList(contact);
    printContacts();
  } else {
    setMessage("error", "¡Campos de entrada vacíos o ingreso inválido!");
  }
});
