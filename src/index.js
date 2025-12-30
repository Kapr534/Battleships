import "./styles.css";
import {Player} from "./game";
import {createUI, controlBtnsOnClick} from "./dom";


function resetGame() {
    player = new Player();
    bot = new Player();
    bot.randomBoatPlacement();
    playerOnTheMove = true;
    isGameOver = false

    renderGame();
    controlBtnsOnClick(resetGame, player, renderGame);
}

function playerAttack(cords) {
    if (isGameOver) return;
    if (!playerOnTheMove) return;

    const successfulHit = bot.gameBoard.receiveAttack(cords);
    if (!successfulHit) return;
    playerOnTheMove = false;

    renderGame();

    if (bot.gameBoard.shipsAlive === 0) {
        alert("Vyhrál jsi");
        isGameOver = true;
        return;
    }

    setTimeout(() => {
        bot.randomAttack(player.gameBoard);
        renderGame();

        if (player.gameBoard.shipsAlive === 0) {
            alert("Prohrál jsi");
            isGameOver = true;
        }
        else playerOnTheMove = true;
    }, 500);
}

function renderGame () {
    createUI(player.gameBoard, () => {}, "player-game", true);
    createUI(bot.gameBoard, playerAttack, "bot-game", false);
}


// let axis = "x";
// document.addEventListener("contextmenu", (e) => {
//     e.preventDefault();
//     axis = axis === "x" ? "y" : "x";
//     console.log(axis)
// });

let player = new Player();
let bot = new Player();
bot.randomBoatPlacement();
let playerOnTheMove = true;
let isGameOver = false;

controlBtnsOnClick(resetGame, player, renderGame);

renderGame();