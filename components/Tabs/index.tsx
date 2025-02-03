import clsx from "clsx";
import React, { useEffect, useState } from "react";

type TabProps = {
  label: string | React.ReactNode | React.FC;
  children?: React.ReactNode;
};

const Tab: React.FC<TabProps> = ({ children }) => {
  return <>{children}</>;
};

interface TabsProps {
  orientation?: "vertical" | "horizontal";
  children?: React.ReactNode;
  handleTabs?: (index: number) => void;
  currIndex?: number;
  className?: string;
}

const Tabs = ({
  orientation,
  children,
  handleTabs,
  currIndex = 0,
  className = "",
}: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(currIndex);

  useEffect(() => {
    setActiveIndex(currIndex);
  }, [currIndex]);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    if (handleTabs) {
      handleTabs(index);
    }
  };

  return (
    <div
      className={clsx(
        "flex",
        orientation == "horizontal" ? "flex-col horizontalTab" : "flex-row"
      )}
    >
      <div
        className={clsx(
          "flex items-center",
          orientation == "vertical"
            ? "flex-col min-w-32 divide-y-[1px] border border-[#E1E1E1] rounded-r-1"
            : "flex-row",
          className,
          orientation == "horizontal" ? "gap-x-3" : ""
        )}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return (
              <button
                key={index}
                className={clsx(
                  activeIndex === index
                    ? "relative text-primary-o-600 font-medium active after:bg-primary-o-600"
                    : "relative text-gray-p-450 after:bg-transparent",
                  orientation == "horizontal" &&
                    "px-2 py-1.5 rounded-t-1 horizontalTabInner after:absolute after:left-0 after:-bottom-1 after:rounded-xl after:w-full after:h-1 after:transition-all after:duration-300 ",
                  orientation == "vertical" &&
                    activeIndex === index &&
                    "bg-blue-o-20 text-primary-o-600 font-medium",
                  orientation == "vertical" && "px-4 py-2 w-full"
                )}
                onClick={() => handleTabClick(index)}
              >
                {orientation == "vertical" && activeIndex === index && (
                  <div className="absolute h-full bg-primary-o-600 w-1 left-0 top-0"></div>
                )}
                {(child.props as any).label}
              </button>
            );
          }
        })}
      </div>
      <div>
        {React.Children.map(children, (child, index) => {
          if (index === activeIndex) {
            return child;
          }
        })}
      </div>
    </div>
  );
};

interface TabPanelProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const TabPanel = ({ children, ...rest }: TabPanelProps) => {
  return <section {...rest}>{children}</section>;
};

Tabs.Tab = Tab;
Tabs.TabPanel = TabPanel;

export { Tabs };
