import React, { useRef, useEffect } from "react";
import s from "./Box.module.css";

export const Box = ({ children, styles, getcoordsofdrop }) => {
  const boxEl = useRef(null)

  useEffect(() => {
    const rect = boxEl.current.getBoundingClientRect();
    getcoordsofdrop(boxEl.current, {left:rect.left, top:rect.top, right: rect.right, bottom:rect.bottom})
  }, []);

  return (
    <div
    className={`${s.box} ${styles}`}
    ref={boxEl}
    >
      {children}
    </div>
  );
};
