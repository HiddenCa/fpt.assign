var isValidTitle;

// TITLE
function validateTitle(e) {
  const value = e.target.value;
  isValidTitle = false;

  if (!value || value.length > 50) {
    alertInputTitle();
    return;
  }

  isValidTitle = true;
  alertInputTitle(true);
}

function alertInputTitle(isCorrectCondition) {
  const input = document.querySelector("#title");
  if (!isCorrectCondition) {
    input.style.borderColor = "red";
  } else {
    input.removeAttribute("style");
  }
}

// GET USER INFORMATION
function getUser(e) {
  let user = window.localStorage.getItem("user");
  console.log("check it run");

  if (!user || user === null) window.location.replace("./index.html");

  user = JSON.parse(user);
  console.log(user);
  return user;
}

// SUBMIT
function handleSubmitForm(e) {
  e.preventDefault();

  if (!isValidTitle) {
    return false;
  }

  const inputTitle = document.querySelector("#title").value;
  const inputBrief = document.querySelector("#brief").value;
  const inputContent = document.querySelector("#content").value;
  var createdDate = new Date();
  createdDate =
    createdDate.getDate() +
    "/" +
    (createdDate.getMonth() + 1) +
    "/" +
    createdDate.getFullYear() +
    " " +
    createdDate.getHours() +
    ":" +
    createdDate.getMinutes();

  let user = getUser();

  user.contentNum = user.contentNum === null ? 1 : user.contentNum + 1;

  let contents = {
    id: user.contentNum,
    title: inputTitle,
    brief: inputBrief,
    content: inputContent,
    createDate: createdDate,
  };
  console.log(contents);

  // check user's contents data
  if (user.contents) {
    if (Array.isArray(user.contents)) {
      user.contents = user.contents.concat(contents);
    } else {
      user.contents = [user.contents].concat(contents);
    }
  } else {
    user.contents = contents;
  }

  // get data and check data
  let data = window.localStorage.getItem("data");

  if (data) {
    data = JSON.parse(data);
    console.log(data);

    if (!Array.isArray(data)) {
      data = user;
    } else {
      for (let index = 0; index < data.length; index++) {
        if (
          data[index].username.toLowerCase() === user.username.toLowerCase()
        ) {
          data[index] = user;
          break;
        }
      }
    }

    window.localStorage.setItem("user", JSON.stringify(user));
    window.localStorage.setItem("data", JSON.stringify(data));

    resetButton();
  }

  //   return false;
}

// RESET BUTTON
function resetButton(e) {
  //   console.log(user);
  document.querySelector("#title").value = "";
  document.querySelector("#brief").value = "";
  document.querySelector("#content").value = "";
}
