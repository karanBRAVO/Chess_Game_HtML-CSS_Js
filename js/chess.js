console.log("Chess Engine.");
const Board = document.getElementById("Board");
let assets = {
    "pw": "./img/pawn-w.png",
    "pb": "./img/pawn-b.png",
    "rw": "./img/rook-w.png",
    "rb": "./img/rook-b.png",
    "kw": "./img/knight-w.png",
    "kb": "./img/knight-b.png",
    "bw": "./img/bishop-w.png",
    "bb": "./img/bishop-b.png",
    "KW": "./img/king-w.png",
    "KB": "./img/king-b.png",
    "QW": "./img/queen-w.png",
    "QB": "./img/queen-b.png"
};

const blackBg = "#9e9e9e";
const blueBg = "#03a9f461";
const whiteBg = "#ffffff";
let posDict = {};
let rowDict = {};

function genRows(board) {
    for (let i = 0; i < 8; i++) {
        let div = document.createElement('div');
        div.className = 'row';
        div.id = `row_${i}`
        board.appendChild(div);
    }
}
genRows(Board);

function storeRows(rowDict) {
    for (let i = 0; i < 8; i++) {
        rowDict[`row_${i + 1}`] = document.getElementById(`row_${i}`);
    }
}
storeRows(rowDict);

function genBoxes(rowDict) {
    let boxNum = 1;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let div = document.createElement("div");
            div.className = 'box';
            div.id = `box_${boxNum}`;
            rowDict[`row_${i + 1}`].appendChild(div);
            boxNum++;
        }
    }
}
genBoxes(rowDict);

function storeBoxes(posDict) {
    for (let i = 1; i <= 64; i++) {
        posDict[`box_${i}`] = document.getElementById(`box_${i}`);
    }
}
storeBoxes(posDict);

function colorBoard() {
    let boxNum = 1;
    for (let row = 0; row < 8; row++) {
        if (row % 2 != 0) {
            boxNum += 1;
        }
        else if (row != 0) {
            boxNum -= 1;
        }
        for (let j = 0; j < 4; j++) {
            posDict[`box_${boxNum}`].style.background = blackBg;
            boxNum += 2;
        }
    }
}
colorBoard();

function showStartPieces(posDict) {
    for (let i = 1; i <= 64; i++) {
        let pieceImg = document.createElement('img');
        pieceImg.className = 'pieceImg';

        // black
        if (i == 1 || i == 8) {
            pieceImg.src = assets["rb"];
            if (i == 1) {
                pieceImg.id = "rb1";
            }
            else if (i == 8) {
                pieceImg.id = "rb2";
            }
        }
        else if (i == 2 || i == 7) {
            pieceImg.src = assets["kb"];
            if (i == 2) {
                pieceImg.id = "kb1";
            }
            else if (i == 7) {
                pieceImg.id = "kb2";
            }
        }
        else if (i == 3 || i == 6) {
            pieceImg.src = assets["bb"];
            if (i == 3) {
                pieceImg.id = "bb1";
            }
            else if (i == 6) {
                pieceImg.id = "bb2";
            }
        }
        else if (i == 4) {
            pieceImg.src = assets["KB"];
            pieceImg.id = "KB";
        }
        else if (i == 5) {
            pieceImg.src = assets["QB"];
            pieceImg.id = "QB";
        }
        else if (i >= 9 && i <= 16) {
            pieceImg.src = assets["pb"];
            pieceImg.id = `pb${i - 8}`;
        }

        // white
        if (i == 57 || i == 64) {
            pieceImg.src = assets["rw"];
            if (i == 57) {
                pieceImg.id = "rw1";
            }
            else if (i == 64) {
                pieceImg.id = "rw2";
            }
        }
        else if (i == 58 || i == 63) {
            pieceImg.src = assets["kw"];
            if (i == 58) {
                pieceImg.id = "kw1";
            }
            else if (i == 63) {
                pieceImg.id = "kw2";
            }
        }
        else if (i == 59 || i == 62) {
            pieceImg.src = assets["bw"];
            if (i == 59) {
                pieceImg.id = "bw1";
            }
            else if (i == 62) {
                pieceImg.id = "bw2";
            }
        }
        else if (i == 60) {
            pieceImg.src = assets["KW"];
            pieceImg.id = "KW";
        }
        else if (i == 61) {
            pieceImg.src = assets["QW"];
            pieceImg.id = "QW";
        }
        else if (i >= 49 && i <= 56) {
            pieceImg.src = assets["pw"];
            pieceImg.id = `pw${i - 48}`;
        }

        if (i <= 16 || i >= 49) {
            posDict[`box_${i}`].appendChild(pieceImg);
        }
    }
}
showStartPieces(posDict);


const pb1 = document.getElementById("pb1");

let pawn1_active = false;

pb1.addEventListener('click', () => {
    if (pawn1_active) {
        pawn1_active = false;
    }
    else if (!(pawn1_active)) {
        pawn1_active = true;
    }

    let pawn1_parentBox = pb1.parentNode;
    let pawn1_parentBoxNum = Number((pawn1_parentBox.id).slice(4));
    let pawn1_parentBox_parent = (pawn1_parentBox.parentNode).id;
    let pawn1_parentBox_parentNum = Number(pawn1_parentBox_parent.slice(4));
    
    if (pawn1_active) {
       posDict[`box_${pawn1_parentBoxNum + 8}`].style.background = blueBg;
       posDict[`box_${pawn1_parentBoxNum + 16}`].style.background = blueBg;
    }  
    else if (!(pawn1_active)) {
        if (pawn1_parentBox_parentNum % 2 != 0) {
            if (pawn1_parentBoxNum % 2 != 0) {
                posDict[`box_${pawn1_parentBoxNum + 8}`].style.background = blackBg;
                posDict[`box_${pawn1_parentBoxNum + 16}`].style.background = whiteBg;
            }
            else {
                posDict[`box_${pawn1_parentBoxNum + 8}`].style.background = whiteBg;
                posDict[`box_${pawn1_parentBoxNum + 16}`].style.background = blackBg;
            }
        }
        else if (pawn1_parentBox_parentNum % 2 == 0) {
            if (pawn1_parentBoxNum % 2 != 0) {
                posDict[`box_${pawn1_parentBoxNum + 8}`].style.background = whiteBg;
                posDict[`box_${pawn1_parentBoxNum + 16}`].style.background = blackBg;
            }
            else {
                posDict[`box_${pawn1_parentBoxNum + 8}`].style.background = blackBg;
                posDict[`box_${pawn1_parentBoxNum + 16}`].style.background = whiteBg;
            }
        }
    }
})
