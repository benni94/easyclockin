import Button from "@mui/material/Button";
import React from "react";

type Color = "inherit" | "error" | "success" | "secondary" | "primary" | "info" | "warning";
type Variant = "contained" | "outlined" | "text";
type Size = "small" | "medium" | "large";

export type IDefaultButtonProps = {
  color?: Color;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  title: string;
  type?: "submit" | "reset" | "button" | undefined;
  size?: Size;
  style?: React.CSSProperties;
  variant?: Variant;
};

const DefaultButton: React.FC<IDefaultButtonProps> = (props) => {
  const { color, disabled, onClick, title, type, size, style, variant } = props;

  return (
    <Button
      color={color}
      disabled={disabled}
      onClick={onClick}
      size={size}
      style={style}
      type={type}
      variant={variant}
    >
      {title}
    </Button>
  );
};

export { DefaultButton };
