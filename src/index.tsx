import _ from "lodash-es";
import React from "react";
// @ts-ignore
import a from "./style/index.module.scss";
import { createRoot } from "react-dom/client";
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
  return <div>121213</div>;
};
const root = createRoot(document.querySelector("#container"));
root.render(<App />);
