// import swc from "@swc/core";
// import fs from "fs";
// import { resolve } from "path";
// import path from "./path.js";
// const config = fs.readFileSync(resolve(path.appPath, ".swcrc"));
// const configObj = JSON.parse(config);
// swc
//   .transform(resolve(path.appSrc), {
//     // Some options cannot be specified in .swcrc
//     // filename: "input.js",
//     outputPath: resolve(path.appDirectory, "esm"),
//     ...configObj,
//   })
//   .then((output) => {
//     output.code; // transformed code
//     output.map; // source map (in string)
//   });
