import { NoData } from "../Icons";

export interface ndf {
    message?: string;
    headermessage?: string;
}

const NoDataFound = ({ message, headermessage }: ndf) => {
    return (
        <div className="flex justify-center items-center flex-col  ">
            <span className="pt-8">
                <NoData />
            </span>

            <div className="text-black text-center font-bold text-xl pl-2 mt-2">
                {headermessage}
            </div>

            <div className="text-sm text-center font-medium text-gray-500 pb-5 pl-2">{message}</div>
        </div>
    );
};

export { NoDataFound };


