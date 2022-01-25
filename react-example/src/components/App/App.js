import React, { useState } from "react";
import s from "./App.module.css";
import { Title } from "../Title/Title";
import { Counter } from "../Counter/Counter";
import { Container } from "../Container/Container";
import { Box } from "../Box/Box";
import { Figure } from "../Figure/Figure";

const elements = [
  {
    id: "square",
    class: "square",
  },
  {
    id: "circle",
    class: "circle",
  }
];

function App() {
  const [counter, setCounter] = useState(0);
  const [coordsOfDrop, setCoordsOfDrop] = useState({left:0, top:0, right: 0, bottom: 0});

  const getCoordsOfDrop = (boxEl, coords)=>{

    if(boxEl.className.includes('dropZone')){
      setCoordsOfDrop(coords)
    }
  }

  const increment = ()=>{
    setCounter(counter => counter+=1)
  }
  const decrement = ()=>{
    if(counter === 0) return
    setCounter(counter => counter-=1)
  }

   const onDragStart=(e)=>{
    e.preventDefault()
  }

  return (
    <div className="App">
      <Title title={"Фигур в зоне перетаскивания: "}>
        <Counter count={counter}></Counter>
      </Title>
      <Container>
        <Box
        styles={s.dropZone}
        getcoordsofdrop={getCoordsOfDrop}
        ></Box>
        <Box styles={s.zoneOfDragElements} getcoordsofdrop={getCoordsOfDrop}>
          {elements.map((el) => (
            <Figure
              key={el.id}
              style={s[el.class]}
              increment={increment}
              decrement={decrement}
              coordsOfDrop={coordsOfDrop}
              onDragStart={onDragStart}
            ></Figure>
          ))}
        </Box>
      </Container>
    </div>
  );
}

export default App;
