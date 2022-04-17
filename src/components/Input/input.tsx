import { TextField } from "@mui/material";
import React from "react";

type Variant = "filled" | "outlined" | "standard";
type Type = "password";
type Size = "small";

export type IInputProps = {
  label: string;
  size?: Size;
  type?: Type;
  variant: Variant;
  marginTop?: string;
};

const Input: React.FC<IInputProps> = (props) => {
  const { label, marginTop, size, type, variant } = props;

  return (
    <div style={{ marginTop: marginTop }}>
      <TextField label={label} size={size} type={type} variant={variant} />
    </div>
  );
};

export { Input };
