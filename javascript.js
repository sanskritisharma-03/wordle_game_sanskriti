var hidden_dict = [ // sample array dictionary
  "alarm","brain","bread","chair","frame","dream","dress",
  "earth","juice","money","magic","scale","topic","sleep",
  "smoke","youth","voice","queen","power","lucky","index",
  "flash","sonic","fraud","dance","guard","coach","world"
];

var index01 = Math.floor(Math.random() * hidden_dict.length);
var surprise = hidden_dict[index01]; //selecting a random word from this array
var current_row = 0;
var end_the_game = false;
var streak01 = localStorage.getItem("streak");
if (streak01 == null) {
  streak01 = 0; // saving streaks on your local storage 
}
document.getElementById("score").textContent = "Yay! You are on a streak of: " + streak01; //shows win message if u guess it correctly,also maintains your streak record
var gameplay = document.getElementById("gaming_arena");
for (var i = 0; i < 6; i++) {
  var row = document.createElement("div");
  row.classList.add("row");
  row.id = "row-" + i; // helps to target/ call out a particular row according to our need
  for (var j = 0; j < 5; j++) {
    var box = document.createElement("div"); //dedicates a square space for it
    box.classList.add("box");
    row.appendChild(box);
  }
  gameplay.appendChild(row); // completing the row 
}

window.enterword = function () {
  if (end_the_game) return; //stops the partcilar game if user lost/won
  var guessed_word = document.getElementById("guess-input");
  var guess = guessed_word.value.toLowerCase(); // change input to lowercase for evaluation
  if (guess.length != 5) {
    alert("UH oh! Enter a 5 letter word"); //alert for correct string length
    return;
  }
  guessed_word.value = "";
  var final = check_guess(guess);
  finalresult(current_row, guess, final); // will be used for colour filling later on
  if (guess == surprise) {
    var streak = localStorage.getItem("streak");
    if (streak == null) {
      streak = 0;
    }
    streak = parseInt(streak) + 1; //winning condition
    localStorage.setItem("streak", streak);
    var message_alert = document.getElementById("message");
    message_alert.textContent = "CORRECT! It was " + surprise.toUpperCase() + " | Streak: " + streak;
    end_the_game = true;
    return;
  }
  current_row++;
  if (current_row == 6) {
    localStorage.setItem("streak", 0); // loss condition

    var message_alert = document.getElementById("message");
    message_alert.textContent = "Bad luck, You Lose! Word is: " + surprise.toUpperCase();
    end_the_game = true;
  }
}

function check_guess(guess) {
  var final = []; // we would store our results here
  for (var i = 0; i < 5; i++) {
    final[i] = "grey"; 
    //first we make all of them grey, then we colour so by the end of the execution of our function, we will have the green and yellow boxes and the remaining would be grey by default
  }
  var initial_word = [];
  var initial_guess = [];
  for (var i = 0; i < 5; i++) {
    initial_word[i] = surprise[i];
    initial_guess[i] = guess[i];
  }
  for (var i = 0; i < 5; i++) { //correct letter correct position
    if (initial_guess[i] == initial_word[i]) {
      final[i] = "green";
      initial_word[i] = null;
      initial_guess[i] = null;
    }
  }
  for (var i = 0; i < 5; i++) { //correct letter but at wrong position
    if (initial_guess[i] == null) continue;
    for (var k = 0; k < 5; k++) {
      if (initial_guess[i] == initial_word[k]) {
        final[i] = "yellow";
        initial_word[k] = null;
        break;
      }
    }
  }
  return final;
}

function finalresult(rowIndex, guess, final) {
  var row = document.getElementById("row-" + rowIndex); //we use the row naming that we created earlier to know where the user typed
  var boxes = row.children;
  for (var i = 0; i < 5; i++) {
    boxes[i].textContent = guess[i].toUpperCase(); //we again capitalize our result for display
    boxes[i].classList.add(final[i]);
  }
}

window.restart = function () {
  location.reload(); //restrat the game 
}

document.addEventListener("keydown", function(pressenter) {
  if (pressenter.key == "Enter") {
    enterword(); //allows the player to type a word into the input box and press enter
  }
});