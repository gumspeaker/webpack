import { FC } from "react";
import demo from "./assert/demo.svg";
interface props {
  demo: string;
}
const Button: FC<props> = () => {
  return (
    <div>
      <img src={demo} alt="" />
    </div>
  );
};
export default Button;
