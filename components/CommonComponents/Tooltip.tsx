import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

type orientationType = 'right' | 'top' | 'left' | 'bottom' | 'bottom-left';
type arrowType = 'left' | 'right' | 'center';

export interface tooltipInterface {
  children?: React.ReactNode;
  tooltipText?: React.ReactNode;
  orientation?: orientationType;
  renderToolTip?: boolean;
  arrowPosition?: arrowType;
  ContainerClassName?: string;
  PointerClassName?: string;
}

function ToolTip({
  children,
  orientation = 'bottom',
  tooltipText = '',
  renderToolTip = true,
  arrowPosition = 'center',
  PointerClassName = '',
  ContainerClassName = '',
}: tooltipInterface) {
  const tipRef = useRef<HTMLDivElement>(null);
  const [tooltipStyles, setTooltipStyles] = useState<React.CSSProperties>({});
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent) => {
    setShowTooltip(true);
    const target = e.currentTarget as HTMLElement;
    updateTooltipPosition(target);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const updateTooltipPosition = (target: HTMLElement) => {
    if (tipRef.current) {
      const targetRect = target.getBoundingClientRect();
      const tooltipRect = tipRef.current.getBoundingClientRect();
      const newStyles: React.CSSProperties = {};

      switch (orientation) {
        case 'top':
          newStyles.top = targetRect.top - tooltipRect.height - 8 + window.scrollY;
          newStyles.left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2 + window.scrollX;
          break;
        case 'bottom':
          newStyles.top = targetRect.bottom + 8 + window.scrollY;
          newStyles.left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2 + window.scrollX;
          break;
        case 'bottom-left':  // New case for bottom-left positioning
          newStyles.top = targetRect.bottom + 8 + window.scrollY;
          newStyles.left = targetRect.left + window.scrollX;  // Align to the left of the element
          break;
        case 'left':
          newStyles.top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2 + window.scrollY;
          newStyles.left = targetRect.left - tooltipRect.width - 8 + window.scrollX;
          break;
        case 'right':
          newStyles.top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2 + window.scrollY;
          newStyles.left = targetRect.right + 8 + window.scrollX;
          break;
        default:
          break;
      }

      setTooltipStyles(newStyles);
    }
  };

  const setContainerPosition = (orientation: orientationType) => {
    // Your logic to calculate container class names based on orientation and arrowPosition
    return ''; // Replace with actual implementation
  };

  const setPointerPosition = (orientation: orientationType) => {
    // Your logic to calculate pointer class names based on orientation and arrowPosition
    return ''; // Replace with actual implementation
  };

  const classContainer = `absolute z-50 ${setContainerPosition(
    orientation
  )} bg-gray-600 text-white text-xs px-2 py-1 rounded flex items-center transition-all duration-150 pointer-events-none toolTipSmall max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg ${ContainerClassName}`;

  const pointerClasses = `bg-gray-600 h-3 w-3 absolute -z-10 ${setPointerPosition(
    orientation
  )} rotate-45 pointer-events-none`;

  const tooltipContent = (
    <div
      className={classContainer}
      style={{
        ...tooltipStyles,
        opacity: showTooltip ? 1 : 0,
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        position: 'absolute',
      }}
      ref={tipRef}
    >
      <div className={pointerClasses + ' ' + PointerClassName} />
      {tooltipText}
    </div>
  );

  if (typeof tooltipText === 'string' && (!tooltipText || tooltipText?.trim() === '-' || tooltipText?.trim() === '')) {
    return <>{children}</>;
  }

  if (!renderToolTip) return <>{children}</>;

  return (
    <>
      <div className="relative flex items-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
      {/* {ReactDOM.createPortal(tooltipContent, document.body)} */}
    </>
  );
}

export { ToolTip };
