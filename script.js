const cardContainer = document.getElementById("card-container");
const loadUsersBtn = document.getElementById("load-users");

// Limit the number of cards to 6
const MAX_CARDS = 6;

loadUsersBtn.addEventListener("click", () => {
  fetch("https://randomuser.me/api/?results=6")
    .then((res) => res.json())
    .then((data) => {
      cardContainer.innerHTML = ""; // Clear previous cards
      data.results.forEach((user) => {
        const card = createUserCard(user);
        cardContainer.appendChild(card);
      });
    });
});

function createUserCard(user) {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${user.picture.large}" alt="${user.name.first}">
    <h3>${user.name.first} ${user.name.last} ${getFlagEmoji(user.nat)}</h3>
    <div class="card-details hidden">
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
      <p><strong>Location:</strong> ${user.location.city}, ${user.location.country}</p>
    </div>
    <button class="card-toggle">Visa mer</button>
  `;

  const button = card.querySelector(".card-toggle");
  const details = card.querySelector(".card-details");

  button.addEventListener("click", () => {
    const isVisible = details.classList.toggle("visible");
    details.classList.toggle("hidden", !isVisible);
    button.textContent = isVisible ? "Dölj info" : "Visa mer";
  });

  return card;
}

function getFlagEmoji(countryCode) {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt())
    );
}


  document.getElementById("toggle-profile").addEventListener("click", function () {
    const profileDetails = document.querySelector(".profile-details");
    profileDetails.classList.toggle("visible");
    profileDetails.classList.toggle("hidden");
    
    // Optionally change button text
    if (profileDetails.classList.contains("visible")) {
      this.textContent = "Hide Profile";
    } else {
      this.textContent = "View Profile";
    }
  });


