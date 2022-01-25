import React, { useState, useEffect, useRef, useCallback } from "react";
import s from "./Figure.module.css";

export const Figure = ({
  style,
  onDragStart,
  increment,
  decrement,
  coordsOfDrop,
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [isInDropZone, setIsInDropZone] = useState(false);
  const figureEl = useRef(null);

  const onMouseDown = useCallback((event) => {

    setDragging(true);

    setCoords({
      x: figureEl.current.offsetLeft,
      y: figureEl.current.offsetTop,
    });

    figureEl.current.style.position = "absolute";
    figureEl.current.style.zIndex = 1000;
  }, []);

  const onMouseMove = useCallback(
    (event) => {
      if (!dragging) return;
      setCoords({
        x: event.pageX,
        y: event.pageY,
      });
    },
    [dragging]
  );

  const onMouseUp = useCallback(
    (event) => {
      event.stopPropagation();
      const sizeElement = 80;
      const border = 5;
      setDragging(false);
      if (
        event.pageX - border > coordsOfDrop.left &&
        event.pageX + sizeElement + border < coordsOfDrop.right &&
        event.pageY - border > coordsOfDrop.top &&
        event.pageY + sizeElement + border< coordsOfDrop.bottom
      ) {
        if (!isInDropZone) {
          setIsInDropZone(true);
          increment();
        }
        }
      if (
          event.pageX- border < coordsOfDrop.left ||
          event.pageX+border + sizeElement > coordsOfDrop.right ||
          event.pageY-border < coordsOfDrop.top ||
          event.pageY+border + sizeElement > coordsOfDrop.bottom
        ) {
          if (isInDropZone){
            decrement();
          }
          figureEl.current.style.position = "";
          setCoords({
            x: 0,
            y: 0,
          });
          setIsInDropZone(false);
      }
    },
    [coordsOfDrop, decrement, increment, isInDropZone]
  );

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    } else if (!dragging) {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [coords.x, coords.y, dragging, onMouseDown, onMouseMove, onMouseUp]);

  return (
    <div
      className={`${s.figure} ${style}`}
      ref={figureEl}
      onMouseDown={onMouseDown}
      style={{
        left: coords.x + "px",
        top: coords.y + "px",
      }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onDragStart={onDragStart}
    ></div>
  );
};
