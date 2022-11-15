const express = require("express")
const server = express()

const db = require("./database/db")

server.use(express.static("public"))
server.use(express.urlencoded({ extended: true }))

const nunJucks = require("nunjucks")
nunJucks.configure("src/pages", {
  express: server,
  noCache: true,
})

server.get("/", (req, res) => {
  return res.render("index.html")
})

server.get("/inscricao", (req, res) => {
  req.query
  return res.render("registration.html")
})

server.post("/sucesso", (req, res) => {
  console.log(req.body)

  db.run(`
    CREATE TABLE IF NOT EXISTS date (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        cpf TEXT,
        email TEXT
    );
  `)

  const query = `
    INSERT INTO date (
      name,
      cpf,
      email
    ) VALUES (?,?,?)
  `

  const values = [req.body.name, req.body.cpf, req.body.email]

  function afterInsertData(err) {
    if (err) {
      return console.log(err)
    }
    console.log("Cadastro com sucesso!")
    console.log(this)

    return res.render("saved-participants.html", { saved: true })
  }

  db.run(query, values, afterInsertData)
})

server.get("/inscritos", (req, res) => {
  db.all(`SELECT * FROM date`, function (err, rows) {
    if (err) {
      console.log(err)
    }
    console.log("Aqui estão os inscritos!")
    console.log(rows)

    return res.render("participants-registered.html", { date: rows })
  })
})

server.listen(3000)
