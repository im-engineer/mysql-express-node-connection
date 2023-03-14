const {createPool} = require("mysql");

const pool = createPool ({
  HOST: "localhost",
  USER: "root",
  PASSWORD: "smart@2099",
  DB: "testDB"
});

pool.query("select * from Persons", (err, result, field) => {
  if (err) {
    return console.log(err);
  } else {
    return console.log(result)
  }
})