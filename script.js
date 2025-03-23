// Selecting all required elements
let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newgame = document.querySelector(".newgame");
let winnerMsg = document.querySelector(".winingMsg");
let msg = document.querySelector("#msg");
let turnIndicator = document.querySelector("#turnIndicator");
let scoreO = document.querySelector("#scoreO");
let scoreX = document.querySelector("#scoreX");

// Initial turn set to "O"
let turn0 = true;
let scores = { O: 0, X: 0 };

// Sound effects
let clickSound = new Audio("click.mp3");   // Click sound
let winSound = new Audio("win.mp3");       // Winning sound
let drawSound = new Audio("draw.mp3");     // Draw sound
let resetSound = new Audio("click.mp3");   // Reset sound

// Winning patterns
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Function to reset game
const resetGame = () => {
    resetSound.play();  // Play reset sound
    turn0 = true;
    enableBoxes();
    winnerMsg.classList.add("hide");
    turnIndicator.innerText = "Turn: O";
};

// Adding click event to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        clickSound.play(); // Play click sound
        if (turn0) {
            box.innerText = "O";
            turnIndicator.innerText = "Turn: X";
        } else {
            box.innerText = "X";
            turnIndicator.innerText = "Turn: O";
        }
        turn0 = !turn0;
        box.disabled = true;
        checkWinner();
    });
});

// Function to disable all boxes
const disableBoxes = () => {
    boxes.forEach((box) => box.disabled = true);
};

// Function to enable all boxes
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("winning-box");
    });
};

// Function to show winner
const showWinner = (winner, winningPattern) => {
    winSound.play(); // Play win sound
    msg.innerText = `🎉 Congratulations, The Winner is ${winner} 🎉`;
    winnerMsg.classList.remove("hide");
    scores[winner]++;
    scoreO.innerText = scores.O;
    scoreX.innerText = scores.X;
    winningPattern.forEach(index => boxes[index].classList.add("winning-box"));
    disableBoxes();
};

// Function to check for a draw
const checkDraw = () => {
    return [...boxes].every(box => box.innerText !== "");
};

// Function to check winner or draw
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let pos1Val = boxes[a].innerText;
        let pos2Val = boxes[b].innerText;
        let pos3Val = boxes[c].innerText;
        
        if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val, pattern);
            return;
        }
    }
    
    if (checkDraw()) {
        drawSound.play(); // Play draw sound
        msg.innerText = "It's a Draw!";
        winnerMsg.classList.remove("hide");
        disableBoxes();
    }
};

// Event listeners for new game and reset buttons
newgame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
