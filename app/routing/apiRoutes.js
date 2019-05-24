
var employees = require("../data/employees");



module.exports = function (app){
// Basic route that sends the user first to the AJAX Page
app.get("/api/employees.js", function(req, res) {
    res.sendFile(path.join("../data/employees.js"));
  });
  
  app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
  });
  
  res.sendFile(path.join(__dirname, "../public/tables.html"));
}
  