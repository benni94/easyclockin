import React, { Fragment, ReactNode, useState } from "react";
import { DefaultButton } from "../defaultButton/defaultButton";
import "./collapse.css";

export type ICollapseProps = {
  content: ReactNode;
  label?: string;
};

const Collapse: React.FC<ICollapseProps> = (props) => {
  const { content, label } = props;
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div>
      <DefaultButton
        onClick={() => setCollapsed((collapsed) => !collapsed)}
        title={
          collapsed ? `\u00AD ➕ \u00AD ${label}` : `\u00AD ➖ \u00a0 ${label}`
        }
        size="small"
      />
      {!collapsed && <Fragment>{content}</Fragment>}
    </div>
  );
};

export { Collapse };
