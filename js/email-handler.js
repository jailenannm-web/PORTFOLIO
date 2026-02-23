// Initialize EmailJS
(function () {
  emailjs.init("92y8BwA5JXl9ehFDc"); // 🔑 Replace with your Public Key
})();

// CONTACT FORM
function handleContactSubmit(event) {
  event.preventDefault();

  const templateParams = {
    from_name: document.getElementById("contactName").value,
    from_email: document.getElementById("contactEmail").value,
    phone: document.getElementById("contactPhone").value,
    message: document.getElementById("contactMessage").value,
  };

  emailjs.send(
    "service_iexfwj4",   // 🔑 Replace
    "template_4a2090c",  // 🔑 Replace
    templateParams
  ).then(function (response) {
      document.getElementById("contactResponse").innerHTML =
        "✅ Message sent successfully!";
      document.getElementById("contactForm").reset();
    },
    function (error) {
      document.getElementById("contactResponse").innerHTML =
        "❌ Failed to send message. Try again.";
      console.error(error);
    }
  );
}