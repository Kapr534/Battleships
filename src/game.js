

export class Ship {
    constructor(length) {
        this.length = length;
        this.gotHit = 0;
        this.gotSunk = false;
    }

    hit() {
        this.gotHit++;
        return this.isSunk();
    }

    isSunk() {
        this.gotSunk = this.gotHit === this.length;
        return this.gotSunk;
    }
}

export class Gameboard {
    constructor() {
        this.gameBoard = Array(10).fill(null).map(() =>
            Array(10).fill(null).map(() => ({
                ship: null,
                hit: false,
            }))
        );

        this.shipsAlive = 0;

    }

    canAddShip(length, cords, dir) { //zjisti jestli na misto jde dat loď
        if (!length || length > 5) throw new Error("Špatná délka lodi");
        if (cords[0] === undefined|| cords[1] === undefined) throw new Error("Špatné souřadnice");
        if (dir !== "x" && dir !== "y") throw new Error("Špatný směr");

        let x = cords[0];
        let y = cords[1];
        for (let i = 0; i < length; i++) {
            if (x < 0 || y < 0 || x > 9 || y > 9) return false;
            if (this.gameBoard[x][y].ship) return false;

            if (dir === "x") x++;
            if (dir === "y") y--;
        }
        return true;
    }

    addShip(length, cords, dir) {
        if (!this.canAddShip(length, cords, dir)) return false;

        const ship = new Ship(length);
        let x = cords[0];
        let y = cords[1];
        for (let i = 0; i < length; i++) {
            this.gameBoard[x][y].ship = ship;

            if (dir === "x") x++;
            if (dir === "y") y--;
        }
        this.shipsAlive++;
        return ship;
    }

    receiveAttack(cords) {
        if (cords[0] === undefined|| cords[1] === undefined) throw new Error("Špatné souřadnice");
        const x = cords[0];
        const y = cords[1];
        if (this.gameBoard[x][y].hit === true) return false;

        if (this.gameBoard[x][y].ship) {
            this.gameBoard[x][y].hit = true;
            const ship = this.gameBoard[x][y].ship;
            const shipSunk = ship.hit();
            if (shipSunk) this.shipsAlive--;
            return true; // Vrací true/false jestli zasahne (i vodu)
        }
        else {
            this.gameBoard[x][y].hit = true;
            return true; // Vrací true/false jestli zasahne (i vodu)
        }
    }

    // getShip(cords) {
    //     if (cords[0] === undefined|| cords[1] === undefined) throw new Error("Špatné souřadnice");
    //     const x = cords[0];
    //     const y = cords[1];
    //     return this.gameBoard[x][y].ship;
    // }

    showGameBoard() {
        let output = "";
        for (let y = 9; y >= 0; y--) {

            output += y + " ";
            for (let x = 0; x < 10; x++) {
                const cell = this.gameBoard[x][y];

                if (cell.ship === null) {
                    output += ". ";
                } else {
                    output += "S ";
                }
            }
            output += "\n";
        }
        output += "  0 1 2 3 4 5 6 7 8 9";

        return output;
    }

}

export class Player {
    constructor() {
        this.ships = [2, 2, 3, 3, 4];
        this.gameBoard = new Gameboard();
    }

    randomAttack(enemyGameBoard) {
        let hit = false;

        while (!hit) {
            let ranX = Math.floor(Math.random() * 10)
            let ranY = Math.floor(Math.random() * 10)
            let pos = enemyGameBoard.gameBoard[ranX][ranY];


            if (!pos.hit) {
                enemyGameBoard.receiveAttack([ranX, ranY]);
                return {x: ranX, y: ranY};
            }
        }
    }

    randomBoatPlacement() {
        let usedShips = [... this.ships];

        while (usedShips[0]) {
            let ranX = Math.floor(Math.random() * 10);
            let ranY = Math.floor(Math.random() * 10);

            let ranNum = Math.floor(Math.random() * 2);
            let dir;
            if (ranNum === 0) dir = "x";
            else dir = "y"

            if (this.gameBoard.addShip(usedShips[0], [ranX, ranY], dir)) usedShips.shift();
        }
        return 0;
    }


}