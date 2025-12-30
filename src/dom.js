export function createUI(gameBoard, onCellClick, containerId, isPlayerBoard, startGame, shipsToPlace, axis, renderGame, canPlaceBoats) {
    const game = document.getElementById(containerId);
    while (game.firstChild) game.removeChild(game.firstChild);

    for (let x = 0; x < 10; x++) {
        for (let y = 9; y >= 0; y--) {
            const cell = gameBoard.gameBoard[x][y];
            const div = document.createElement("div");
            div.id = `cell${x}${y}`;
            div.classList.add("cell");

            if (cell.ship && isPlayerBoard) div.classList.add("ship");
            if (cell.hit && cell.ship) div.classList.add("hit");
            if (cell.hit && !cell.ship) div.classList.add("miss");

            div.addEventListener("click", () => {
                if (div.classList.contains("mouse-enter") && canPlaceBoats) {
                    gameBoard.addShip(shipsToPlace[0], [x, y], axis);
                    renderGame();
                    shipsToPlace.shift();
                    if (shipsToPlace[0] === undefined) {
                        startGame();
                        const container = document.getElementById("control-btns");
                        const randomBoatPlacementBtn = document.getElementById("nahodne-rozestaveni-lodi")
                        container.removeChild(randomBoatPlacementBtn);
                    }
                }
                else if (shipsToPlace[0] === undefined) {
                    onCellClick([x, y]);
                }
            })

            if (isPlayerBoard) {
                div.addEventListener("mouseenter", () => {
                    if (shipsToPlace[0] !== undefined && canPlaceBoats) {
                        toggleHighlight(x, y, shipsToPlace[0], axis, gameBoard, "add");
                    }
                });

                div.addEventListener("mouseleave", () => {
                    if (shipsToPlace[0] !== undefined) {
                        toggleHighlight(x, y, shipsToPlace[0], axis, gameBoard, "remove");
                    }
                })
            }

            game.appendChild(div);
        }
    }
}

function toggleHighlight(x, y, shipLength, axis, gameBoard, action) {
    const isValid = gameBoard.canAddShip(shipLength, [x, y], axis);
    const className = isValid ? "mouse-enter" : "mouse-enter-fail";

    for (let i = 0; i < shipLength; i++) {
        const targetX = axis === "x" ? x+i : x;
        const targetY = axis === "y" ? y-i : y;

        const cell = document.getElementById(`cell${targetX}${targetY}`);
        if (cell) {
            if (action === "add") {
                cell.classList.add(className);
                console.log(`x: ${x}, y: ${y}`)
            }
            else cell.classList.remove("mouse-enter", "mouse-enter-fail");
        }
    }

}

export function controlBtnsOnClick(resetGame, player, renderGame, startGame, changeCanPlaceBoats) {
    const container = document.getElementById("control-btns");
    while (container.firstChild) container.removeChild(container.firstChild);

    const resetBtn = document.createElement("button");
    resetBtn.className = "reset-btn";
    resetBtn.textContent = "Reset"

    const randomBoatPlacementBtn = document.createElement("button");
    randomBoatPlacementBtn.id = "nahodne-rozestaveni-lodi"
    randomBoatPlacementBtn.className = "nahodne-rozestaveni-lodi";
    randomBoatPlacementBtn.textContent = "Náhodně rozestavět";

    resetBtn.addEventListener("click", () => {
        resetGame();
    })

    randomBoatPlacementBtn.addEventListener("click", () => {
        player.gameBoard.gameBoard = Array(10).fill(null).map(() =>
            Array(10).fill(null).map(() => ({
                ship: null,
                hit: false,
            }))
        );
        player.randomBoatPlacement();
        changeCanPlaceBoats();
        startGame();
        renderGame();
        container.removeChild(randomBoatPlacementBtn);
    })

    container.appendChild(randomBoatPlacementBtn);
    container.appendChild(resetBtn);
}


