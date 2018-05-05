let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let sha = require("sha1");

app.use(bodyParser.raw({ type: "*/*" }));

let serverState = { messages: [] };

let userData = { Admin: { password: sha("Meowkinz123#") } };

let sessions = {};

app.post("/login", (req, res) => {
  let body = req.body.toString();
  let parsedBody = JSON.parse(body);
  let statusResponse = false;
  let errorBody = "Wrong username or Password!";
  let sessionId = Math.floor(Math.random() * 1000000000);
  if (
    parsedBody.user in userData &&
    sha(parsedBody.pass) === userData[parsedBody.user]["password"]
  ) {
    errorBody = "";
    statusResponse = true;
    sessions[sessionId] = parsedBody.user;
    serverState.messages = serverState.messages.concat({user: 'SERVER', message: 'user **'+ parsedBody.user + '** has entered the chat'});
  }
  res.send(
    JSON.stringify({
      user: parsedBody.user,
      status: statusResponse,
      error: errorBody,
      session: sessionId
    })
  );
  console.log("test")
});

app.post("/register", (req, res) => {
  let body = req.body.toString();
  let parsedBody = JSON.parse(body);
  let statusResponse = false;
  let errorBody = "";
  if (parsedBody.user in userData) {
    errorBody = errorBody + "Username already exists! ";
  }

  if (
    !(parsedBody.user in userData) &&
    parsedBody.user.length >= 3 &&
    parsedBody.pass.length >= 5
  ) {
    statusResponse = true;
    errorBody = "Registration Successful";
    userData[parsedBody.user] = { password: sha(parsedBody.pass) };
  }

  if (parsedBody.user.length < 3) {
    errorBody = errorBody + "Username must be at least 3 characters long! ";
  }
  if (parsedBody.pass.length < 5) {
    errorBody = errorBody + "Password must be at least 5 characters long! ";
  }

  res.send(
    JSON.stringify({
      user: parsedBody.user,
      status: statusResponse,
      error: errorBody
    })
  );
});

app.post("/items", (req, res) => {
  let body = req.body.toString();
  let parsedBody = JSON.parse(body);
  if (parsedBody.session in sessions && sessions[parsedBody.session] === parsedBody.user ) {
    let filtered = serverState.messages.filter((x,i)=>{
        return(i>=serverState.messages.length-10)})
    let items = JSON.stringify(filtered);
    res.send(items);
  }
});

app.post("/lastLogin", (req,res) => {
    res.send(JSON.stringify(userData))
})

app.post("/submitMessage", (req, res) => {
  let body = req.body.toString();
  let parsedBody = JSON.parse(body);
  if (parsedBody.session in sessions && sessions[parsedBody.session] === parsedBody.user) {
    let filtered = serverState.messages.filter((x,i)=>{
        return(i>=serverState.messages.length-9)})  
    serverState.messages = filtered.concat(parsedBody);
    let time = Date.now();
    userData[parsedBody.user].lastLogin = time;
    res.send(JSON.stringify(serverState.messages));
  }
});

app.listen(4000, x => {
  console.log("Listening on port 4000");
});
