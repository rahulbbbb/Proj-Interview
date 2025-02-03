import React, { useEffect, useState } from "react";

export const ConfirmationModal = ({
  type,
  action,
  hideModal,
  message,
}: any) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none bg-black/60  focus:outline-none">
      <div className="relative w-11/12 md:w-5/12 lg:w-1/3 max-w-[360px] mx-auto my-6">
        <div className="relative flex flex-col w-full bg-white h- border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          <div className="flex flex-col gap-2">
            {/*body*/}
            <div className="relative flex flex-col items-center w-full p-4">
              <div
                className={`${
                  type === "delete"
                    ? "text-xl font-semibold "
                    : "text-center  mb-5 mt-4 text-lg  font-medium"
                }`}
              >
                {type === "success"
                  ? ""
                  : type === "error"
                  ? "Error Message"
                  : type === "update"
                  ? "Update Changes?"
                  : type === "delete"
                  ? "Alert"
                  : type === "cancel"
                  ? "Alert"
                  : type === "deleteMap"
                  ? "Alert"
                  : ""}
              </div>
              <div
                className="flex absolute cursor-pointer justify-end items-end mr-8 w-full mt-0"
                onClick={() => hideModal(true)}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.8146 1.81455L12.1855 12.1854M12.1855 1.81455L1.8146 12.1854"
                    stroke="#111827"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="p-2  mb-3 rounded-full w-fit">
                {type === "error" ? (
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="40" cy="40" r="40" fill="#ED5757" />
                    <path
                      d="M28.6846 28.685L50.3692 50.3696M50.3692 28.685L28.6846 50.3696"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : type === "success" ? (
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="40" cy="40" r="40" fill="#038E60" />
                    <path
                      d="M26.5834 41.916L34.25 49.5827L53.4167 30.416"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : type === "update" ? (
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="40" cy="40" r="40" fill="#D89D08" />
                    <path
                      d="M40 32.5625V41.75"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M55.89 34.0151V45.985C55.89 47.945 54.84 49.7651 53.1425 50.7626L42.7475 56.7651C41.05 57.7451 38.9499 57.7451 37.2349 56.7651L26.8399 50.7626C25.1424 49.7826 24.0924 47.9625 24.0924 45.985V34.0151C24.0924 32.0551 25.1424 30.235 26.8399 29.2375L37.2349 23.235C38.9324 22.255 41.0325 22.255 42.7475 23.235L53.1425 29.2375C54.84 30.235 55.89 32.0376 55.89 34.0151Z"
                      stroke="white"
                      strokeWidth="3.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M40 47.3496V47.5246"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : type === "deleteMap" ? (
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="40" cy="40" r="40" fill="#ED5757" />
                    <path
                      d="M38 50H42V38H38V50ZM40 34C40.5667 34 41.0417 33.8083 41.425 33.425C41.8083 33.0417 42 32.5667 42 32C42 31.4333 41.8083 30.9583 41.425 30.575C41.0417 30.1917 40.5667 30 40 30C39.4333 30 38.9583 30.1917 38.575 30.575C38.1917 30.9583 38 31.4333 38 32C38 32.5667 38.1917 33.0417 38.575 33.425C38.9583 33.8083 39.4333 34 40 34ZM40 60C37.2333 60 34.6333 59.475 32.2 58.425C29.7667 57.375 27.65 55.95 25.85 54.15C24.05 52.35 22.625 50.2333 21.575 47.8C20.525 45.3667 20 42.7667 20 40C20 37.2333 20.525 34.6333 21.575 32.2C22.625 29.7667 24.05 27.65 25.85 25.85C27.65 24.05 29.7667 22.625 32.2 21.575C34.6333 20.525 37.2333 20 40 20C42.7667 20 45.3667 20.525 47.8 21.575C50.2333 22.625 52.35 24.05 54.15 25.85C55.95 27.65 57.375 29.7667 58.425 32.2C59.475 34.6333 60 37.2333 60 40C60 42.7667 59.475 45.3667 58.425 47.8C57.375 50.2333 55.95 52.35 54.15 54.15C52.35 55.95 50.2333 57.375 47.8 58.425C45.3667 59.475 42.7667 60 40 60ZM40 56C44.4667 56 48.25 54.45 51.35 51.35C54.45 48.25 56 44.4667 56 40C56 35.5333 54.45 31.75 51.35 28.65C48.25 25.55 44.4667 24 40 24C35.5333 24 31.75 25.55 28.65 28.65C25.55 31.75 24 35.5333 24 40C24 44.4667 25.55 48.25 28.65 51.35C31.75 54.45 35.5333 56 40 56Z"
                      fill="white"
                    />
                  </svg>
                ) : type === "delete" ? (
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="40" cy="40" r="40" fill="#ED5757" />
                    <path
                      d="M55.75 29.4648C49.9225 28.8873 44.06 28.5898 38.215 28.5898C34.75 28.5898 31.285 28.7648 27.82 29.1148L24.25 29.4648"
                      stroke="white"
                      strokeWidth="3.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M33.875 27.6975L34.26 25.405C34.54 23.7425 34.75 22.5 37.7075 22.5H42.2925C45.25 22.5 45.4775 23.8125 45.74 25.4225L46.125 27.6975"
                      stroke="white"
                      strokeWidth="3.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M51.9875 34.9941L50.85 52.6166C50.6575 55.3641 50.5 57.4991 45.6175 57.4991H34.3825C29.5 57.4991 29.3425 55.3641 29.15 52.6166L28.0125 34.9941"
                      stroke="white"
                      strokeWidth="3.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M37.0774 47.875H42.9049"
                      stroke="white"
                      strokeWidth="3.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M35.625 40.875H44.375"
                      stroke="white"
                      strokeWidth="3.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : type === "cancel" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                  >
                    <circle cx="40" cy="40" r="40" fill="#ED5757" />
                    <path
                      d="M25.395 56.535C24.5859 57.3441 23.2741 57.3441 22.465 56.535C21.6559 55.7259 21.6559 54.4141 22.465 53.605L36.57 39.5L22.465 25.395C21.6559 24.5859 21.6559 23.2741 22.465 22.465C23.2741 21.6559 24.5859 21.6559 25.395 22.465L39.5 36.57L53.605 22.465C54.4141 21.6559 55.7259 21.6559 56.535 22.465C57.3441 23.2741 57.3441 24.5859 56.535 25.395L42.43 39.5L56.535 53.605C57.3441 54.4141 57.3441 55.7259 56.535 56.535C55.7259 57.3441 54.4141 57.3441 53.605 56.535L39.5 42.43L25.395 56.535Z"
                      fill="white"
                    />
                  </svg>
                ) : (
                  ""
                )}
              </div>
              {type === "deleteMap" && !message && (
                <p className="pb-4 text-lg font-medium">Action not possible</p>
              )}

              {type === "success" ? (
                <p className="-mt-2 mb-3  text-center text-lg font-semibold text-black-b-300">
                  {message}
                </p>
              ) : (
                <p className="mt-2  text-center text-gray-o-480">{message}</p>
              )}
            </div>
            <div>
              {type === "deleteMap" ? (
                <div className="grid gap-4 grid-cols-1 justify-center items-center mb-4">
                  <button
                    className={`w-20 px-2 py-2 bg-status-danger-800 rounded-lg font-medium text-gray-100 drop-shadow-sm shadow-sm-light shadow-gray-o-460/20 mx-auto`}
                    onClick={() => hideModal(true)}
                  >
                    {type === "deleteMap" ? "Ok" : ""}
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 border-t-2 py-3">
                  <div>
                    {type !== "success" && type !== "error" && (
                      <button
                        className={`px-14 py-2 rounded-lg font-medium text-black bg-gray-o-250 drop-shadow-sm shadow-sm-light `}
                        onClick={() => hideModal(true)}
                      >
                        {/* Cancel */}
                        {type === "update" ? "No" : ""}
                        {type === "cancel" ? "No" : ""}
                        {type === "delete" ? "No" : ""}
                      </button>
                    )}
                  </div>
                  <div>
                    {type !== "success" && type !== "error" && (
                      <button
                        className={`${
                          type === "delete" || type === "cancel"
                            ? "bg-status-danger-800"
                            : ""
                        } px-14 py-2 rounded-lg bg-primary-o-600 hover:shadow-lg active:bg-emerald-600  text-white drop-shadow-sm shadow-sm-light shadow-status-danger-800/20 `}
                        onClick={action}
                      >
                        {type === "cancel" ? "Yes " : ""}
                        {type === "delete" ? "Yes " : ""}
                        {type === "update" ? "Yes" : ""}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type DeleteFunction = (deleteID: string) => any;
interface Response {
  error: boolean;
  success: boolean;
  message?: string;
  statusCode?: number;
}
interface DeleteResponse {
  deleteModal: boolean;
  setDeleteModal: (deleteModal: boolean) => void;
  setDeleteID: (deleteId: string) => void;
  response: Response;
  handleDelete: () => void;
}

export const useApiStatus = (apiStatus: any, data: any, apiStatus2?: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAddSuccess, setIsAddSuccess] = useState(false);
  const [isEditSuccess, setIsEditSuccess] = useState(false);

  useEffect(() => {
    if (
      (apiStatus && apiStatus.statusCode) ||
      (apiStatus2 && apiStatus2.statusCode)
    ) {
      setIsLoading(false);
      if (data === "") {
        setIsAddSuccess(true);
      } else {
        setIsEditSuccess(true);
      }
    }
  }, [apiStatus, apiStatus2, data]);

  return {
    isLoading,
    isAddSuccess,
    isEditSuccess,
    setIsLoading,
  };
};
