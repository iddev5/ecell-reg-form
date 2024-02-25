import { generateUsername } from "unique-username-generator";

let theme = "light";

id("back").addEventListener("click", goBack);
id("theme").addEventListener("click", switchTheme);
id("form1").addEventListener("submit", submitUsername);
id("form2").addEventListener("submit", submitPassword);
id("suggestion").textContent = generateUsername("-");
id("suggestion").addEventListener("click", (event) => {
  event.preventDefault();

  const sug = id("suggestion");
  id("username").value = sug.textContent;
  sug.textContent = generateUsername("-");
});

id("showpw").addEventListener("click", (event) => {
  event.preventDefault();

  const showpw = id("showpw");
  if (showpw.name == "eye") {
    showpw.name = "eye-off";
    id("password").type = "text";
  } else {
    showpw.name = "eye";
    id("password").type = "password";
  }
});

id("password").addEventListener("input", checkPassword);
id("confirm").addEventListener("input", checkPassword);

function id(name) {
  return document.getElementById(name);
}

function submitUsername(event) {
  event.preventDefault();

  const username = id("username").value.trim();
  const tooltip = id("tooltip");
  if (username.length == 0) {
    tooltip.textContent = "Username is mandatory";
    tooltip.hidden = false;
  } else if (username.length <= 3) {
    tooltip.textContent = "Username must be longer than 3 letters";
    tooltip.hidden = false;
  } else if (/\s/.test(username)) {
    tooltip.textContent = "Username cannot contain spaces";
    tooltip.hidden = false;
  } else {
    id("form1").hidden = true;
    id("form2").hidden = false;
    id("back").hidden = false;
    id("tooltip").hidden = true;
  }
}

function submitPassword(event) {
  event.preventDefault();

  const password = id("password").value;

  if (password.length <= 8) {
    tooltip.textContent = "Password must be longer than 8 characters";
    tooltip.hidden = false;
  } else if (!/[a-z]/.test(password)) {
    tooltip.textContent = "Password must contain lowercase letters";
    tooltip.hidden = false;
  } else if (!/[A-Z]/.test(password)) {
    tooltip.textContent = "Password must contain uppercase letters";
    tooltip.hidden = false;
  } else if (!/[0-9]/.test(password)) {
    tooltip.textContent = "Password must contain numbers";
    tooltip.hidden = false;
  } else if (password !== id("confirm").value) {
    tooltip.textContent = "Passwords must match";
    tooltip.hidden = false;
  } else {
    id("tooltip").hidden = true;
    id("form2").hidden = true;
    id("form3").hidden = false;
  }
}

function checkPassword() {
  const confirm = id("confirm");
  const password = id("password");
  console.log("here", confirm.value, password.value);
  if (confirm.value === password.value) {
    id("pwcheck").name = "checkmark";
  } else {
    id("pwcheck").name = "close";
  }
}

function goBack() {
  const form1 = id("form1");
  const form2 = id("form2");
  const form3 = id("form3");
  id("tooltip").hidden = true;
  if (!form2.hidden) {
    form1.hidden = false;
    form2.hidden = true;
    id("back").hidden = true;
  } else if (!form3.hidden) {
    form2.hidden = false;
    form3.hidden = true;
  }
}

function switchTheme() {
  const root = document.querySelector(":root");

  if (theme === "light") {
    theme = "dark";
    id("theme-icon").name = "moon";
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    theme = "light";
    id("theme-icon").name = "sunny";
    document.documentElement.setAttribute("data-theme", "light");
  }
}
