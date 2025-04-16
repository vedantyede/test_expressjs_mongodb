import express from "express";

const users = [
  { username: "user1", password: "pass1" },
  { username: "user2", password: "pass2" },
  { username: "user3", password: "pass3" },
  { username: "user4", password: "pass4" },
  { username: "user5", password: "pass5" },
];

const PORT = 3000;

const app = express();

app.use(express.json()); // this will get call by default on every request as middleware

// we are usig this function as middleware as  we are calling in ur request
function userExist(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;
  let userAvailable = false;
  users.forEach((el) => {
    if (el.username === username && el.password === password) {
      userAvailable = true;
    }
  });
  if (!userAvailable) {
    res.status(400).json({ msg: "user does not exist" });
  } else {
    next();
  }
}

app.get("/", userExist, function (req, res) {
  res.json({ msg: "Let's Start" });
});

app.get("/auth", userExist, function (req, res) {
  const username = req.headers.username;
  res.status(200).json({ msg: `Welcome ${username} !!!` });
});

app.get("/:id", userExist, function (req, res) {
  const id = req.params.id;
  res.json({ msg: `You are in ${id}` });
});

app.listen(PORT);
