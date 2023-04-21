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
    checkDiagonals(colorOfPlayer)
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

function checkDiagonals(colorOfPlayer) {
    let dj = [0, 0, 0, 1, 2, 3]
    let di = [2, 1, 0, 0, 0, 0]
    let secondDi = [3, 4, 5, 5, 5, 5]
    let mainCounter = 0
    let secondCounter = 0
    for (let i = 0; i < 6; ++i) {
        mainCounter = 0
        for (let j = 0; j < 7; ++j) {
            if (dj[i] + j <= 6 && di[i] + j <= 5) {
                if (ballMatrix[di[i] + j][dj[i] + j].color == colorOfPlayer) {
                    ++mainCounter
                    if (mainCounter == 4) {
                        OutputWinner(di[i] + j, dj[i] + j, di[i] + j - 1, dj[i] + j - 1, di[i] + j - 2, dj[i] + j - 2, di[i] + j - 3, dj[i] + j - 3)
                    }
                } else {
                    mainCounter = 0
                }
            }
            if (secondDi[i] - j >= 0 && dj[i] + j <= 6) {
                if (ballMatrix[secondDi[i] - j][dj[i] + j].color == colorOfPlayer) {
                    ++secondCounter
                    if (secondCounter == 4) {
                        OutputWinner(secondDi[i] - j, dj[i] + j, secondDi[i] - j+1, dj[i] + j-1, secondDi[i] - j+2, dj[i] + j-2, secondDi[i] - j+3, dj[i] + j-3)
                    }
                }
                else{
                    secondCounter=0
                }
            }
        }
    }
}

function checkLines(colorOfPlayer) {
    for (let i = 5; i >= 0; --i) {
        let counter = 0
        for (let j = 0; j < 7; ++j) {
            if (ballMatrix[i][j].color == colorOfPlayer) {
                ++counter
                if (counter == 4) {
                    OutputWinner(i, j, i, j - 1, i, j - 2, i, j - 3)
                    return;
                }
            } else {
                counter = 0
            }
        }
    }
}

function checkColumn(colorOfPlayer) {
    for (let i = 0; i < 7; ++i) {
        let counter = 0
        for (let j = 0; j < 6; ++j) {
            if (ballMatrix[j][i].color == colorOfPlayer) {
                ++counter
                if (counter == 4) {
                    OutputWinner(j, i, j - 1, i, j - 2, i, j - 3, i)
                    return;
                }
            } else {
                counter = 0
            }
        }
    }
}

function OutputWinner(i1, j1, i2, j2, i3, j3, i4, j4) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ballMatrix[i1][j1].shadowColor = "white"
    ballMatrix[i1][j1].shadowBlur = 50
    ballMatrix[i1][j1].whinnerStyle = 6
    ballMatrix[i1][j1].draw(ctx)
    ballMatrix[i2][j2].shadowColor = "white"
    ballMatrix[i2][j2].shadowBlur = 50
    ballMatrix[i2][j2].whinnerStyle = 6
    ballMatrix[i2][j2].draw(ctx)
    ballMatrix[i3][j3].shadowColor = "white"
    ballMatrix[i3][j3].shadowBlur = 50
    ballMatrix[i3][j3].whinnerStyle = 6
    ballMatrix[i3][j3].draw(ctx)
    ballMatrix[i4][j4].shadowColor = "white"
    ballMatrix[i4][j4].shadowBlur = 50
    ballMatrix[i4][j4].whinnerStyle = 6
    ballMatrix[i4][j4].draw(ctx)
    canvas.removeEventListener("click", eventHandler)
}

let successivePlayer = 0

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
    ++successivePlayer
    if (successivePlayer % 2 == 0) {
        currentPlayer = 0
    } else {
        currentPlayer = 1
    }
    showCurrentPlayer()
}

function checkTied(ctx) {
    let checkWhite = 0
    for (let i = 0; i < 6; ++i) {
        for (let j = 0; j < 7; ++j) {
            if (ballMatrix[i][j].color == "white") {
                ++checkWhite;
            }
        }
    }
    if (checkWhite == 0) {
        ctx.clearRect(0, 0, 700, 600)
        ctx.font = "100px serif";
        ctx.fillText("Egalitate", 150, 300);
    }
}
