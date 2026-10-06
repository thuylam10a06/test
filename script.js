const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const status = document.querySelector("#copy-status");

const storedTheme = localStorage.getItem("theme");
if (storedTheme === "dark") root.classList.add("dark");

themeToggle.addEventListener("click", () => {
  root.classList.toggle("dark");
  localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light");
  themeToggle.textContent = root.classList.contains("dark") ? "☾" : "☼";
});

themeToggle.textContent = root.classList.contains("dark") ? "☾" : "☼";

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", (event) => {
  glow.style.left = event.clientX + "px";
  glow.style.top = event.clientY + "px";
});

function copyNote(event) {
  event.preventDefault();
  navigator.clipboard?.writeText("Hello! I found your personal website.");
  status.textContent = "A little hello has been copied.";
  window.setTimeout(() => { status.textContent = ""; }, 2200);
}
