import { join } from "lodash-es";
import React from "react";
// @ts-ignore
import a from "./style/index.module.scss";
import { createRoot } from "react-dom/client";
import { useEffect } from "react";
import { useState } from "react";
// import "./style/index.css";
// function component() {
//   const element = document.createElement("div");

//   // lodash（目前通过一个 script 引入）对于执行这一行是必需的
//   // lodash 在当前 script 中使用 import 引入
//   element.innerHTML = _.join(["Hello", "webpack"], " ");
//   // console.log(style);
//   element.className = "demo";
//   return element;
// }

console.log(a);

const App = () => {
  useEffect(() => {
    console.log(111232);
  }, []);
  return (
    <div className={a.demo}>
      {join(["Hello", "webpack"], " ")}
      <Button></Button>
    </div>
  );
};
const Button = () => {
  const [a, setA] = useState(0);
  return <button onClick={() => setA(a + 1)}>{a}</button>;
};
const root = createRoot(document.querySelector("#container")!);
root.render(<App />);
