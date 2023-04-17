const addDayBtn = document.querySelector(".add-day");
const removeDayBtn = document.querySelector(".remove-day");
const columnTitle = document.querySelector(".column-title");
const tableRow = document.querySelectorAll(".row");
const totalDays = document.querySelector(".days");
let missedLessons = document.querySelector(".missed-lessons");
let averageMark = document.querySelector(".average-mark");
let averageGrades = document.querySelectorAll(".student-average-grade");
let averageGrade = document.querySelector(".student-average-grade");

let startingDate = new Date(2022, 11, 5);
let increaseBy = 1;
let numDates = 0;

let newColumnOfGrades;
let gradeCell;

function addColumnTitle() {
  while (
    startingDate.getDay() !== 1 &&
    startingDate.getDay() !== 3 &&
    startingDate.getDay() !== 5
  ) {
    startingDate.setDate(startingDate.getDate() + 1);
  }
  const newColumnTitle = document.createElement("th");
  newColumnTitle.textContent = startingDate.toDateString();
  columnTitle.appendChild(newColumnTitle);
  startingDate.setDate(startingDate.getDate() + increaseBy);
  numDates++;
}

function addFullColumn() {
  const newColumnOfGrades = document.createElement("td");
  newColumnOfGrades.textContent = 0;
  newColumnOfGrades.className = "grade-cell";

  for (let i = 0; i < tableRow.length; i++) {
    const gradeCell = tableRow[i];
    gradeCell.appendChild(newColumnOfGrades.cloneNode(true));
  }
  updateResults();
}

addDayBtn.addEventListener("click", () => {
  addColumnTitle();
  addFullColumn();
});

function removeColumnTitle() {
  if (numDates > 0) {
    const lastDate = columnTitle.lastElementChild;
    if (lastDate !== null) {
      columnTitle.removeChild(lastDate);
      startingDate.setDate(startingDate.getDate() - increaseBy);
      numDates--;
    }
    if (numDates === 0) {
      startingDate.setFullYear(2022, 11, 5);
    } else {
      startingDate = new Date(columnTitle.lastElementChild.textContent);
      startingDate.setDate(startingDate.getDate() + 1);
    }
  }
}

removeDayBtn.addEventListener("click", () => {
  removeColumnTitle();
  for (let i = 0; i < tableRow.length; i++) {
    if (tableRow[i].lastElementChild.textContent !== averageGrade.textContent) {
      tableRow[i].lastElementChild.remove();
    }
  }
  updateResults();
});

function changeGradeCell() {
  for (let i = 0; i < tableRow.length; i++) {
    const gradeCell = tableRow[i];
    gradeCell.addEventListener("click", (event) => {
      if (
        !event.target.classList.contains("student-name") &&
        !event.target.classList.contains("student-average-grade")
      ) {
        const enteredGrade = parseInt(
          prompt("Enter a grade", event.target.textContent)
        );
        if (!isNaN(enteredGrade) && enteredGrade >= 0 && enteredGrade <= 10) {
          event.target.textContent = enteredGrade;
          if (enteredGrade !== 0) {
            event.target.classList.add("filled-grade");
          } else {
            event.target.classList.remove("filled-grade");
          }
          updateResults();
        }
      }
    });
  }
}

changeGradeCell();

function updateResults() {
  let row = [];
  let sumOfAverage = 0;
  let numberOfCells = 0;
  for (let i = 0; i < tableRow.length; i++) {
    row.push(tableRow[i].querySelectorAll(".grade-cell"));
  }
  for (let j = 0; j < row.length; j++) {
    let eachColumn = row[j];
    let eachTotal = 0;
    for (let k = 0; k < eachColumn.length; k++) {
      eachTotal += parseInt(eachColumn[k].textContent);
    }
    if (eachColumn.length !== 0) {
      averageGrades[j].textContent = (eachTotal / eachColumn.length).toFixed(2);
      numberOfCells = eachColumn.length * tableRow.length;
    } else {
      averageGrades[j].textContent = "0.00";
    }
    totalDays.textContent = eachColumn.length;
    sumOfAverage += eachTotal / eachColumn.length;
  }
  if (totalDays.textContent !== "0") {
    averageMark.textContent = (sumOfAverage / tableRow.length).toFixed(2);
  } else {
    averageMark.textContent = "0.00";
  }
  missedLessons.textContent =
    numberOfCells - document.querySelectorAll(".filled-grade").length;
}