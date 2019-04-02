    
let friends = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {

  //==================================User Info==================================//
  
  let totalDifference = 0;

  
    let bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    };

    let userData = req.body;
    let userScores = userData.scores;

    let scoreInt = userScores.map(function(item) {
      return parseInt(item, 10);
    });

    userData = {
      name: req.body.name,
      photo: req.body.photo,
      scores: scoreInt
    };

   
    let sum = scoreInt.reduce((num1, num2) => num1 + num2, 0);

    

   //=========================Friends Info=================================//

    for (let i = 0; i < friends.length; i++) {
     
      totalDifference = 0;
      
      let bestFriendScore = friends[i].scores.reduce((num1, num2) => num1 + num2, 0);
     
      totalDifference += Math.abs(sum - bestFriendScore);
    
      if (totalDifference <= bestMatch.friendDifference) {
        bestMatch.name = friends[i].name;
        bestMatch.photo = friends[i].photo;
        bestMatch.friendDifference = totalDifference;
      }
     
    }
    friends.push(userData);
    res.json(bestMatch);
  });
};
