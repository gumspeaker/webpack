import { join } from "lodash-es";
// @ts-ignore
import a from "./style/index.module.scss";
import { createRoot } from "react-dom/client";
import React, { useEffect } from "react";
import { useState } from "react";
import Demo from "./component/Demo";

console.log(a);

const App = () => {
  useEffect(() => {
    console.log(111232);
  }, []);
  return (
    <div className={a.demo}>
      {join(["Hello", "webpack"], " ")}
      <Button></Button>
      <Demo></Demo>
    </div>
  );
};
const Button = () => {
  const [a, setA] = useState(0);
  return <button onClick={() => setA(a + 1)}>{a}</button>;
};
const root = createRoot(document.querySelector("#container")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
