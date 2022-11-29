import _ from "lodash-es";
import style from "./style/index.scss";
function component() {
  const element = document.createElement("div");

  // lodash（目前通过一个 script 引入）对于执行这一行是必需的
  // lodash 在当前 script 中使用 import 引入
  element.innerHTML = _.join(["Hello", "webpack"], " ");
  console.log(style);
  element.className = style.demo;
  return element;
}
document.body.appendChild(component());
