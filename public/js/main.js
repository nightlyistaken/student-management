var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var button = document.createElement("BUTTON");
  var txt = document.createTextNode("\u00D7");
  button.className = "btn btn-danger flex-row-reverse p-2";
  span.appendChild(txt);
  myNodelist[i].appendChild(button);
}

fetch("/getTodos").then(function (response) {
  response.json().then(function (json) {
    json.forEach((inputValue) => {
      var li = document.createElement("li");
      li.classList.toggle("list-group-item");
      var t = document.createTextNode(inputValue);
      li.appendChild(t);
      document.getElementById("myUL").appendChild(li);
      document.getElementById("myInput").value = "";

      var span = document.createElement("BUTTON");
      var txt = document.createTextNode("\u00D7");
      span.appendChild(txt);
      span.className = "btn btn-danger flex-row-reverse p-2";
      li.appendChild(span);

      span.onclick = function () {
        fetch("/removeTodo", {
          method: "POST",
          body: JSON.stringify({ todo: inputValue }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then(() => {
          var div = this.parentElement;
          div.style.display = "none";
        });
      };
    });
  });
});

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector("ul");
list.addEventListener(
  "click",
  function (ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("active");
      Notification.requestPermission().then(function (result) {
        console.log(result);
      });
      new Notification("Todo app", { body: "To-do has been confirmed" });
    }
  },
  false
);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  li.classList.toggle("list-group-item");
  var inputValue = document.getElementById("myInput").value;

  fetch("/addTodo", {
    method: "POST",
    body: JSON.stringify({ todo: inputValue }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function () {
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === "") {
      alert("You must write something!");
    } else {
      document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("BUTTON");
    var txt = document.createTextNode("\u00D7");
    span.appendChild(txt);
    span.className = "btn btn-danger flex-row-reverse p-2";
    li.appendChild(span);

    span.onclick = function () {
      fetch("/removeTodo", {
        method: "POST",
        body: JSON.stringify({ todo: inputValue }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        var div = this.parentElement;
        div.style.display = "none";
      });
    };
  });
}
