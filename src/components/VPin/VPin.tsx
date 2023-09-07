import React from "react";
import { VPin as VPinProps } from "../../types/pin";
import "./VPin.scss";

export default function VPin({
  children,
  items,
  itemsSpacing = "1rem",
  contentGap = "2rem",
  topGap = "6.25rem",
  ...props
}: VPinProps) {
  return (
    <div className="spark-vpin" style={{ gap: contentGap }} {...props}>
      <div className="spark-vpin__pin" style={{ top: topGap }}>
        {children}
      </div>
      <div className="spark-vpin__items" style={{ gap: itemsSpacing }}>
        {items}
      </div>
    </div>
  );
}
