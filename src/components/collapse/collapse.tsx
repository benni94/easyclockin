import { Button } from "@mui/material";
import React, { ReactNode, useCallback, useState } from "react";
import { CSSProperties } from "react";
import "./collapse.css";

export type ICollapseProps = {
  appWidth: (size: number) => void;
  defaultClosed?: boolean;
  collapsedIcon: React.ReactNode;
  content: ReactNode;
  collapsedWidth: number;
  labelOpen?: string;
  labelCollapsed: string;
  openIcon: React.ReactNode;
  openWidth: number;
  style?: CSSProperties;
};

const Collapse: React.FC<ICollapseProps> = (props) => {
  const { appWidth, defaultClosed = true, collapsedIcon, content, collapsedWidth, labelCollapsed, labelOpen, openIcon, openWidth, style } = props;
  const [collapsed, setCollapsed] = useState(defaultClosed);

  const collapse = useCallback(() => {
    setCollapsed((collapsed) => !collapsed);
    !collapsed ? appWidth(collapsedWidth) : appWidth(openWidth);
  }, [appWidth, collapsed, collapsedWidth, openWidth]);

  return (
    <div style={style}>
      <div className="collapseWrapper">
        <Button
          startIcon={collapsed ? collapsedIcon : openIcon}
          onClick={collapse}
          style={{ textTransform: "initial" }}
          title={
            collapsed ? `\u00AD  ${labelCollapsed}` : `\u00AD  ${labelOpen}`
          }
          size="small"
        >
          {collapsed ? labelCollapsed : labelOpen}
        </Button>
      </div>
      {!collapsed && <>{content}</>}
    </div>
  );
};

export { Collapse };
