import { TextField as MuiTextField, TextFieldProps } from "@mui/material";
import React from "react";

type CombinedTextFieldProps = TextFieldProps & { width?: number };

export const Input = React.forwardRef<HTMLDivElement, CombinedTextFieldProps>((props, ref) => {
  return <MuiTextField fullWidth style={{ width: props.width + "px" }} inputRef={ref} {...props} />;
});
