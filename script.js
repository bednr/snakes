const gameBoard = document.querySelector('.grid-container');
const moveUp = { x: 0, y: -1 };
const moveDown = { x: 0, y: 1 };
const moveLeft = { x: -1, y: 0 };
const moveRight = { x: 1, y: 0 };
let speed = 80;

let snakeBody1 = [{ x: 5, y: 3 }, { x: 4, y: 3 }, { x: 3, y: 3 }];
let snakeBody2 = [{ x: 29, y: 3 }, { x: 30, y: 3 }, { x: 31, y: 3 }];
let food = { x: 17, y: 17 };
let pOneMovementDirection = moveRight;
let pTwoMovementDirection = moveLeft;
let menuChoiceNum = 0;
const gridSize = 33;
let gameOver = true;
let mainMenuText = "Press&nbsp;'E'&nbsp;to&nbsp;play&nbsp;vs&nbsp;BOT    Press&nbsp;'P'&nbsp;to&nbsp;play&nbsp;PvP&nbsp;locally     Press&nbsp;'B'&nbsp;to&nbsp;watch&nbsp;two&nbsp;bots&nbsp;play";
let deathText = "Press&nbsp;'R'&nbsp;to&nbsp;restart      Press&nbsp;'M'&nbsp;for&nbsp;main&nbsp;menu"

let botOneMovementDirection = { x: 1, y: 0 };
let tempOneBotMovementDirection = { x: 0, y: 0 };
let botTwoMovementDirection = { x: -1, y: 0 };
let tempTwoBotMovementDirection = { x: 0, y: 0 };


let directionSet = false;
let directionSet2 = false;

let isDetour = false;
let r;
let s1c;
let s2c;
function commitChange() {
    speed = parseInt(document.querySelector('#gameSpeed').value);
    r = document.querySelector(':root');
    s1c = document.querySelector('#snake1color').value;
    s2c = document.querySelector('#snake2color').value;
    r.style.setProperty('--snake1color', s1c);
    r.style.setProperty('--snake2color', s2c);
}


function newGame() {
    snakeBody1 = [{ x: 5, y: 3 }, { x: 4, y: 3 }, { x: 3, y: 3 }];
    snakeBody2 = [{ x: 29, y: 3 }, { x: 30, y: 3 }, { x: 31, y: 3 }];
    food = { x: 17, y: 17 };
    pOneMovementDirection = moveRight;
    pTwoMovementDirection = moveLeft;
    // botOneMovementDirection = { x: 1, y: 0 };
    // tempOneBotMovementDirection = { x: 0, y: 0 };
    // botTwoMovementDirection = { x: -1, y: 0 };
    // tempTwoBotMovementDirection = { x: 0, y: 0 };
    gameOver = false;
}


function draw(gameBoard, snake1, snake2) {
    snake1.forEach(segment => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake1');
        gameBoard.appendChild(snakeElement);
    })
    snake2.forEach(segment => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake2');
        gameBoard.appendChild(snakeElement);
    })
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

function menuText(gameBoard) {
    gameBoard.innerHTML = '';
    const mainMenu = document.createElement('div')
    mainMenu.style.gridRowStart = 17
    mainMenu.style.gridColumnStart = 17
    mainMenu.classList.add('menuText')
    gameBoard.appendChild(mainMenu)
    document.querySelector('.menuText').innerHTML = mainMenuText;
}

function menuChoice() {
    setTimeout(function onTick() {
        window.addEventListener('keydown', e => {
            if (menuChoiceNum === 0) {
                switch (e.code) {
                    case 'KeyP':
                        menuChoiceNum = 2;
                        gameOver = false;
                        newGame()
                        main();
                        break;
                    case 'KeyE':
                        menuChoiceNum = 1;
                        gameOver = false;
                        newGame()
                        main();
                        break;
                    case 'KeyB':
                        menuChoiceNum = 3;
                        gameOver = false;
                        newGame()
                        main();
                        break;
                }
            }
        })
    }, 100)
}
function inputSolo() {
    directionSet = false
    window.addEventListener('keydown', e => {
        if ((menuChoiceNum === 3||menuChoiceNum === 1) && (!directionSet || gameOver)) {
            switch (e.code) {
                case 'ArrowUp':
                case 'KeyW':
                    if (pOneMovementDirection == moveDown) break
                    pOneMovementDirection = moveUp
                    break;
                case 'ArrowDown':
                case 'KeyS':
                    if (pOneMovementDirection == moveUp) break
                    pOneMovementDirection = moveDown
                    break;
                case 'ArrowLeft':
                case 'KeyA':
                    if (pOneMovementDirection == moveRight) break
                    pOneMovementDirection = moveLeft
                    break;
                case 'ArrowRight':
                case 'KeyD':
                    if (pOneMovementDirection == moveLeft) break
                    pOneMovementDirection = moveRight
                    break;
                case 'KeyR':
                    if (gameOver) {
                        newGame()
                        main();
                    } break;
                case 'KeyM':
                    if (gameOver) {
                        menuChoiceNum = 0;
                        main();
                    }
            }
            directionSet = true
        }
    })
}
function inputOne() {
    directionSet = false
    window.addEventListener('keydown', e => {
        if (!directionSet || gameOver) {
            switch (e.code) {
                case 'KeyW':
                    if (pOneMovementDirection == moveDown) break
                    pOneMovementDirection = moveUp
                    directionSet = true
                    break;
                case 'KeyS':
                    if (pOneMovementDirection == moveUp) break
                    pOneMovementDirection = moveDown
                    directionSet = true
                    break;
                case 'KeyA':
                    if (pOneMovementDirection == moveRight) break
                    pOneMovementDirection = moveLeft
                    directionSet = true
                    break;
                case 'KeyD':
                    if (pOneMovementDirection == moveLeft) break
                    pOneMovementDirection = moveRight
                    directionSet = true
                    break;
                case 'KeyR':
                    if (gameOver) {
                        newGame()
                        main();
                    }
                    break;
                case 'KeyM':
                    if (gameOver) {
                        menuChoiceNum = 0;
                        main();
                    }
            }
        }
    })
}
function inputTwo() {
    directionSet2 = false
    window.addEventListener('keydown', e => {
        if (!directionSet2) {
            switch (e.code) {
                case 'ArrowUp':
                    if (pTwoMovementDirection == moveDown) break
                    pTwoMovementDirection = moveUp
                    directionSet2 = true
                    break;
                case 'ArrowDown':
                    if (pTwoMovementDirection == moveUp) break
                    pTwoMovementDirection = moveDown
                    directionSet2 = true
                    break;
                case 'ArrowLeft':
                    if (pTwoMovementDirection == moveRight) break
                    pTwoMovementDirection = moveLeft
                    directionSet2 = true
                    break;
                case 'ArrowRight':
                    if (pTwoMovementDirection == moveLeft) break
                    pTwoMovementDirection = moveRight
                    directionSet2 = true
                    break;
            }
        }
    })

}

function updateSnakeBodyPosition(snake) {
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
    }
}
function getMoving(snake, movDir) {
    updateSnakeBodyPosition(snake);
    updateMovementDirection(getSnakeHead(snake), movDir);
}
function updateMovementDirection(snake, movDir) {
    snake.x += movDir.x;
    snake.y += movDir.y;
}

function hasEaten(snakeBody) {
    if (snakeBody[0].x == food.x && snakeBody[0].y == food.y) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
        food = getRndFood(snakeBody);
    }
}

function getRndFood(snakeBody) {
    let newFoodPosition
    while (newFoodPosition == null || onSnake(newFoodPosition, snakeBody)) {
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;

}
function randomGridPosition() {
    return {
        x: Math.floor(Math.random() * gridSize) + 1,
        y: Math.floor(Math.random() * gridSize) + 1
    }
}
function equalPositions(pos1, pos2) {
    return pos1.x == pos2.x && pos1.y == pos2.y
}
function onSnake(position, snakeBody) {
    return snakeBody.some(segment => {
        return equalPositions(segment, position)
    })
}



function checkDeath(snake1, snake2) {
    gameOver = wallHit(getSnakeHead(snake1)) || wallHit(getSnakeHead(snake2))
        || snakeHitSelf(getSnakeHead(snake1), snake1) || snakeHitSelf(getSnakeHead(snake2), snake2)
        || snakeHitSnake(getSnakeHead(snake1), snake2) || snakeHitSnake(getSnakeHead(snake2), snake1)
}
function deathTextMenu() {
    if (gameOver) {
        const deathTextMenu = document.createElement('div')
        deathTextMenu.style.gridRowStart = 17
        deathTextMenu.style.gridColumnStart = 17
        deathTextMenu.classList.add('menuText')
        gameBoard.appendChild(deathTextMenu)
        document.querySelector('.menuText').innerHTML = deathText;
    }
}

function wallHit(head) {
    return (
        head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize
    )
}
function snakeHitSnake(head, body) {
    for (let i = 0; i < body.length; i++) {
        if (head.x === body[i].x && head.y === body[i].y) {
            return true
        }
    }
}
function snakeHitSelf(head, body) {
    for (let i = 1; i < body.length; i++) {
        if (head.x === body[i].x && head.y === body[i].y) {
            return true
        }
    }
}

function getSnakeHead(snakeHead) {
    return snakeHead[0]
}

function botMove(snake1, snake2, botMovDir, tempBotMovDir) {
    updateSnakeBodyPosition(snake1);
    alignWithFood(getSnakeHead(snake1), snake1, snake2, botMovDir, tempBotMovDir);
}

function snakeWillHit(head, body, direction) {
    return body.some(segment => {
        return head.x + direction.x == segment.x && head.y + direction.y == segment.y
    })
}

function alignWithFood(head, snake1, snake2, botMovementDirection, tempBotMovementDirection) {
    isDetour = false;
    if (head.x < food.x) {
        if (snakeWillHit(head, snake1, moveRight) || snakeWillHit(head, snake2, moveRight)) {
            isDetour = true;
            if (snakeWillHit(head, snake1, moveUp) || head.y - 1 === 0 || snakeWillHit(head, snake2, moveUp)) {
                tempBotMovementDirection = moveDown;
            }
            else {
                tempBotMovementDirection = moveUp;
            }
        }
        if (isDetour && tempBotMovementDirection === moveDown) {
            for (let i = 1; i < snake1.length; i++) {
                if (snakeWillHit(head, snake1, moveDown) || head.y + 1 === gridSize + 1 || snakeWillHit(head, snake2, moveDown)) {
                    tempBotMovementDirection = moveLeft;
                }
            }
        }
        if (!isDetour) {
            tempBotMovementDirection = moveRight;
        }
    }
    else if (head.x > food.x) {
        if (snakeWillHit(head, snake1, moveLeft) || snakeWillHit(head, snake2, moveLeft)) {
            isDetour = true;
            if (snakeWillHit(head, snake1, moveUp) || head.y - 1 === 0 || snakeWillHit(head, snake2, moveUp)) {
                tempBotMovementDirection = moveDown;
            }
            else {
                tempBotMovementDirection = moveUp;
            }
        }
        if (isDetour && tempBotMovementDirection == moveDown) {
            for (let i = 1; i < snake1.length; i++) {
                if (snakeWillHit(head, snake1, moveDown) || head.y + 1 === gridSize + 1 || snakeWillHit(head, snake2, moveDown)) {
                    tempBotMovementDirection = moveRight;
                }
            }
        }
        if (!isDetour) {
            tempBotMovementDirection = moveLeft;
        }
    }
    else if (head.y > food.y) {
        if (snakeWillHit(head, snake1, moveUp) || snakeWillHit(head, snake2, moveUp)) {
            isDetour = true;
            if (snakeWillHit(head, snake1, moveLeft) || head.x - 1 === 0 || snakeWillHit(head, snake2, moveLeft)) {
                tempBotMovementDirection = moveRight;
            }
            else {
                tempBotMovementDirection = moveLeft;
            }
        }
        if (!isDetour) {
            tempBotMovementDirection = moveUp;
        }
    }
    else if (head.y < food.y) {
        if (snakeWillHit(head, snake1, moveDown) || snakeWillHit(head, snake2, moveDown)) {
            isDetour = true;
            if (snakeWillHit(head, snake1, moveLeft) || head.x - 1 === 0 || snakeWillHit(head, snake2, moveLeft)) {
                tempBotMovementDirection = moveRight;
            }
            else {
                tempBotMovementDirection = moveLeft;
            }
        }
        if (!isDetour) {
            tempBotMovementDirection = moveDown;
        }
    }
    botMovementDirection = tempBotMovementDirection;
    updateMovementDirection(getSnakeHead(snake1), botMovementDirection);
    isDetour = false;
}


function main() {
    if (!gameOver) {
        switch (menuChoiceNum) {
            case 1:
                playSolo()
                break;
            case 2:
                playPVP()
                break;
            case 3:
                justWatch()
                break;
        }
    }
    if (menuChoiceNum === 0) {
        menuText(gameBoard);
    }
    if (gameOver) {
        menuChoice();
    }
}

function playSolo() {
    setTimeout(function onTick() {
        inputSolo();
        gameBoard.innerHTML = '';
        draw(gameBoard, snakeBody1, snakeBody2);
        checkDeath(snakeBody1, snakeBody2);
        botMove(snakeBody2, snakeBody1, botTwoMovementDirection, tempTwoBotMovementDirection);
        getMoving(snakeBody1, pOneMovementDirection);
        hasEaten(snakeBody1);
        hasEaten(snakeBody2);
        deathTextMenu();
        main()
    }, speed)
}

function playPVP() {
    setTimeout(function onTick() {
        inputOne();
        inputTwo();
        gameBoard.innerHTML = '';
        draw(gameBoard, snakeBody1, snakeBody2);
        checkDeath(snakeBody1, snakeBody2);
        getMoving(snakeBody1, pOneMovementDirection);
        getMoving(snakeBody2, pTwoMovementDirection);
        hasEaten(snakeBody1);
        hasEaten(snakeBody2);
        deathTextMenu();
        main()
    }, speed)
}
function justWatch() {
    setTimeout(function onTick() {

        if (!gameOver) {
            gameBoard.innerHTML = '';
            inputSolo();
            draw(gameBoard, snakeBody1, snakeBody2);
            botMove(snakeBody1, snakeBody2, botOneMovementDirection, tempOneBotMovementDirection);
            botMove(snakeBody2, snakeBody1, botTwoMovementDirection, tempTwoBotMovementDirection);

            hasEaten(snakeBody1);
            hasEaten(snakeBody2);

            checkDeath(snakeBody1, snakeBody2);
            deathTextMenu();

            main()

        };
    }, speed)
}

/*two bot snakes gamemodel*/
// function main() {

// if (gameOver) {
//     newGame()
// }

// }

main();
