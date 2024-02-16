// import libraries
const bodyParser = require("body-parser")
const express = require("express")
const path = require("path")
const fs = require("fs")
require("dotenv").config()

// get the prevous users data
var usersData = JSON.parse(fs.readFileSync("./users.json", "utf8"))
console.log("Prevous users data:", usersData)
console.log("Type of prevous users data:", typeof(usersData))


// create an express app
const app = express()
app.use(bodyParser.json()) // use bodyParser to organize the request json
app.use(express.static(path.join(__dirname, 'templates'))) // use templates folder

app.post('/signup', (req, res) => {
  const signupData = req.body
  console.log("Requested Data =>" ,signupData)
  var usersId = []
  var usersNames = []
  var usersEmails = []
  var usersPasswords = []
  for (const user in usersData) {
    usersId.push(user.id)
    usersNames.push(user.Name)
    usersEmails.push(user.email)
    usersPasswords.push(user.password)
  }
  if (usersNames.includes(signupData.name)) {res.json({success:false,error:"this username is already used", status:1})}
  else if (usersEmails.includes(signupData.Emails)) {res.json({success:false,error:"this email is already used", status:3})}
  else if (usersPasswords.includes(signupData.name)) {res.json({success:false,error:"this password is already used", status:4})}
  else {
    usersData.push(signupData)
    console.log("New Users Data =>", usersData)
    fs.writeFileSync("./users.json", JSON.stringify(usersData), 'utf8')
    res.json({success:true})
  }
})

app.listen(process.env.PORT, () => {
  console.log(`visit our website on http://localhost:${process.env.PORT}/`)
})