import { Button } from "@mui/material";
import React, { ReactNode, useCallback, useState } from "react";
import "./collapse.css";

export type ICollapseProps = {
  appWidth: (size: number) => void
  collapsedIcon: React.ReactNode;
  content: ReactNode;
  collapsedWidth: number;
  labelOpen?: string;
  labelCollapsed: string;
  openIcon: React.ReactNode;
  openWidth: number;
};

const Collapse: React.FC<ICollapseProps> = (props) => {
  const { appWidth, collapsedIcon, content, collapsedWidth, labelCollapsed, labelOpen, openIcon, openWidth } = props;
  const [collapsed, setCollapsed] = useState(true);


  const collapse = useCallback(() => {
    setCollapsed((collapsed) => !collapsed);
    !collapsed ? appWidth(collapsedWidth) : appWidth(openWidth);
  }, [appWidth, collapsed, collapsedWidth, openWidth]);


  return (
    <>
      <div className="collapseWrapper">
        <Button
          startIcon={collapsed ? collapsedIcon : openIcon}
          onClick={collapse}
          title={
            collapsed ? `\u00AD  ${labelCollapsed}` : `\u00AD  ${labelOpen}`
          }
          size="small"
        >
          {collapsed ? labelCollapsed : labelOpen}
        </Button>
      </div>
      {!collapsed && <>{content}</>}
    </>
  );
};

export { Collapse };
