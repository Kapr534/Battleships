export function createUI(gameBoard, onCellClick, containerId) {
    const game = document.getElementById(containerId);
    while (game.firstChild){
        game.removeChild(game.firstChild);
    }

    const gameTable = document.createElement("div");
    gameTable.className = "game-table"

    gameBoard.gameBoard.forEach((row, x) => {
        row.forEach((cell, y) => {
            const div = document.createElement("div");
            div.classList.add("cell");

            if (cell.ship) div.classList.add("ship");
            if (cell.hit && cell.ship) div.classList.add("hit");
            if (cell.hit && !cell.ship) div.classList.add("miss");

            cell.addEventListener("click", () => {
                onCellClick();
            })

            gameTable.appendChild(div);
        })
    })

}