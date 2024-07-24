import React, { useState, ReactNode } from "react";
import "./Tooltip.scss";

type TooltipProps = {
  children: ReactNode;
  text: string;
};

export const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
  const [visible, setVisible] = useState<boolean>(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <div
      className="tooltip"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {visible && <div className="tooltiptext">{text}</div>}
    </div>
  );
};
