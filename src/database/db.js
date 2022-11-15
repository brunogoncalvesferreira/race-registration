const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./src/database/database.db")

db.serialize(() => {
  // db.run(`
  //   CREATE TABLE IF NOT EXISTS date (
  //       id INTEGER PRIMARY KEY AUTOINCREMENT,
  //       name TEXT,
  //       cpf TEXT,
  //       email TEXT
  //   );
  // `)
  // const query = `
  //   INSERT INTO date (
  //     name,
  //     cpf,
  //     email
  //   ) VALUES (?,?,?)
  // `
  // const values = ["Bruno", "09779470689", "brunogonferreira@gmail.com"]
  // function afterInsertData(err) {
  //   if (err) {
  //     return console.log(err)
  //   }
  //   console.log("Cadastro com sucesso!")
  //   console.log(this)
  // }
  // db.run(query, values, afterInsertData)
  //   db.all(`SELECT * FROM date`, function (err, rows) {
  //     if (err) {
  //       return console.log(err)
  //     }
  //     console.log("Aqui estão seus registros: ")
  //     console.log(rows)
  //   })
  db.run(`DELETE FROM date WHERE id=?`, [25], function (err) {
    if (err) {
      return console.log(err)
    }
    console.log("Registro deletado com sucesso!")
  })
})

module.exports = db
