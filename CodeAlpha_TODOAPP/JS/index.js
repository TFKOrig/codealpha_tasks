const inputBox = document.getElementById("input-box");
const button = document.querySelector("button");
const list = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    list.appendChild(li);
    inputBox.value = "";
    let span = document.createElement("span");
    span.innerHTML = "x";
    li.appendChild(span);
    li.setAttribute("draggable", true);
    addDragEventListeners(li);
  }
  saveData();
}

function addDragEventListeners(element) {
  element.addEventListener("dragstart", handleDragStart);
  element.addEventListener("dragenter", handleDragEnter);
  element.addEventListener("dragover", handleDragOver);
  element.addEventListener("dragleave", handleDragLeave);
  element.addEventListener("drop", handleDrop);
  element.addEventListener("dragend", handleDragEnd);
}

function handleDragStart(e) {
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", null);
  this.classList.add("dragged");
}

function handleDragEnter(e) {
  e.preventDefault();

  this.classList.add("drag-enter");
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDragLeave() {
  this.classList.remove("drag-enter");
}

function handleDrop(e) {
  e.preventDefault();

  const dragEnterElements = document.querySelectorAll(".drag-enter");
  dragEnterElements.forEach((element) =>
    element.classList.remove("drag-enter")
  );

  const draggedElement = document.querySelector(".dragged");
  const dropTarget = this;

  const parent = dropTarget.parentNode;
  const dropIndex = Array.from(parent.children).indexOf(dropTarget);
  const draggedIndex = Array.from(parent.children).indexOf(draggedElement);

  parent.insertBefore(draggedElement, dropTarget);

  draggedElement.classList.remove("dragged");

  saveData();
}

function handleDragEnd() {
  const dragEnterElements = document.querySelectorAll(".drag-enter");
  dragEnterElements.forEach((element) =>
    element.classList.remove("drag-enter")
  );

  const draggedElements = document.querySelectorAll(".dragged");
  draggedElements.forEach((element) => element.classList.remove("dragged"));
}

list.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
});

button.addEventListener("click", addTask);

function saveData() {
  localStorage.setItem("data", list.innerHTML);
}

function showTask() {
  const savedData = localStorage.getItem("data");
  if (savedData) {
    list.innerHTML = savedData;
    const listItems = list.querySelectorAll("li");
    listItems.forEach((item) => addDragEventListeners(item));
  }
}

window.addEventListener("load", showTask);
