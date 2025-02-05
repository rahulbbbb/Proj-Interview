import { useEffect } from "react";

export default function AdminSuccess({ message, hideModal, responseCode }:any) {
 
  useEffect(() => {

  setTimeout(() => {
  hideModal(false);
  }, 2000);
  }, []);
  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none bg-black/60 focus:outline-none"
        onClick={() => hideModal(true)}
      >
        <div className="relative w-11/12 md:w-5/12 lg:w-1/3 max-w-[360px] mx-auto my-6">
          <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            <div className="flex flex-col gap-2">
              {/*body*/}
              <div className="relative flex flex-col items-center w-full p-6">
                <div className="text-center  mb-5 mt-4 text-3xl font-medium">
                  {responseCode === 200 ? "Success" : "Error"}
                </div>
                <div className="p-4  mb-3 rounded-full w-fit">
                  {responseCode === 200 ? (
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
                  ) : (
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
                  )}
                </div>
                <p className="mt-1 mb-3 font-semibold text-center text-slate-800">
                  {message}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const  LoadingSpinner = () => {
  return (
    <svg
      aria-hidden="true"
      role="status"
      className="inline w-6 h-6 text-primary-o-600 animate-spin"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="#E5E7EB"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentColor"
      />
    </svg>
  );
};
