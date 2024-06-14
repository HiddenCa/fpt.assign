var user;
// GET USER INFORMATION
function getUser(e) {
  user = window.localStorage.getItem("user");
  console.log("check it run");

  if (!user || user === null) window.location.replace("./index.html");

  user = JSON.parse(user);
  console.log(user);
  viewContents(user);
}

// TRIGGER LOAD USER WHEN PAGE LOAD
document.addEventListener("DOMContentLoaded", getUser());

// VIEW CONTENTS
function viewContents(user) {
  var contents = user.contents;

  if (!contents || typeof contents === "undefined" || contents.length === 0) {
    document.querySelector("tbody").innerHTML = `<tr>
            <td colspan="4">You have no contents yet</td>
          </tr>`;
    return;
  }
  let tableBody = ``;
  for (let index = 0; index < contents.length; index++) {
    const element = `<tr name="${contents[index].id}">
        <th scope="row">${index + 1}</th>
        <td>${contents[index].title}</td>
        <td>${contents[index].brief}</td>
        <td>${contents[index].createDate}</td>
        <td> <div class="btn btn-danger" value="${contents[index].id}"
        onclick="deleteContent(event)">Delete</div> </td>
        </tr>`;
    tableBody = tableBody + element;
  }

  document.querySelector("tbody").innerHTML = tableBody;
}

function deleteContent(e) {
  const value = e.target.attributes.value.value;
  //   console.log(e.target.attributes.value.value);
  document.querySelector(`[name="${value}"]`).classList.add("d-none");
  for (let index = 0; index < user.contents.length; index++) {
    console.log("work here");
    if (user.contents[index].id == value) {
      //   console.log(user.contents[index].id);
      //   console.log(value);
      //   console.log(user.contents[index]);
      //   console.log(index);
      user.contents.splice(index, 1);
      break;
    }
  }
  if (user.contents.length === 0) {
    document.querySelector("tbody").innerHTML = `<tr>
            <td colspan="4">You have no contents yet</td>
          </tr>`;
  }

  // get data and check data
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
  }
  return false;
}
