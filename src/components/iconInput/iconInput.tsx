import { Divider, InputBase, Paper } from "@mui/material";
import React from "react";
import { IconBut } from "../iconButton/iconBut";
import { Input } from "../Input/input";
import CursorSvg from "../svg/cursor";

export type IIconInputProps = {
  placeholder?: string;
  type?: "password";
  input?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: <T>(arg: T | undefined) => T | void;
};

const IconInput: React.FC<IIconInputProps> = (props) => {
  const { input, onClick, placeholder, type } = props;
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        boxShadow: "none",
        justifyContent: "center",
      }}
    >
      <Input
        label={placeholder || ""}
        variant="standard"
        size="small"
        type={type}
        input={input}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconBut maxWidth={15} image={<CursorSvg />} onClick={onClick} />
    </Paper>
  );
};

export { IconInput };
