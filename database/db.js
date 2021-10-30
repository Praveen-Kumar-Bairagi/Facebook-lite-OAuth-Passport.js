require("dotenv").config();

console.log(process.env.DB_HOST);
const knex = require("knex")({
  client: "mysql",
  connection: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

knex.schema
  .createTable("facebook", (table) => {
    table.increments("Id");
    table.string("Name");
    table.string("profile_id");
    table.string("Image_url");
  })
  .then((data) => {
    console.log("table created");
  })
  .catch((err) => {
    console.log("table already created");
  });

module.exports = knex;
