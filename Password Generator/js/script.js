// Getting Required Elements
const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const passwordInput = document.querySelector(".input-box input");
const generateButton = document.querySelector(".generate-button");
const passwordIndicator = document.querySelector(".pass-indicator");
const copyIcon = document.querySelector(".input-box span");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$%&|[](){}:;.,*+-#@<>~"
};

// Generating Password
const generatePassword = () => {
  let staticPassword = "";
  let randomPassword = "";
  let excludeDuplicate = false;
  let passLength = lengthSlider.value;

  options.forEach(option => {
    if (option.checked) {
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        // Adding Key Value Of Character Object To Password Variable
        staticPassword += characters[option.id];
      } else if (option.id === "spaces") {
        staticPassword += ` ${staticPassword} ` // Adding Spaces
      } else {
        excludeDuplicate = true; // Excluding Duplicate Characters
      }
    }
  });

  for (let i = 0; i < passLength; i++) {
    // Getting Random Character
    let randomCharacter = randomPassword += staticPassword[Math.floor(Math.random() * staticPassword.length)];
    // if (excludeDuplicate) {
    //   // !randomPassword.includes(randomCharacter) || randomCharacter == " " ? randomPassword += randomCharacter : i--;
    // } else {
    //   randomPassword += randomCharacter;
    // }
  }
  passwordInput.value = randomPassword;
}

// Updating Password Indicator
const updatePassIndicator = () => {
  passwordIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 10 ? "medium" : "strong";
}

// Updating Slider
const updateSlider = () => {
  // Passing Slider Value As Counter Text
  document.querySelector(".pass-length span").innerText = lengthSlider.value;
  generatePassword();
  updatePassIndicator();
}

updateSlider();

const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyIcon.innerText = "check";
}

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateButton.addEventListener("click", generatePassword);