import React, { ReactNode, useCallback, useState } from "react";
import { DefaultButton } from "../defaultButton/defaultButton";
import "./collapse.css";

export type ICollapseProps = {
  appWidth: (size: number) => void
  content: ReactNode;
  labelOpen?: string;
  labelCollapsed: string;
  collapsedWidth: number;
  openWidth: number;
};

const Collapse: React.FC<ICollapseProps> = (props) => {
  const { appWidth, content, labelCollapsed, labelOpen, collapsedWidth, openWidth } = props;
  const [collapsed, setCollapsed] = useState(true);


  const collapse = useCallback(() => {
    setCollapsed((collapsed) => !collapsed);
    !collapsed ? appWidth(collapsedWidth) : appWidth(openWidth);
  }, [appWidth, collapsed, collapsedWidth, openWidth]);


  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "20px" }}>
        <DefaultButton
          onClick={collapse}
          title={
            collapsed ? `\u00AD  ${labelCollapsed}` : `\u00AD  ${labelOpen}`
          }
          size="small"
        />
      </div>
      {!collapsed && <>{content}</>}
    </>
  );
};

export { Collapse };
