const counterEl = document.getElementById("counter");
const boxEl = document.getElementById("box-of-elements");
const dropEl = document.getElementById("drop-zone");

const elements = [
  {
    id: "square",
    class: "square",
  },
  {
    id: "circle",
    class: "circle",
  },
];

let currentDroppable = null;
let counterValue = 0;

function onDragStart(event) {
  return false;
}

function onIncrement() {
  counterValue += 1;
  counterEl.textContent = counterValue;
}

function onDecrement() {
  counterValue -= 1;
  counterEl.textContent = counterValue;
}

function enterDroppable() {
  onIncrement()
  currentDroppable = null
}

function leaveDroppable() {
  if(counterValue === 0) return
  onDecrement()
  currentDroppable = null
}

function createDragElements(array) {
  array.map((el) => {
    const divEl = document.createElement("div");
    divEl.classList.add(el.class);
    divEl.setAttribute("id", el.id);
    divEl.setAttribute("ondragstart", "onDragStart(event)");
    divEl.setAttribute("data-place", null);

    boxEl.appendChild(divEl);

    divEl.onmousedown = function (event) {
      let shiftX = event.clientX - divEl.getBoundingClientRect().left;
      let shiftY = event.clientY - divEl.getBoundingClientRect().top;
      moveAt(event.pageX, event.pageY);

      function moveAt(pageX, pageY) {
        divEl.style.left = pageX - shiftX + "px";
        divEl.style.top = pageY - shiftY + "px";
      }

      function onMouseMove(event) {
        divEl.style.position = "absolute";
        divEl.style.zIndex = 1000;
        moveAt(event.pageX, event.pageY);
      }

      document.addEventListener("mousemove", onMouseMove);

      divEl.onmouseup = function (event) {
        divEl.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        divEl.hidden = false;

        if (!elemBelow) return;

        let droppableBelow = elemBelow.closest(".drop-zone");

        if (currentDroppable === null) {
                if (!droppableBelow) {
                  if(divEl.dataset.place !== 'null'){

                    leaveDroppable()
                  }
                  divEl.dataset.place = null
                }
                currentDroppable = droppableBelow;
                if (currentDroppable) {
                  if(divEl.dataset.place === 'null') {
                    divEl.dataset.place = droppableBelow?.id;
                    enterDroppable()
                  }

                  if(divEl.dataset.place === 'drop-zone'){
                    currentDroppable = null
                  }
                }
              }

        const padding = 5;
        const widthElement = 80;
        if (
          event.clientX > dropEl.getBoundingClientRect().right - padding ||
          event.clientX < dropEl.getBoundingClientRect().left - padding ||
          event.clientY < dropEl.getBoundingClientRect().top - padding ||
          event.clientY > dropEl.getBoundingClientRect().bottom - padding ||
          event.pageX - shiftX < dropEl.getBoundingClientRect().left + padding ||
          event.pageY - shiftY < dropEl.getBoundingClientRect().top + padding ||
          event.pageX - shiftX > dropEl.getBoundingClientRect().right - (padding + widthElement) ||
          event.pageY - shiftY > dropEl.getBoundingClientRect().bottom - (padding + widthElement)
        ) {
          divEl.style.position = "";
        }

        document.removeEventListener("mousemove", onMouseMove);
        divEl.onmouseup = null;
      };
    };
  });
}

createDragElements(elements);



