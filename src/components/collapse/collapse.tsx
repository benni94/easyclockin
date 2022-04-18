import React, { Fragment, ReactNode, useState } from "react";
import { DefaultButton } from "../defaultButton/defaultButton";
import "./collapse.css";

export type ICollapseProps = {
  content: ReactNode;
};

const Collapse: React.FC<ICollapseProps> = (props) => {
  const { content } = props;
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div>
      <DefaultButton
        onClick={() => setCollapsed((collapsed) => !collapsed)}
        title={collapsed ? "➕" : "➖"}
        size="small"
      />
      {!collapsed && <Fragment>{content}</Fragment>}
    </div>
  );
};

export { Collapse };
