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
      // Optional: Show a confirmation dialog before submission
      const confirmation = confirm("Are you sure you want to submit the form?");
      if (!confirmation) {
        event.preventDefault(); // Prevent submission if the user cancels
      }
    }
  });
});
