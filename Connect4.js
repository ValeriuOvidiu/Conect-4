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
        showCurrentPlayer()
    }
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
    checkSecundaryDiagonal()
    checkMainDiagonal()
    checkColumn()
    checkLines()
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

function checkSecundaryDiagonal() {
    let indexOfLine = 2
    let indexOfColomn = 0
    let redCounter = 0
    let purpleCounter = 0
    for (let i = 0; i < 3; ++i) {
        ++indexOfLine
        indexOfColomn = 0
        redCounter = 0
        purpleCounter = 0
        for (let j = indexOfLine; j >= 0; --j) {
            if (ballMatrix[j][indexOfColomn].color == "red") {
                ++redCounter
                if (redCounter == 4) {
                    OutputWinner(j, indexOfColomn, j + 1, indexOfColomn - 1, j + 2, indexOfColomn - 2, j + 3, indexOfColomn - 3, "red")
                }
            } else {
                redCounter = 0
            }
            if (ballMatrix[j][indexOfColomn].color == "purple") {
                ++purpleCounter
                if (purpleCounter == 4) {
                    OutputWinner(j, indexOfColomn, j + 1, indexOfColomn - 1, j + 2, indexOfColomn - 2, j + 3, indexOfColomn - 3, "purple")
                }
            } else {
                purpleCounter = 0
            }
            ++indexOfColomn
        }
    }
    indexOfColomn = 0;
    for (let i = 0; i < 3; ++i) {
        redCounter = 0
        purpleCounter = 0
        ++indexOfColomn
        indexOfLine = 5
        for (let j = indexOfColomn; j < 7; ++j) {
            if (ballMatrix[indexOfLine][j].color == "red") {
                ++redCounter
                if (redCounter == 4) {
                    OutputWinner(indexOfLine, j, indexOfLine + 1, j - 1, indexOfLine + 2, j - 2, indexOfLine + 3, j - 3, "red")
                }
            } else {
                redCounter = 0
            }
            if (ballMatrix[indexOfLine][j].color == "purple") {
                ++purpleCounter
                if (purpleCounter == 4) {
                    OutputWinner(indexOfLine, j, indexOfLine + 1, j - 1, indexOfLine + 2, j - 2, indexOfLine + 3, j - 3, "purple")
                }
            } else {
                purpleCounter = 0
            }
            --indexOfLine
        }
    }
}

function checkMainDiagonal() {
    let indexOfLine = 3
    let indexOfColomn = 0
    let redCounter = 0
    let purpleCounter = 0
    for (let i = 0; i < 3; ++i) {
        --indexOfLine
        redCounter = 0
        purpleCounter = 0
        indexOfColomn = 0
        for (let j = indexOfLine; j < 6; ++j) {
            if (ballMatrix[j][indexOfColomn].color == "red") {
                ++redCounter
                if (redCounter == 4) {
                    OutputWinner(j, indexOfColomn, j - 1, indexOfColomn - 1, j - 2, indexOfColomn - 2, j - 3, indexOfColomn - 3, "red")
                }
            } else {
                redCounter = 0
            }
            if (ballMatrix[j][indexOfColomn].color == "purple") {
                ++purpleCounter
                if (purpleCounter == 4) {
                    OutputWinner(j, indexOfColomn, j - 1, indexOfColomn - 1, j - 2, indexOfColomn - 2, j - 3, indexOfColomn - 3, "purple")
                    console.log(purpleCounter)
                }
            } else {
                purpleCounter = 0
            }
            ++indexOfColomn
        }
    }
    indexOfColomn = 0

    for (let i = 0; i < 3; ++i) {
        indexOfLine = 0
        ++indexOfColomn
        redCounter = 0
        purpleCounter = 0
        for (let j = indexOfColomn; j < 7; ++j) {
            if (ballMatrix[indexOfLine][j].color == "red") {
                ++redCounter
                if (redCounter == 4) {
                    OutputWinner(indexOfLine, j, indexOfLine - 1, j - 1, indexOfLine - 2, j - 2, indexOfLine - 3, j - 3, "red")
                    return;
                }
            } else {
                redCounter = 0
            }
            if (ballMatrix[indexOfLine][j].color == "purple") {
                ++purpleCounter
                if (purpleCounter == 4) {
                    OutputWinner(indexOfLine, j, indexOfLine - 1, j - 1, indexOfLine - 2, j - 2, indexOfLine - 3, j - 3, "purple")
                }
            } else {
                purpleCounter = 0
            }
            ++indexOfLine
        }
    }
}

function checkLines() {
    for (let i = 5; i >= 0; --i) {
        let redCounter = 0
        let purpleCounter = 0
        for (let j = 0; j < 7; ++j) {
            if (ballMatrix[i][j].color == "red") {
                ++redCounter
                if (redCounter == 4) {
                    OutputWinner(i, j, i, j - 1, i, j - 2, i, j - 3, "red")
                    return;
                }
            } else {
                redCounter = 0
            }
            if (ballMatrix[i][j].color == "purple") {
                ++purpleCounter
                if (purpleCounter == 4) {
                    OutputWinner(i, j, i, j - 1, i, j - 2, i, j - 3, "purple")
                    console.log(purpleCounter)
                }
            } else {
                purpleCounter = 0
            }

        }

    }
}

function checkColumn() {
    for (let i = 0; i < 7; ++i) {
        let redCounter = 0
        let purpleCounter = 0
        for (let j = 0; j < 6; ++j) {
            if (ballMatrix[j][i].color == "red") {
                ++redCounter
                if (redCounter == 4) {
                    OutputWinner(j, i, j - 1, i, j - 2, i, j - 3, i, "red")
                    return;
                }
            } else {
                redCounter = 0
            }
            if (ballMatrix[j][i].color == "purple") {
                ++purpleCounter
                if (purpleCounter == 4) {
                    OutputWinner(j, i, j - 1, i, j - 2, i, j - 3, i, "purple")
                    console.log(purpleCounter)
                }
            } else {
                purpleCounter = 0
            }
        }
    }
}

function OutputWinner(i1, j1, i2, j2, i3, j3, i4, j4, winner) {
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

