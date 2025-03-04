const form = document.querySelector(".feedback-form");
const STORAGE_KEY = "feedback-form-state";

// Об'єкт для збереження даних форми
let formData = {
  email: "",
  message: "",
};

// Завантаження даних із localStorage при відкритті сторінки
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    formData = JSON.parse(savedData) || {};
    form.elements.email.value = formData.email?.trim() || "";
    form.elements.message.value = formData.message?.trim() || "";
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
  }
}

// Відстеження змін у формі (делегування подій)
form.addEventListener("input", (event) => {
  formData[event.target.name] = event.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// Відправлення форми
form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
    return;
  }

  console.log("Submitted Data:", formData);

  // Очищення форми, localStorage та formData
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formData = { email: "", message: "" };
});
