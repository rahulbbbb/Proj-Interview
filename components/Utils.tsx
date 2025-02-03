export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// export const debounce = (func: any, delay: number) => {
//   let timer: ReturnType<typeof setTimeout>;
//   return (...args: any[]) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => func(...args), delay);
//   };
// };
export const debounce = (func) => {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(this, args);
    }, 5);
  };
};


export function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${month}/${day}/${year} ${hours}:${minutes}`;
}

export const trimFileName = (fileName: string) => {
  const extension = fileName?.split(".")[1];
  if (fileName?.length <= 9) {
    return fileName;
  } else {
    return fileName?.substring(0, 9) + `.${extension}`;
  }
};



export function bytesToMB(bytes: number): number {
  return bytes / (1024 * 1024);
}
export const dateFormat = (upcomingDate) => {
  const originalDate = new Date(upcomingDate);
  let formattedDate = `${
    originalDate.getMonth() + 1
  }/${originalDate.getDate()}/${originalDate.getFullYear()}`;

  if (formattedDate.match("NaN")) {
    formattedDate = null;
  }

  return formattedDate ?? "-";
};

export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
};

export const dateFormatWithTime = (dateString) => {
  const originalDate = new Date(dateString);
  const month = originalDate.getMonth() + 1; // getMonth() is zero-based
  const date = originalDate.getDate();
  const year = originalDate.getFullYear().toString(); // Get last two digits of the year
  let hours = originalDate.getHours();
  const minutes = originalDate.getMinutes().toString().padStart(2, "0"); // Pad minutes to two digits
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const formattedDate = `${month.toString().padStart(2, "0")}/${date
    .toString()
    .padStart(2, "0")}/${year}, ${hours}:${minutes} ${ampm}`;
  return formattedDate;
};
