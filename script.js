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

        cell.addEventListener('click', handleCellClick, { once: true });
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
