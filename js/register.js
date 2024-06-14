var isEmailValid;
var isPasswordValid;
var isRePasswordValid;
var isValidInputUsername;

// USERNAME
function validateUsername(e) {
  const value = e.target.value;
  isValidInputUsername = false;

  if (!value || value.length > 50) {
    alertInputUsername();
    return;
  }

  isValidInputUsername = true;
  alertInputUsername(true);
}

function alertInputUsername(isCorrectCondition) {
  const input = document.querySelector("#inputUsername");
  if (!isCorrectCondition) {
    input.style.borderColor = "red";
  } else {
    input.removeAttribute("style");
  }
}

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
  // console.log(isCorrectCondition);
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
  // console.log(e.target.value);
}

function alertInputPassword(isCorrectCondition) {
  const inputPassword = document.querySelector('input[name="inputPassword"]');
  if (!isCorrectCondition) {
    inputPassword.style.borderColor = "red";
  } else {
    inputPassword.removeAttribute("style");
  }
}

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

// RE-PASSWORD
function validateRePassword(e) {
  const value = e.target.value;
  const inputPassword = document.querySelector(
    'input[name="inputPassword"]'
  ).value;
  isRePasswordValid = false;

  if (!value || value.length < 8 || value !== inputPassword) {
    alertInputRePassword();
    return;
  }
  isRePasswordValid = true;
  alertInputRePassword(true);
  // console.log(e.target.value);
}

function alertInputRePassword(isCorrectCondition) {
  const inputPassword = document.querySelector('input[name="inputRePassword"]');
  if (!isCorrectCondition) {
    inputPassword.style.borderColor = "red";
  } else {
    inputPassword.removeAttribute("style");
  }
}

function openHideRePassword(e) {
  const pwdEl = document.querySelector('input[name="inputRePassword"]');
  const showHidePwdEl = document.querySelector("#rePassIcon");
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

  if (
    !isEmailValid ||
    !isPasswordValid ||
    !isValidInputUsername ||
    !isRePasswordValid
  ) {
    return false;
  }

  const inputEmail = document.querySelector('input[name="inputEmail"]').value;
  const inputPassword = document.querySelector(
    'input[name="inputPassword"]'
  ).value;
  const inputUsername = document.querySelector("#inputUsername").value;

  let userId = checkUsernameExists(inputUsername);

  if (userId == -1) {
    console.log("check work ...");
    return false;
  }

  user = {
    id: userId,
    username: inputUsername,
    password: inputPassword,
    email: inputEmail,
    contentNum: 0,
  };

  let data = window.localStorage.getItem("data");
  if (data) {
    data = JSON.parse(data);

    if (Array.isArray(data)) {
      data = data.concat(user);
    } else {
      data = [data].concat(user);
    }
  } else {
    data = user;
  }

  window.localStorage.setItem("data", JSON.stringify(data));
  window.location.replace("./index.html");
}

// CHECK USERNAME EXIST OR NOT
function checkUsernameExists(username) {
  let data = window.localStorage.getItem("data");
  if (!data) return 0;

  if (data) {
    data = JSON.parse(data);

    if (!Array.isArray(data)) return data.username === username ? -1 : 0;

    for (let index = 0; index < data.length; index++) {
      if (data[index].username.toLowerCase() === username.toLowerCase()) {
        return -1;
      }
    }
    return data.length;
  }
}
