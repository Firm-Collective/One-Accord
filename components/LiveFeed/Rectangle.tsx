import React, { ReactNode } from "react";
import { Label } from "./Label";

interface Props {
  children: ReactNode;
}

const Rectangle = ({ children }: Props): JSX.Element => {
  return (
    <div className="w-[393px] h-[48px] bg-white relative">
      <Label /> {/* Render the Label component */}
      {children}
    </div>
  );
};

export default Rectangle;

