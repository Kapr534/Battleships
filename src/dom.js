export function createUI(gameBoard, onCellClick, containerId, isPlayerBoard) {
    const game = document.getElementById(containerId);
    while (game.firstChild) game.removeChild(game.firstChild);

    gameBoard.gameBoard.forEach((row, x) => {
        row.forEach((cell, y) => {
            const div = document.createElement("div");
            div.classList.add("cell");

            if (cell.ship && isPlayerBoard) div.classList.add("ship");
            if (cell.hit && cell.ship) div.classList.add("hit");
            if (cell.hit && !cell.ship) div.classList.add("miss");

            div.addEventListener("click", () => {
                onCellClick([x, y]);
            })

            // if (isPlayerBoard) {
            //     div.addEventListener("mouseenter", () => {
            //
            //     });
            //
            //     div.addEventListener("mouseleave", () => {
            //
            //     })
            // }

            game.appendChild(div);
        })
    })
}

export function controlBtnsOnClick(resetGame, player, renderGame) {
    const container = document.getElementById("control-btns");
    while (container.firstChild) container.removeChild(container.firstChild);

    const resetBtn = document.createElement("button");
    resetBtn.className = "reset-btn";
    resetBtn.textContent = "Reset"

    const randomBoatPlacementBtn = document.createElement("button");
    randomBoatPlacementBtn.className = "nahodne-rozestaveni-lodi";
    randomBoatPlacementBtn.textContent = "Náhodně rozestavět";

    resetBtn.addEventListener("click", () => {
        resetGame();
    })

    randomBoatPlacementBtn.addEventListener("click", () => {
        player.randomBoatPlacement();
        renderGame();
        container.removeChild(randomBoatPlacementBtn);
    })

    container.appendChild(randomBoatPlacementBtn);
    container.appendChild(resetBtn);
}


