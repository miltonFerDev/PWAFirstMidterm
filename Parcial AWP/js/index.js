const apiURL = new URL("https://651a08a2340309952f0cd5c0.mockapi.io/api/v1/reel");
apiURL.searchParams.append('sortBy', 'date');
apiURL.searchParams.append('order', 'desc');
const arrayReels = [];


const reelContainer = document.getElementById("reel__container");

function displayReels() {
  arrayReels.forEach((reel) => {
    const reelElement = document.createElement("div");
    reelElement.classList.add("reel__card");
    const nameElement = document.createElement("h2");
    nameElement.classList.add("card__title");
    const imageElement = document.createElement("img");
    const dateTimeElement = document.createElement("p");
    dateTimeElement.classList.add("card__datetime");

    nameElement.textContent = reel.name;
    imageElement.src = reel.image;
    dateTimeElement.textContent = reel.date;
    const date = new Date(reel.date * 1000);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    dateTimeElement.textContent = date.toLocaleDateString("es-ES", options);

    reelElement.appendChild(nameElement);
    reelElement.appendChild(imageElement);
    reelElement.appendChild(dateTimeElement);

    reelContainer.appendChild(reelElement);
  });
}

function getReels() {
  fetch(apiURL)
    .then((response) => {
      if (response.ok) {        
        return response.json();
      }
    })
    .then((reel) => {
      arrayReels.push(...reel);
      displayReels();
    }) //SPREAD OPERATOR
    .catch((error) => console.error("Se ha producido un error:", error));
}

window.addEventListener("DOMContentLoaded", getReels);
