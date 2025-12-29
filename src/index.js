import "./styles.css";
import {Player} from "./game";
import {createUI} from "./dom";

let playerOnTheMove = false;
const player = new Player();
const bot = new Player();
player.randomBoatPlacement();
bot.randomBoatPlacement();
createUI(player.gameBoard);
createUI(bot.gameBoard);

function onClick() {
    if (!onTheMove) return;
// Potreba dodelat createUI() dosazeni
//     propojeni index.js se zbytkem

}
