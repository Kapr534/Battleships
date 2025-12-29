import {Ship, Gameboard, Player} from "./game";
import {transformIncludesAndExcludes} from "@babel/preset-env";


// class Ship
test("Vytvoří loď", () => {
    const ship = new Ship(3);

    expect(ship.length).toBe(3);
    expect(ship.gotHit).toBe(0);
    expect(ship.gotSunk).toBe(false);
})

// class Ship
test("Funkce hit()", () => {
    const ship = new Ship(3);

    expect(ship.gotHit).toBe(0);
    ship.hit();
    expect(ship.gotHit).toBe(1);
    ship.hit();
    expect(ship.gotHit).toBe(2);
})

// class Ship
test("Funkce isSunk()", () => {
    const ship = new Ship(2);

    ship.hit();
    expect(ship.gotSunk).toBe(false);
    ship.hit();
    expect(ship.gotSunk).toBe(true);
})

// class Gameboard
test("Testuje jestli fungují arrays s herním polem", () => {
    const gameBoard = new Gameboard();

    expect(gameBoard.gameBoard[0][0].ship).toBe(null);
    expect(gameBoard.gameBoard[0][0].hit).toBe(false);
})

test("Testuje jestli funguje přijímání útoků a potápění", () => {
    const gameBoard = new Gameboard();

    const ship = new Ship(2)
    gameBoard.gameBoard[4][4].ship = ship;
    gameBoard.gameBoard[5][4].ship = ship;

    gameBoard.receiveAttack([4, 4]);
    expect(ship.gotHit).toBe(1);
    expect(ship.gotSunk).toBe(false);
    gameBoard.receiveAttack([5, 4]);
    expect(ship.gotHit).toBe(2);
    expect(ship.gotSunk).toBe(true);
})

test("Testuje jestli funkce správně řekne, jestli na místo můžu položit loď", () => {
    const gameBoard = new Gameboard();

    const ship1 = new Ship(2)
    gameBoard.gameBoard[4][4].ship = ship1;
    gameBoard.gameBoard[5][4].ship = ship1;

    expect(gameBoard.canAddShip(3, [4, 5], "y")).toBe(false);
    expect(gameBoard.canAddShip(3, [3, 4], "y")).toBe(true);

    expect(gameBoard.canAddShip(3, [8, 8], "x")).toBe(false);

})

test("Testuje úspěšné a neúspěšné přidání lodi", () => {
    const gameBoard = new Gameboard();
    const ship1 = new Ship(2)
    gameBoard.gameBoard[4][4].ship = ship1;
    gameBoard.gameBoard[5][4].ship = ship1;

    expect(gameBoard.addShip(3, [4, 5], "y")).toBe(false);
    const ship2 = gameBoard.addShip(3, [2, 5], "y");
    expect(ship2.length).toBe(3);


    expect(gameBoard.gameBoard[2][5].ship).toBeInstanceOf(Ship);
    expect(gameBoard.gameBoard[2][4].ship).toBeInstanceOf(Ship);
    expect(gameBoard.gameBoard[2][3].ship).toBeInstanceOf(Ship);
    expect(gameBoard.gameBoard[2][2].ship).not.toBeInstanceOf(Ship);
})

// Player
test("Testuje náhodné útoky", () => {
    const gameBoard = new Gameboard();

    const player = new Player();
    const attackedCords = player.randomAttack(gameBoard);
    const x = attackedCords.x;
    const y = attackedCords.y;

    expect(gameBoard.gameBoard[x][y].hit).toBe(true);
})

test("Testuje náhodné pokládání lodí", () => {
    const player = new Player();

    expect(player.randomBoatPlacement()).toBe(0);
})