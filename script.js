let slideIndex = 0;

function showSlide() {
  const slider = document.querySelector(".slider");
  const totalSlides = document.querySelectorAll(".slide").length;

  slideIndex = (slideIndex + 1) % totalSlides;

  const offset = -slideIndex * 100;
  slider.style.transform = `translateX(${offset}%)`;
}

// Auto slide every 5 seconds
setInterval(showSlide, 5000);



/*Random  user Generation */
const loadNewStartups = async () => {
  try {
    const response = await fetch("https://randomuser.me/api/?results=8");
    const data = await response.json();
    const users = data.results;
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ''; // Clear existing cards

    users.forEach((user) => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
        <img src="${user.picture.medium}" alt="Profile Picture" />
        <h3>${user.name.first} ${user.name.last}</h3>
        <p>Location: ${user.location.city}, ${user.location.country}</p>
        <button class="expand-btn">Show More</button>
        <div class="extra-info">
          <p>Email: ${user.email}</p>
          <p>Phone: ${user.phone}</p>
        </div>
      `;

      const button = card.querySelector('.expand-btn');
      const extraInfo = card.querySelector('.extra-info');
      extraInfo.style.display = 'none';

      button.addEventListener('click', () => {
        if (extraInfo.style.display === 'none') {
          extraInfo.style.display = 'block';
          button.textContent = 'Hide Info';
        } else {
          extraInfo.style.display = 'none';
          button.textContent = 'Show More';
        }
      });

      cardContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading users:", error);
  }
};

// Load initial users
loadNewStartups();

// Load more users on button click
document.getElementById('load-users').addEventListener('click', loadNewStartups);

// Toggle profile info
const toggleProfileBtn = document.getElementById('toggle-profile');
const profileDetails = document.querySelector('.profile-details');

if (toggleProfileBtn) {
  toggleProfileBtn.addEventListener('click', () => {
    profileDetails.classList.toggle('hidden');
    toggleProfileBtn.textContent = profileDetails.classList.contains('hidden') ? 'View Profile' : 'Hide Profile';
  });
}

