let clickedDog;

document.addEventListener('DOMContentLoaded', () => {
  loadDogs();

  const form = document.querySelector("#dog-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(clickedDog);
    fetch(`http://localhost:3000/dogs/${clickedDog}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: form.elements[0].value,
        breed: form.elements[1].value,
        sex: form.elements[2].value
      })
    })
    .then(response => response.json())
    .then(dog => console.log(dog));
    location.reload();
  })
})

function loadDogs() {
  fetch("http://localhost:3000/dogs")
  .then(response => response.json())
  .then(dogs => dogs.forEach(dog => renderDog(dog)))
}

function renderDog(dog) {
  const row = document.createElement("tr")
  const dogName = document.createElement("td");
  dogName.textContent = dog.name;
  const dogBreed = document.createElement("td");
  dogBreed.textContent = dog.breed;
  const dogSex = document.createElement("td");
  dogSex.textContent = dog.sex;
  const buttonTd = document.createElement("td");
  const button = document.createElement("button");
  button.textContent = "Edit";
  button.type = "button";
  addEditFunctionality(button, dog);


  buttonTd.append(button);
  row.append(dogName, dogBreed, dogSex, buttonTd);
  document.querySelector("#table-body").append(row);
}

function addEditFunctionality(button, dog) {
  const form = document.querySelector("#dog-form");
  button.addEventListener("click", () => {
    form.elements[0].value = dog.name;
    form.elements[1].value = dog.breed;
    form.elements[2].value = dog.sex;
    clickedDog = dog.id;
  })
}