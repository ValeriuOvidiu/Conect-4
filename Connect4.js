class ball {
    constructor() {
        this.x = 50
        this.y = 50
        this.radius = 40
        this.color = "white"
        this.shadowColor = null;
        this.shadowBlur = null
        this.whinnerStyle = 0
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.shadowColor = this.shadowColor
        ctx.shadowBlur = this.shadowBlur
        ctx.fillStyle = this.color;
        for (let i = 0; i < this.whinnerStyle; i++) {
            ctx.globalAlpha = 0.2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 10 * i, 0, Math.PI * 2, true);
            ctx.fill();
        }
        ctx.fill();
    }
};

let ballMatrix = []
for (let i = 0; i < 6; ++i) {
    ballMatrix[i] = []
    for (let j = 0; j < 7; ++j) {
        ballMatrix[i][j] = new ball();
    }
}

let intervalId = setInterval(drawBoard, 1)

function drawBoard() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    for (let i = 0; i < 6; ++i) {
        for (let j = 0; j < 7; ++j) {
            ballMatrix[i][j].x += (j * 100)
            ballMatrix[i][j].y += (i * 100)
            ballMatrix[i][j].draw(ctx)
        }
    }
    showCurrentPlayer()
    clearInterval(intervalId)
    intervalId = null
    addEvent()
}

let currentPlayer = 0

function addEvent() {
    const canvas = document.getElementById("canvas");
    canvas.addEventListener("click", eventHandler)
}

function eventHandler(event) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ++currentPlayer
    let colorOfPlayer = "red"
    if (currentPlayer % 2 == 0) {
        colorOfPlayer = "purple"
    }
    const x = Math.floor(event.offsetX / 100)
    let check = 0
    for (let i = 5; i >= 0; --i) {
        if (ballMatrix[i][x].color == "white") {
            ballMatrix[i][x].color = colorOfPlayer
            ballMatrix[i][x].draw(ctx)
            i = -1
            canvas.color = colorOfPlayer
            ++check
        }
    }
    if (check == 0) {
        --currentPlayer
    }
    showCurrentPlayer()
    checkTheDiagonals(colorOfPlayer)
    checkColumn(colorOfPlayer)
    checkLines(colorOfPlayer)
    checkTied(ctx)
}

function showCurrentPlayer() {
    const currentPlayerBall = new ball
    currentPlayerBall.x = 100
    currentPlayerBall.y = 100
    const secondCanvas = document.getElementById("secondCanvas")
    const secondCtx = secondCanvas.getContext("2d")
    secondCtx.font = "30px serif";
    secondCtx.fillStyle = "black"
    secondCtx.fillText("Current Player", 10, 50);
    if (currentPlayer % 2 == 0) {
        currentPlayerBall.color = "red"
    } else {
        currentPlayerBall.color = "purple"
    }
    currentPlayerBall.draw(secondCtx)
}

function checkTheDiagonals(colorOfPlayer) {
    let dj = [0, 0, 0, 1, 2, 3]
    let di = [2, 1, 0, 0, 0, 0]
    let secondDi = [3, 4, 5, 5, 5, 5]
    let mainDiagonelCounter = 0
    let secondDiagonalCounter = 0
    for (let i = 0; i < 6; ++i) {
        mainDiagonelCounter = 0
        for (let j = 0; j < 7; ++j) {
            if (dj[i] + j <= 6 && di[i] + j <= 5) {
                if (ballMatrix[di[i] + j][dj[i] + j].color == colorOfPlayer) {
                    ++mainDiagonelCounter
                    if (mainDiagonelCounter == 4) {
                        let connectedBalls = [ballMatrix[di[i] + j][dj[i] + j], ballMatrix[di[i] + j - 1][dj[i] + j - 1], ballMatrix[di[i] + j - 2][dj[i] + j - 2], ballMatrix[di[i] + j - 3][dj[i] + j - 3]]
                        OutputWinner(connectedBalls)

                    }
                } else {
                    mainDiagonelCounter = 0
                }
            }
            if (secondDi[i] - j >= 0 && dj[i] + j <= 6) {
                if (ballMatrix[secondDi[i] - j][dj[i] + j].color == colorOfPlayer) {
                    ++secondDiagonalCounter
                    if (secondDiagonalCounter == 4) {
                        let connectedBalls = [ballMatrix[secondDi[i] - j][dj[i] + j], ballMatrix[secondDi[i] - j + 1][dj[i] + j - 1], ballMatrix[secondDi[i] - j + 2][dj[i] + j - 2], ballMatrix[secondDi[i] - j + 3][dj[i] + j - 3]]
                        OutputWinner(connectedBalls)
                    }
                }
                else {
                    secondDiagonalCounter = 0
                }
            }
        }
    }
}

function checkLines(colorOfPlayer) {
    for (let i = 5; i >= 0; --i) {
        let countTheConnectedBalls = 0
        for (let j = 0; j < 7; ++j) {
            if (ballMatrix[i][j].color == colorOfPlayer) {
                ++countTheConnectedBalls
                if (countTheConnectedBalls == 4) {
                    let connectedBalls = [ballMatrix[i][j], ballMatrix[i][j - 1], ballMatrix[i][j - 2], ballMatrix[i][j - 3]]
                    OutputWinner(connectedBalls)
                    return;
                }
            } else {
                countTheConnectedBalls = 0
            }
        }
    }
}

function checkColumn(colorOfPlayer) {
    for (let i = 0; i < 7; ++i) {
        let countTheConnectedBalls = 0
        for (let j = 0; j < 6; ++j) {
            if (ballMatrix[j][i].color == colorOfPlayer) {
                ++countTheConnectedBalls
                if (countTheConnectedBalls == 4) {
                    let connectedBalls = [ballMatrix[j][i], ballMatrix[j - 1][i], ballMatrix[j - 2][i], ballMatrix[j - 3][i]]
                    OutputWinner(connectedBalls)
                    return;
                }
            } else {
                countTheConnectedBalls = 0
            }
        }
    }
}

function OutputWinner(connectedBalls) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    for (let i = 0; i < 4; ++i) {
        connectedBalls[i].shadowColor = "white"
        connectedBalls[i].shadowBlur = 50
        connectedBalls[i].whinnerStyle = 6
        connectedBalls[i].draw(ctx)
    }
    canvas.removeEventListener("click", eventHandler)
}

let whoStartsTheGame = 0

function restart() {
    addEvent()
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 700, 600)
    for (let i = 0; i < 6; ++i) {
        for (let j = 0; j < 7; ++j) {
            ballMatrix[i][j].color = "white"
            ballMatrix[i][j].whinnerStyle = 0
            ballMatrix[i][j].shadowBlur = null
            ballMatrix[i][j].shadowColor = null
            ctx.globalAlpha = 1
            ballMatrix[i][j].draw(ctx)
        }
    }
    ++whoStartsTheGame
    if (whoStartsTheGame % 2 == 0) {
        currentPlayer = 0
    } else {
        currentPlayer = 1
    }
    showCurrentPlayer()
}

function checkTied(ctx) {
    let findWhiteBalls = 0
    for (let i = 0; i < 6; ++i) {
        for (let j = 0; j < 7; ++j) {
            if (ballMatrix[i][j].color == "white") {
                ++findWhiteBalls;
            }
        }
    }
    if (findWhiteBalls == 0) {
        ctx.clearRect(0, 0, 700, 600)
        ctx.font = "100px serif";
        ctx.fillText("Egalitate", 150, 300);
    }
}
