//Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

//UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play Again Event Listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})

//Listen for Guess
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);
  //Validate our input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }
  //Check if WON
  if (guess === winningNum) {
    //Game Over => WON

    // //Disable Input
    // guessInput.disabled = true;
    // //Change border color
    // guessInput.style.borderColor = "green";
    // //Set Message
    // setMessage(`${winningNum} is correct!, YOU WON!`, "green");

    gameOver(true,`${winningNum} is correct!, YOU WON!`);
  } else {
    //Wrong Number
    guessesLeft -= 1;
    // same as => guessesLeft = guessesLeft - 1
    if (guessesLeft === 0) {
      //Game Over => LOST
    //   //Disable Input
    //   guessInput.disabled = true;
    //   //Change border color
    //   guessInput.style.borderColor = "red";
    //   //Set Message
    //   setMessage(
    //     `Game Over, YOU LOST. The correct number was ${winningNum}`,
    //     "red"
    //   );

    gameOver(false,`Game Over, YOU LOST. The correct number was ${winningNum}`);
    } else {
      //Game Contiues => Answer Wrong

      //Change border color
      guessInput.style.borderColor = "red";

      //Clear input
      guessInput.value = "";

      //Set Message => Tell user this is wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses Left`, "red");
    }
  }
});



//Game Over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  //Disable Input
  guessInput.disabled = true;
  //Change border color
  guessInput.style.borderColor = color;
  //Set message color
  message.style.color = color;
  //Set Message
  setMessage(msg);

  //Play Again ?
  guessBtn.value = 'Play Again';
  //Add New Class
  guessBtn.className += 'play-again';
}

//Get Winning Number
function getRandomNum(min, max){
    // console.log(Math.floor(Math.random()*(max-min+1)+min));
    return Math.floor(Math.random()*(max-min+1)+min);
}

//Set Message function
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
