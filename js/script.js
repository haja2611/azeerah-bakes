// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const nav = document.querySelector("nav");

mobileMenuBtn.addEventListener("click", function () {
  nav.classList.toggle("active");
  mobileMenuBtn.innerHTML = nav.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll("nav ul li a").forEach((link) => {
  link.addEventListener("click", function () {
    if (nav.classList.contains("active")) {
      nav.classList.remove("active");
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
});

// Header scroll effect
const header = document.getElementById("header");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Scroll animation for sections
const sections = document.querySelectorAll(".section");

function checkScroll() {
  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
      section.classList.add("show");
    }
  });
}

// Initial check
checkScroll();

// Check on scroll
window.addEventListener("scroll", checkScroll);

// Testimonial slider
// const testimonialSlides =
//   document.querySelectorAll(".testimonial-slide");
// const testimonialDots = document.querySelectorAll(".testimonial-dot");
// let currentSlide = 0;

// function showSlide(index) {
//   testimonialSlides.forEach((slide) =>
//     slide.classList.remove("active")
//   );
//   testimonialDots.forEach((dot) => dot.classList.remove("active"));

//   testimonialSlides[index].classList.add("active");
//   testimonialDots[index].classList.add("active");
//   currentSlide = index;
// }

// testimonialDots.forEach((dot, index) => {
//   dot.addEventListener("click", () => showSlide(index));
// });

// Auto slide change
// setInterval(() => {
//   let nextSlide = (currentSlide + 1) % testimonialSlides.length;
//   showSlide(nextSlide);
// }, 5000);

// Form submission
// const contactForm = document.querySelector(".contact-form form");

// contactForm.addEventListener("submit", function (e) {
//   e.preventDefault();

//   // Here you would typically send the form data to a server
//   // For demonstration, we'll just show an alert
//   alert("Thank you for your message! We will get back to you soon.");
//   this.reset();
// });

// Add to cart functionality
// const addToCartButtons = document.querySelectorAll(".add-to-cart");

// addToCartButtons.forEach((button) => {
//   button.addEventListener("click", function () {
//     const product = this.closest(".product-card");
//     const productName = product.querySelector("h3").textContent;
//     const productPrice = product.querySelector(".price").textContent;

//     // Here you would typically add the product to a shopping cart
//     // For demonstration, we'll just show an alert
//     alert(`Added ${productName} (${productPrice}) to your cart!`);

//     // Animation effect
//     this.innerHTML = '<i class="fas fa-check"></i> Added';
//     setTimeout(() => {
//       this.innerHTML = '<i class="fas fa-shopping-bag"></i> Add to Cart';
//     }, 2000);
//   });
// });

// Pulse animation for special elements
const pulseElements = document.querySelectorAll(".pulse");

pulseElements.forEach((element) => {
  element.style.animationDelay = Math.random() + "s";
});
document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const items = document.getElementById("items").value;
  const date = document.getElementById("date").value;

  // Format the WhatsApp message
  const whatsappMessage =
    `*New Order!*%0A%0A` +
    `*Name:* ${name}%0A` +
    `*Phone:* ${phone}%0A` +
    `*Items:* ${items}%0A` +
    `*Delivery Date:* ${date}`;

  // Open WhatsApp with the message
  window.open(`https://wa.me/918110813081?text=${whatsappMessage}`, "_blank");

  // Optional: Reset the form after submission
  this.reset();
});

//email subscription

document
  .getElementById("subscribeForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("subscriberEmail").value;
    const resultDiv = document.getElementById("subscriptionResult");
    resultDiv.textContent = "Processing...";

    // Replace with your Google Script URL
    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbz9_ozgHYzBce_RhvEnXMTMPefKjljxr86DIe80puzEXfBORM8AA4YEiUDuQtAavDUI/exec";

    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });

      // First check if the response is OK
      //   if (!response.ok) {
      //     throw new Error(`HTTP error! status: ${response.status}`);
      //   }

      // Then try to parse the JSON
      const data = await response.json();

      resultDiv.textContent = data.message;
      resultDiv.style.color = data.success ? "green" : "red";
      if (data.success) document.getElementById("subscribeForm").reset();
    } catch (error) {
      // Special handling for GAS redirects
      if (error.message.includes("Unexpected end of input")) {
        resultDiv.textContent = "Subscription received!";
        resultDiv.style.color = "green";
        document.getElementById("subscribeForm").reset();
      } else {
        resultDiv.textContent = "Failed to submit. Please try again later.";
        resultDiv.style.color = "red";
      }
      console.error("Error:", error);
    }
  });
