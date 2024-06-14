var isEmailValid;
var isPasswordValid;

// EMAIL
function validateEmail(e) {
  const value = e.target.value;
  isEmailValid = false;
  if (!value || value.length < 5) {
    alertInputEmail();
    return;
  }

  if (
    !String(value)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    alertInputEmail();
    return;
  }

  isEmailValid = true;
  alertInputEmail(true);
}

function alertInputEmail(isCorrectCondition) {
  const inputEmail = document.querySelector('input[name="inputEmail"]');
  if (!isCorrectCondition) {
    inputEmail.style.borderColor = "red";
  } else {
    inputEmail.removeAttribute("style");
  }
}

// PASSWORD
function validatePassword(e) {
  const value = e.target.value;
  isPasswordValid = false;

  if (!value || value.length < 8) {
    alertInputPassword();
    return;
  }
  isPasswordValid = true;
  alertInputPassword(true);
}

function alertInputPassword(isCorrectCondition) {
  const inputPassword = document.querySelector('input[name="inputPassword"]');
  if (!isCorrectCondition) {
    inputPassword.style.borderColor = "red";
  } else {
    inputPassword.removeAttribute("style");
  }
}

// function handleSubmitForm(e) {
//   e.preventDefault();

//   if (!isEmailValid || !isPasswordValid) {
//     return false;
//   }

//   const inputEmail = document.querySelector('input[name="inputEmail"]');
//   const inputPassword = document.querySelector('input[name="inputPassword"]');
//   // window.localStorage.setItem("email", inputEmail.value);
//   // window.sessionStorage.setItem("email", inputEmail.value);

//   window.localStorage.setItem(
//     "user",
//     JSON.stringify({ email: inputEmail.value, password: inputPassword.value })
//   );
//   window.localStorage.getItem("user");

//   window.location = "./dashboard.html";
// }

function openHidePassword(e) {
  const pwdEl = document.querySelector('input[name="inputPassword"]');
  const showHidePwdEl = document.querySelector("i.show-hide-pwd");
  if (pwdEl.type === "password") {
    pwdEl.type = "text";
    showHidePwdEl.className = "bi bi-eye-slash show-hide-pwd";
  } else {
    pwdEl.type = "password";
    showHidePwdEl.className = "bi bi-eye show-hide-pwd";
  }
}

// SUBMIT FORM
function handleSubmitForm(e) {
  e.preventDefault();

  if (!isEmailValid || !isPasswordValid) {
    return false;
  }

  const inputEmail = document.querySelector('input[name="inputEmail"]').value;
  const inputPassword = document.querySelector(
    'input[name="inputPassword"]'
  ).value;

  let user = checkUserExists(inputEmail, inputPassword);

  if (user === null) {
    console.log("check work ...");
    return false;
  }

  let data = window.localStorage.getItem("user");

  data = user;

  window.localStorage.setItem("user", JSON.stringify(user));
  window.location.replace("./user.profile.html");
}

// CHECK USERNAME EXIST OR NOT
function checkUserExists(email, password) {
  let data = window.localStorage.getItem("data");
  if (!data) return null;

  if (data) {
    data = JSON.parse(data);
    console.log(data);

    if (!Array.isArray(data))
      return data.email === email && data.password === password ? data : null;

    for (let index = 0; index < data.length; index++) {
      console.log("loop");
      if (
        data[index].email.toLowerCase() === email.toLowerCase() &&
        data[index].password === password
      ) {
        return data[index];
      }
    }
    return null;
  }
}

// REMOVE USER
function logOut(e) {
  window.localStorage.removeItem("user");
}

document.addEventListener("DOMContentLoaded", logOut());
