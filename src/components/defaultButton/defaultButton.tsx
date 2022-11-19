import Button from "@mui/material/Button";
import React from "react";

type Color = "inherit" | "error" | "success" | "secondary" | "primary" | "info" | "warning";
type Variant = "contained" | "outlined" | "text";
type Size = "small" | "medium" | "large";

export type IDefaultButtonProps = {
  autoFocus?: boolean;
  color?: Color;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement> | undefined;
  ref?: React.RefObject<HTMLButtonElement> | ((instance: HTMLButtonElement | null) => void) | null | undefined
  size?: Size;
  style?: React.CSSProperties;
  title: string;
  type?: "submit" | "reset" | "button" | undefined;
  variant?: Variant;
};

const DefaultButton: React.FC<IDefaultButtonProps> = (props) => {
  const { autoFocus, color, disabled, onClick, onKeyDown, ref, size, style, title, type, variant } = props;

  return (
    <Button
      autoFocus={autoFocus}
      color={color}
      disabled={disabled}
      onClick={onClick}
      onKeyDown={onKeyDown}
      ref={ref}
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
