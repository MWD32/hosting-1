var firstName = document.getElementById("firstName")
var lastName = document.getElementById("lastName")
var username = document.getElementById("username")
var password = document.getElementById("password")
var email = document.getElementById("email")
var signupDataSrc = [firstName, lastName, username, password, email]

function signupFunction () {
  var data = {
    firstName: firstName.value,
    lastName: lastName.value,
    username: username.value,
    email: email.value,
    password: password.value,
  }
  fetch('/signup', {
    method: 'POST',
    headers: {'Content-Type': "application/json"},
    body: JSON.stringify(data),
  })
  .then (response => response.json)
  .then(data => console.log("Recieved Data =>", data))
  .catch(err, console.error("ERR", err))
}