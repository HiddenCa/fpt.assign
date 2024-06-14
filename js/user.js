let user;
// GET USER INFORMATION
function getUser(e) {
  user = window.localStorage.getItem("user");
  console.log("check it run");

  if (!user || user === null) window.location.replace("./index.html");

  user = JSON.parse(user);
  console.log(user);

  if (typeof user.firstName !== "undefined") {
    document.querySelector("#firstName").value = user.firstName;
  }
  if (typeof user.lastName !== "undefined") {
    document.querySelector("#lastName").value = user.lastName;
  }
  if (typeof user.phone !== "undefined") {
    document.querySelector("#phone").value = user.phone;
  }
  if (typeof user.description !== "undefined") {
    document.querySelector("#description").value = user.description;
  }
  document.querySelector("#email").value = user.email;
}

// TRIGGER LOAD USER WHEN PAGE LOAD
document.addEventListener("DOMContentLoaded", getUser());

var isFirstNameValid = true;
var isLastNameValid = true;
var isPhoneValid = true;

// FIRST NAME
function validateFirstName(e) {
  const value = e.target.value;
  isFirstNameValid = false;
  if (value.length > 20) {
    alertInputFirstName();
    return;
  }

  isFirstNameValid = true;
  alertInputFirstName(true);
}

function alertInputFirstName(isCorrectCondition) {
  const input = document.querySelector("#firstName");
  if (!isCorrectCondition) {
    input.style.borderColor = "red";
  } else {
    input.removeAttribute("style");
  }
}

// LAST NAME
function validateLastName(e) {
  const value = e.target.value;
  isLastNameValid = false;
  if (value.length > 20) {
    alertInputLastName();
    return;
  }

  isLastNameValid = true;
  alertInputLastName(true);
}

function alertInputLastName(isCorrectCondition) {
  const input = document.querySelector("#lastName");
  if (!isCorrectCondition) {
    input.style.borderColor = "red";
  } else {
    input.removeAttribute("style");
  }
}

// PHONE NUMBER
function validatePhone(e) {
  const value = e.target.value;
  const regex = "^[0-9]$";
  isPhoneValid = false;
  if (value.length > 11 || !regex.test(value)) {
    alertInputPhone();
    return;
  }

  isPhoneValid = true;
  alertInputPhone(true);
}

function alertInputPhone(isCorrectCondition) {
  const input = document.querySelector("#phone");
  if (!isCorrectCondition) {
    input.style.borderColor = "red";
  } else {
    input.removeAttribute("style");
  }
}

// SUBMIT
function handleSubmitForm(e) {
  e.preventDefault();

  if (!isFirstNameValid || !isLastNameValid || !isPhoneValid) {
    return false;
  }

  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const phone = document.querySelector("#phone").value;
  const description = document.querySelector("#description").value;

  console.log(user);
  user.firstName = firstName;
  user.lastName = lastName;
  user.phone = phone;
  user.description = description;

  let data = window.localStorage.getItem("data");

  if (data) {
    data = JSON.parse(data);
    console.log(data);

    if (!Array.isArray(data)) {
      data = user;
    }

    for (let index = 0; index < data.length; index++) {
      if (data[index].username.toLowerCase() === user.username.toLowerCase()) {
        data[index] = user;
        break;
      }
    }
    window.localStorage.setItem("user", JSON.stringify(user));
    window.localStorage.setItem("data", JSON.stringify(data));
    // window.location.reload();
  }
  return false;
}

// RESET BUTTON
function resetButton(e) {
  console.log(user);
  document.querySelector("#firstName").value =
    typeof user.firstName !== "undefined" ? user.firstName : "";
  document.querySelector("#lastName").value =
    typeof user.lastName !== "undefined" ? user.lastName : "";
  document.querySelector("#phone").value =
    typeof user.phone !== "undefined" ? user.phone : "";
  document.querySelector("#description").value =
    typeof user.description !== "undefined" ? user.description : "";
}
