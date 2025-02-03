import React, { useState, useEffect } from "react";

interface FormBodyProps {
  children: React.ReactNode;
  footerHeight?: number;
  stepperHeight?: number;
}
const css = `.react-select__control {
  border-radius: 6px !important;
  border-color: #eaeaea !important;
  height: 36px !important;
}
.react-select__placeholder{
  color: rgb(64, 74, 95) !important;
}
.react-select__indicator-separator {
  display: none !important;
}
.react-select__input-container input {
  height: auto !important;
  --tw-ring-shadow: none;
}
`;

const FormBody: React.FC<FormBodyProps> = ({
  children,
  footerHeight,
  stepperHeight = 0,
}) => {
  const [bodyHeight, setBodyHeight] = useState("100vh");
  const [formFooterPadding, setformFooterPadding] = useState("30px");

  useEffect(() => {
    setBodyHeight(`calc(100vh - ${footerHeight}px)`);
    setformFooterPadding(`${footerHeight + stepperHeight + 30}px`);
  }, [footerHeight]);

  return (
    <>
      <style>{css}</style>
      <div
        className="overflow-y-auto p-6 md:p-8"
        style={{ height: bodyHeight, paddingBottom: formFooterPadding }}
      >
        <div className="flex flex-col gap-4">{children}</div>
      </div>
    </>
  );
};

export default FormBody;
