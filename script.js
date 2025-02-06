let fields = [
    null, null, null,
    null, null, null,
    null, null, null
];

let currentPlayer = 'circle';

function init() {
    renderBoard();
}

const content = document.getElementById('content');
const gridSize = 3;

function renderBoard() {
    content.innerHTML = ''; // Reset Content

    const board = document.createElement('div');
    board.classList.add('board');

    fields.forEach((field, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = index;
        
        if (field === 'cross') {
            renderCross(cell, true);
        } else if (field === 'circle') {
            renderCircle(cell, true);
        }

        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    });

    content.appendChild(board);
}

function handleCellClick(event) {
    const cell = event.target;
    const index = parseInt(cell.dataset.index);

    if (fields[index]) return; // Ignore already filled cells

    fields[index] = currentPlayer;
    renderSingleCell(cell, currentPlayer);

    // Check for winner
    if (checkWinner()) {
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross';
}

function renderSingleCell(cell, player) {
    if (player === 'cross') {
        renderCross(cell, false);
    } else if (player === 'circle') {
        renderCircle(cell, false);
    }
}

function renderCross(cell, skipAnimation) {
    const crossSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    crossSvg.setAttribute('width', '80px');
    crossSvg.setAttribute('height', '80px');
    crossSvg.setAttribute('viewBox', '0 0 80 80');

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '10');
    line1.setAttribute('y1', '10');
    line1.setAttribute('x2', '70');
    line1.setAttribute('y2', '70');
    line1.setAttribute('stroke', 'yellow');
    line1.setAttribute('stroke-width', '8');
    line1.setAttribute('stroke-linecap', 'round');

    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', '10');
    line2.setAttribute('y1', '70');
    line2.setAttribute('x2', '70');
    line2.setAttribute('y2', '10');
    line2.setAttribute('stroke', 'yellow');
    line2.setAttribute('stroke-width', '8');
    line2.setAttribute('stroke-linecap', 'round');

    if (!skipAnimation) {
        const animate1 = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animate1.setAttribute('attributeName', 'stroke-dashoffset');
        animate1.setAttribute('from', '100');
        animate1.setAttribute('to', '0');
        animate1.setAttribute('dur', '0.5s');
        animate1.setAttribute('fill', 'freeze');
        line1.setAttribute('stroke-dasharray', '100');
        line1.setAttribute('stroke-dashoffset', '100');
        line1.appendChild(animate1);

        const animate2 = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animate2.setAttribute('attributeName', 'stroke-dashoffset');
        animate2.setAttribute('from', '100');
        animate2.setAttribute('to', '0');
        animate2.setAttribute('dur', '0.5s');
        animate2.setAttribute('fill', 'freeze');
        line2.setAttribute('stroke-dasharray', '100');
        line2.setAttribute('stroke-dashoffset', '100');
        line2.appendChild(animate2);
    }

    crossSvg.appendChild(line1);
    crossSvg.appendChild(line2);
    cell.appendChild(crossSvg);
}

function renderCircle(cell, skipAnimation) {
    const circleSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    circleSvg.setAttribute('width', '80px');
    circleSvg.setAttribute('height', '80px');
    circleSvg.setAttribute('viewBox', '0 0 80 80');

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '40');
    circle.setAttribute('cy', '40');
    circle.setAttribute('r', '30');
    circle.setAttribute('stroke', '#00B0EF');
    circle.setAttribute('stroke-width', '8');
    circle.setAttribute('fill', 'none');

    if (!skipAnimation) {
        const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animate.setAttribute('attributeName', 'stroke-dashoffset');
        animate.setAttribute('from', '188.4');
        animate.setAttribute('to', '0');
        animate.setAttribute('dur', '0.5s');
        animate.setAttribute('fill', 'freeze');
        circle.setAttribute('stroke-dasharray', '188.4');
        circle.setAttribute('stroke-dashoffset', '188.4');
        circle.appendChild(animate);
    }

    circleSvg.appendChild(circle);
    cell.appendChild(circleSvg);
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], // Rows
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // Columns
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // Diagonals
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            drawWinningLine(a, b, c);
            return true;
        }
    }

    return false;
}

function drawWinningLine(a, b, c) {
    const cells = document.querySelectorAll('.cell');

    [a, b, c].forEach(index => {
        cells[index].classList.add('winning-cell');
    });

    animateLine(cells[a], cells[c]); // Animate the winning line
    content.style.pointerEvents = 'none';
}

function animateLine(startCell, endCell) {
    const startX = startCell.offsetLeft + startCell.offsetWidth / 2;
    const startY = startCell.offsetTop + startCell.offsetHeight / 2;
    const endX = endCell.offsetLeft + endCell.offsetWidth / 2;
    const endY = endCell.offsetTop + endCell.offsetHeight / 2;

    const line = document.createElement('div');
    line.classList.add('line');
    document.body.appendChild(line);

    const length = Math.hypot(endX - startX, endY - startY);
    const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.left = `${startX}px`;
    line.style.top = `${startY}px`;
}

// CSS styles for visual effects
const style = document.createElement('style');
style.textContent = `
    .winning-cell {
        background-color: rgba(0, 255, 0, 0.3); 
    }
    .line {
        position: absolute;
        height: 5px;
        background: red;
        transform-origin: 0 50%;
        transition: width 0.5s ease-out;
    }
`;
document.head.appendChild(style);