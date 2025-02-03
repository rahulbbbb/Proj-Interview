import React, { useEffect, useRef } from "react";

interface FormFooterProps {
  children: React.ReactNode;
  onHeightChange: (height: number) => void;
}

const FormFooter: React.FC<FormFooterProps> = ({
  children,
  onHeightChange,
}) => {
  const footerRef = useRef<HTMLDivElement>(null);

  const updateFooterHeight = () => {
    if (footerRef.current) {
      onHeightChange(footerRef.current.clientHeight);
    }
  };

  useEffect(() => {
    updateFooterHeight();
    window.addEventListener("resize", updateFooterHeight);
    return () => {
      window.removeEventListener("resize", updateFooterHeight);
    };
  }, [onHeightChange]);

  return (
    <div
      ref={footerRef}
      className="fixed md:absolute bottom-0 right-0 w-full bg-gray-p-150 z-20"
    >
      <div className="flex items-center justify-end py-2 mxl:py-4 px-6 md:px-8 border-t border-gray-p-350 h-full gap-3">
        {children}
      </div>
    </div>
  );
};

export default FormFooter;
