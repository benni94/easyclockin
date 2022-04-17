import Button from "@mui/material/Button";
import React from "react";

type Color = "error" | "success" | "secondary";
type Variant = "contained" | "outlined" | "text";
type Size = "small" | "medium" | "large";

export type IDefaultButtonProps = {
  color?: Color;
  disabled?: boolean;
  onClick: <T>(arg: T | undefined) => T | void;
  title: string;
  size?: Size;
  type?: Variant;
};

const DefaultButton: React.FC<IDefaultButtonProps> = (props) => {
  const { color, disabled, onClick, title, size, type } = props;

  return (
    <Button
      color={color}
      disabled={disabled}
      onClick={onClick}
      size={size}
      variant={type}
    >
      {title}
    </Button>
  );
};

export { DefaultButton };
