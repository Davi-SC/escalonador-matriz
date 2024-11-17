document
  .getElementById("generate-matrix")
  .addEventListener("click", function () {
    const rows = parseInt(document.getElementById("rows").value);
    const columns = parseInt(document.getElementById("columns").value);

    if (rows > 0 && columns > 0) {
      const matrixContainer = document.getElementById("matrix-container");
      matrixContainer.innerHTML = "";

      matrixContainer.style.gridTemplateColumns = `repeat(${columns}, 60px)`;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          const input = document.createElement("input");
          input.type = "number";
          input.id = `cell-${i}-${j}`;
          matrixContainer.appendChild(input);
        }
      }

      document.getElementById("matrix-input").classList.remove("hidden");
    }
  });

document
  .getElementById("matrix-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const rows = parseInt(document.getElementById("rows").value);
    const columns = parseInt(document.getElementById("columns").value);
    const matrix = [];

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        const cellValue = parseFloat(
          document.getElementById(`cell-${i}-${j}`).value
        );
        row.push(isNaN(cellValue) ? 0 : cellValue);
      }
      matrix.push(row);
    }

    const escalonatedMatrix = escalonarMatriz(matrix);
    displayMatrix(escalonatedMatrix);
  });

function escalonarMatriz(matrix) {
  const rows = matrix.length;
  const columns = matrix[0].length;

  for (let i = 0; i < rows; i++) {
    let pivot = matrix[i][i];

    for (let j = i + 1; j < rows; j++) {
      const factor = matrix[j][i] / pivot;
      for (let k = i; k < columns; k++) {
        matrix[j][k] -= factor * matrix[i][k];
      }
    }
  }
  return matrix;
}

function displayMatrix(matrix) {
  const resultContainer = document.getElementById("escalonated-matrix");
  resultContainer.innerHTML = "";

  matrix.forEach(row => {
    const rowDiv = document.createElement("div");

    row.forEach(value => {
      const cell = document.createElement("span");
      cell.textContent = value.toFixed(2);
      if (value === 0) {
        cell.style.color = "gray"; // Cor para zeros
      } 
      rowDiv.appendChild(cell);
    });

    resultContainer.appendChild(rowDiv);
  });

  document.getElementById("result").classList.remove("hidden");
}