import { TextField } from "@mui/material";
import React from "react";

type Variant = "filled" | "outlined" | "standard";
type Type = "password";
type Size = "small";

export type IInputProps = {
  label: string;
  input?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  marginTop?: string;
  size?: Size;
  type?: Type;
  variant: Variant;
};

const Input: React.FC<IInputProps> = (props) => {
  const { input, label, marginTop, size, type, variant } = props;

  const handleTextInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (input) input(event);
  };

  return (
    <div style={{ marginTop: marginTop }}>
      <TextField
        onChange={handleTextInputChange}
        label={label}
        size={size}
        type={type}
        variant={variant}
      />
    </div>
  );
};

export { Input };
