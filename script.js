
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const searchForm = document.getElementById("searchForm");
const searchResult = document.getElementById("searchResult");
const providerResults = document.getElementById("providerResults");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the menu after selecting a link
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Current year in the footer
document.getElementById("year").textContent =
  new Date().getFullYear();


 // Handle car wash provider search
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = document
    .getElementById("location")
    .value.trim();

  const service = document.getElementById("service").value;

  if (!location || !service) {
    searchResult.textContent =
      "Please enter your area and select a service.";
    providerResults.innerHTML = "";
    return;
  }

  const matchingProviders = providers.filter((provider) => {
    const locationMatches =
      provider.area.toLowerCase() === location.toLowerCase();

    const serviceMatches = provider.service === service;

    return locationMatches && serviceMatches && provider.available;
  });

  if (matchingProviders.length === 0) {
    searchResult.textContent =
      `No demo providers found for ${service} in ${location}. Try Umerkot or Karachi.`;

    providerResults.innerHTML = "";
    return;
  }

  searchResult.textContent =
    `Found ${matchingProviders.length} provider(s) for ${service} in ${location}.`;

  providerResults.innerHTML = matchingProviders
    .map((provider) => `
      <article class="provider-card">
        <div class="provider-icon">${provider.icon}</div>
        <h3>${provider.name}</h3>
        <p>📍 ${provider.area}</p>
        <p>🚿 ${provider.service}</p>
        <p>⭐ ${provider.rating} rating</p>
        <p class="provider-price">PKR ${provider.price.toLocaleString()}</p>
<span class="availability">Available in demo</span>

<button
    type="button"
    class="book-now-btn"
    data-provider-id="${provider.id}">
    Book Now
</button>
 </article>
    `)
    .join("");
});

const chooseButtons = document.querySelectorAll(".choose-service");

chooseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedService = button.dataset.service;
    const serviceSelect = document.getElementById("service");

    serviceSelect.value = selectedService;

    document.getElementById("booking").scrollIntoView({
      behavior: "smooth"
    });

    document.getElementById("location").focus();
  });
});

const providers = [
  {
    id: 1,
    name: "Green Shine Car Wash",
    area: "Umerkot",
    service: "Basic Wash",
    price: 500,
    rating: 4.5,
    icon: "🚗",
    available: true
  },
  {
    id: 2,
    name: "Premium Auto Care",
    area: "Umerkot",
    service: "Premium Wash",
    price: 1000,
    rating: 4.8,
    icon: "✨",
    available: true
  },
  {
    id: 3,
    name: "EcoClean Wash",
    area: "Umerkot",
    service: "Eco Wash",
    price: 800,
    rating: 4.6,
    icon: "🌿",
    available: true
  },
  {
    id: 4,
    name: "City Shine Auto Wash",
    area: "Karachi",
    service: "Basic Wash",
    price: 600,
    rating: 4.3,
    icon: "🚘",
    available: true
  },
  {
    id: 5,
    name: "Royal Premium Detailing",
    area: "Karachi",
    service: "Premium Wash",
    price: 1500,
    rating: 4.9,
    icon: "⭐",
    available: true
  },
  {
    id: 6,
    name: "Nature Auto Spa",
    area: "Karachi",
    service: "Eco Wash",
    price: 900,
    rating: 4.7,
    icon: "🌱",
    available: true
  }
];


// CleanRide booking form functionality

const bookingModal = document.getElementById("bookingModal");
const bookingForm = document.getElementById("bookingForm");
const providerNameInput = document.getElementById("providerName");
const bookingServiceInput = document.getElementById("bookingService");
const bookingDateInput = document.getElementById("bookingDate");
const bookingMessage = document.getElementById("bookingMessage");
const closeBookingButton = document.getElementById("closeBooking");

// Prevent users from selecting a past date.
const today = new Date();
const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
].join("-");

bookingDateInput.min = localToday;

// Open booking form for the selected provider.
providerResults.addEventListener("click", (event) => {
    const button = event.target.closest(".book-now-btn");

    if (!button) return;

    const providerId = Number(button.dataset.providerId);

    const provider = providers.find(
        (item) => item.id === providerId
    );

    if (!provider) return;

    providerNameInput.value = provider.name;
    bookingServiceInput.value = provider.service;

    const priceInput = document.getElementById("bookingPrice");

    if (priceInput) {
        priceInput.value =
            `PKR ${provider.price.toLocaleString()}`;
    }

    bookingMessage.textContent = "";
    bookingModal.hidden = false;
    document.body.style.overflow = "hidden";

    document.getElementById("customerName").focus();
});
// Close the booking popup.
function closeBookingModal() {
    bookingModal.hidden = true;
    document.body.style.overflow = "";
}

closeBookingButton.addEventListener("click", closeBookingModal);

// Close when the user clicks the dark background.
bookingModal.addEventListener("click", function (event) {
    if (event.target === bookingModal) {
        closeBookingModal();
    }
});

// Close when the Escape key is pressed.
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !bookingModal.hidden) {
        closeBookingModal();
    }
});

// Handle booking form submission.
bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    
const booking = {
    provider: providerNameInput.value,
    service: bookingServiceInput.value,
    price: document.getElementById("bookingPrice").value,
    customer: document.getElementById("customerName").value.trim(),
    phone: document.getElementById("customerPhone").value.trim(),
    date: bookingDateInput.value,
    time: document.getElementById("bookingTime").value,
    address: document.getElementById("bookingAddress").value.trim(),
    status: "Pending",
};

    if (!booking.provider || !booking.service) {
        bookingMessage.textContent =
            "Please select a provider before booking.";
        bookingMessage.style.color = "red";
        return;
    }

    if (booking.date < localToday) {
        bookingMessage.textContent =
            "Please choose today or a future date.";
        bookingMessage.style.color = "red";
        return;
    }

    // Demo only: show the request on screen.
    // No booking is sent to a server yet.
   const priceInput = document.getElementById("bookingPrice");

bookingMessage.style.color = "#16845b";
bookingMessage.textContent =
    `Your demo booking request was prepared successfully! ` +
    `Provider: ${booking.provider}. ` +
    `Service: ${booking.service}. ` +
    `Price: ${priceInput.value}. ` +
    `Date: ${booking.date}. Time: ${booking.time}. ` +
    `No real booking has been made.`;
    let savedBookings = JSON.parse(localStorage.getItem("cleanRideBookings")) || [];

savedBookings.push(booking);

localStorage.setItem("cleanRideBookings", JSON.stringify(savedBookings));

// Validate Pakistani mobile phone number.
const phonePattern = /^(03\d{9}|\+923\d{9})$/;
const cleanPhone = booking.phone.replace(/[\s-]/g, "");

if (!phonePattern.test(cleanPhone)) {
    alert("Please enter a valid Pakistani mobile number, e.g. 03001234567.");
    return;
}
// Validate that the booking date is not in the past.
const selectedDate = new Date(booking.date + "T00:00:00");
const today = new Date();
today.setHours(0, 0, 0, 0);

if (Number.isNaN(selectedDate.getTime()) || selectedDate < today) {
    alert("Please select today or a future date for your booking.");
    return;
}
console.log("CleanRide booking saved:", booking);

// Close the popup after successful booking.
closeBookingModal();
const successBox = document.getElementById("bookingSuccess");
const successMessage = document.getElementById("bookingSuccessMessage");

successMessage.textContent =
    `Your booking with ${booking.provider} for ${booking.service} has been submitted successfully. Total price: PKR ${booking.price}. Date: ${booking.date}, Time: ${booking.time}. This is a demo booking.`;

successBox.style.display = "block";

successBox.scrollIntoView({
    behavior: "smooth",
    block: "center"
});
});


// Delete a booking
function deleteBooking(index) {
    let bookings = JSON.parse(
        localStorage.getItem("cleanRideBookings")
    ) || [];

    bookings.splice(index, 1);

    localStorage.setItem(
        "cleanRideBookings",
        JSON.stringify(bookings)
    );

    displayMyBookings();
}


// Display saved bookings
function displayMyBookings() {
    const bookingsList = document.getElementById("myBookingsList");

    const bookings = JSON.parse(
        localStorage.getItem("cleanRideBookings")
    ) || [];

    if (bookings.length === 0) {
        bookingsList.innerHTML = "<p>No bookings found yet.</p>";
        return;
    }

    bookingsList.innerHTML = bookings.map((booking, index) => `
        <div class="booking-card">

            <h3>Booking #${index + 1}</h3>

            <span class="booking-status">
                ${booking.status || "Pending"}
            </span>

            <p><strong>Provider:</strong> ${booking.provider}</p>

            <p><strong>Service:</strong> ${booking.service}</p>

            <p><strong>Customer:</strong> ${booking.customer}</p>

            <p><strong>Phone:</strong> ${booking.phone}</p>

            <p><strong>Date:</strong> ${booking.date}</p>

            <p><strong>Time:</strong> ${booking.time}</p>

            <p><strong>Price:</strong> PKR ${booking.price || 500}</p>

            <button onclick="deleteBooking(${index})" class="delete-booking-btn">
                Delete Booking
            </button>

        </div>
    `).join("");
}


// Load bookings when the page opens
displayMyBookings();
