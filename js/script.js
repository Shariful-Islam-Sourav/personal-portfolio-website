document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#contactForm");
  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const messageInput = document.querySelector("#message");

  form.addEventListener("submit", function (event) {
    let isValid = true;
    let errors = [];

    // Validate Name
    if (nameInput.value.trim() === "") {
      isValid = false;
      errors.push("Name is required.");
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === "") {
      isValid = false;
      errors.push("Email is required.");
    } else if (!emailPattern.test(emailInput.value.trim())) {
      isValid = false;
      errors.push("Please enter a valid email address.");
    }

    // Validate Message
    if (messageInput.value.trim() === "") {
      isValid = false;
      errors.push("Message is required.");
    }

    // If not valid, prevent form submission and show errors
    if (!isValid) {
      event.preventDefault();
      alert(errors.join("\n")); // Show errors in a window alert
    } else {
      const confirmation = confirm("Are you sure you want to submit the form?");
      if (!confirmation) {
        event.preventDefault(); // Prevent submission if the user cancels
      }
    }
  });
});

// Contact form draft save
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  // Restore draft
  const draft = JSON.parse(localStorage.getItem("contactFormDraft") || "{}");
  if (draft.name) nameInput.value = draft.name;
  if (draft.email) emailInput.value = draft.email;
  if (draft.message) messageInput.value = draft.message;

  // Save draft on input
  [nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener("input", () => {
      localStorage.setItem(
        "contactFormDraft",
        JSON.stringify({
          name: nameInput.value,
          email: emailInput.value,
          message: messageInput.value,
        })
      );
    });
  });

  // Clear draft on submit
  form.addEventListener("submit", function () {
    localStorage.removeItem("contactFormDraft");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.getElementById("backToTop");

  // Show or hide the button based on scroll position
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  });

  // Scroll to the top when the button is clicked
  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });
});

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function updateGreetingAndTime() {
  const greetingText = document.getElementById("greeting-text");
  const greetingTime = document.getElementById("greeting-time");
  if (greetingText && greetingTime) {
    greetingText.textContent = getGreeting() + " 👋";
    const now = new Date();
    greetingTime.textContent = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateGreetingAndTime();
  setInterval(updateGreetingAndTime, 1000);
});

// Light mode toggle 
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("darkModeToggle");
  const icon = toggle ? toggle.querySelector("i") : null;

  // Apply saved mode on load
  const savedMode = localStorage.getItem("theme");
  if (savedMode === "light") {
    document.body.classList.add("light-mode");
    if (icon) {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      document.body.classList.toggle("light-mode");
      const isLight = document.body.classList.contains("light-mode");
      localStorage.setItem("theme", isLight ? "light" : "dark");
      // Change icon
      if (icon) {
        if (isLight) {
          icon.classList.remove("fa-sun");
          icon.classList.add("fa-moon");
        } else {
          icon.classList.remove("fa-moon");
          icon.classList.add("fa-sun");
        }
      }
    });
  }
});

// Animate elements on scroll
document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });
});
