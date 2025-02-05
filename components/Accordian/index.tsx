import clsx from "clsx";
import { ReactNode, useEffect, useRef, useState } from "react";

interface AccordionInterface {
    title: string;
    children?: ReactNode;
    className?: string;
}

const Accordion = ({
    title,
    className,
    children
}: AccordionInterface) => {

    const [active, setActive] = useState(false);
    const [height, setHeight] = useState<number | null>(null);
    const [rotate, setRotate] = useState("");

    const contentSpace = useRef<any>(null);

    useEffect(() => {
        if (contentSpace.current) {
            setHeight(active ? contentSpace?.current?.scrollHeight : 0);
        }
    }, [active]);

    const toggleAccordion = () => {
        setActive((prevActive) => !prevActive);
        setRotate((prevRotate) =>
            prevRotate.includes("rotate-180")
                ? "transform duration-700 ease "
                : "transform duration-700 ease rotate-180"
        );
    };

    useEffect(() => {
        setActive(false);
        setHeight(0);
        setRotate("rotate-180");
    }, []);

    return (
        <div className={clsx("border-b border-gray-100", className)}>
            <div className="flex items-center justify-between">
                <button
                    className=" py-3  box-border rounded-lg cursor-pointer focus:outline-none flex items-center justify-between"
                    onClick={toggleAccordion}
                >
                    <span className={`${rotate} inline-block text-gray-400 mr-2`}>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="vuesax/linear/arrow-down">
                                <g id="arrow-down">
                                    <path
                                        id="Vector"
                                        d="M13.28 5.9668L8.9333 10.3135C8.41997 10.8268 7.57997 10.8268 7.06664 10.3135L2.71997 5.9668"
                                        stroke="#1C2033"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </g>
                            </g>
                        </svg>
                    </span>

                    <p
                        className="text-sm font-medium "
                    // style={{
                    //     color:
                    //         apiData.name === "Active"
                    //             ? "green"
                    //             : apiData.name === "Inactive"
                    //                 ? "gray"
                    //                 : "rgba(28, 32, 51, 1)",
                    // }}
                    >
                        {title}
                    </p>
                </button>
            </div>

            <div
                ref={contentSpace}
                style={{ maxHeight: `${height}px` }}
                className="overflow-hidden transition-max-height duration-700 ease-in-out"
            >
                <div className=" py-2 mb-2  overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export { Accordion };