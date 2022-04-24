import React from "react";
import { IconButton } from "@mui/material";

export type IiconButtonProps = {
  image: React.ReactNode;
  maxWidth?: number;
  onClick?: <T>(arg: T | undefined) => T | void;
};

const IconBut: React.FC<IiconButtonProps> = (props) => {
  const { image, onClick, maxWidth } = props;
  return (
    <IconButton
      style={{ maxWidth: `${maxWidth || 100}%`, borderRadius: "0" }}
      onClick={onClick}
    >
      <div className="App">{image}</div>
    </IconButton>
  );
};

export { IconBut };
