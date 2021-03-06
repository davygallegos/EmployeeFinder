
var employees = require("../data/employees");



module.exports = function (app){
app.get("/api/employees", function(req, res) {
    return res.json(employees);
  });

  app.post("/api/employees", function(req, res) {
    var bestMatch = {
        name: "",
        photo: "",
        employeeDifference: Infinity
      };
  
      // Here we take the result of the user"s survey POST and parse it.
      var userData = req.body;
      var userScores = userData.scores;
  
      // This variable will calculate the difference between the user"s scores and the scores of
      // each user in the database
      var totalDifference;
  
      // Here we loop through all the employee possibilities in the database.
      for (var i = 0; i < employees.length; i++) {
        var currentEmployee = employees[i];
        totalDifference = 0;
  
        console.log(currentEmployee.name);
  
        // We then loop through all the scores of each employee
        for (var j = 0; j < currentEmployee.scores.length; j++) {
          var currentEmployeeScore = currentEmployee.scores[j];
          var currentUserScore = userScores[j];
  
          // We calculate the difference between the scores and sum them into the totalDifference
          totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentEmployeeScore));
        }
  
        // If the sum of differences is less then the differences of the current "best match"
        if (totalDifference <= bestMatch.employeeDifference) {
          // Reset the bestMatch to be the new employee.
          bestMatch.name = currentEmployee.name;
          bestMatch.photo = currentEmployee.photo;
          bestMatch.employeeDifference = totalDifference;
        }
      }
  
      // Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
      // the database will always return that the user is the user's best employee).
      employees.push(userData);
  
      // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page
      res.json(bestMatch);
    });
  };
  