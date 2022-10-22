import React, { ReactNode, useCallback, useState } from "react";
import { DefaultButton } from "../defaultButton/defaultButton";
import "./collapse.css";

export type ICollapseProps = {
  appWidth: (size: number) => void
  content: ReactNode;
  label?: string;
};

const Collapse: React.FC<ICollapseProps> = (props) => {
  const { appWidth, content, label } = props;
  const [collapsed, setCollapsed] = useState(true);


  const collapse = useCallback(() => {
    setCollapsed((collapsed) => !collapsed);
    !collapsed ? appWidth(280) : appWidth(600);
  }, [appWidth, collapsed]);


  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "20px" }}>
        <DefaultButton
          onClick={collapse}
          title={
            collapsed ? `\u00AD  ${label}\u00AD ➕ ` : `\u00AD  ${label} \u00a0➖ `
          }
          size="small"
        />
      </div>
      {!collapsed && <>{content}</>}
    </>
  );
};

export { Collapse };
