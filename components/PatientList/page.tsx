"use client";

import React, { useEffect, useState } from "react";
import { Table } from "@/components/Table";
import { MdCalendarMonth } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import AddPatient from "../AddPatient/AddPatient";
import DRCard from "@/components/DRCard/page";
import ViewDetail from "../ViewDetail/viewDetail";

const PatientList = () => {
  const [date, setDate] = useState({ startDate: "", endDate: "" });
  const [popMenu, setpopMenu] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const startDate = date.startDate;
  const endDate = date.endDate;
  const [addPatient, setAddPatient] = useState<boolean>(false);
  const [patientData, setPatientData] = useState([]);
  const [rowData, setRowData] = useState({});
  const [scheduled, setScheduled] = useState<boolean>(false);

  useEffect(() => {
    const storedData = localStorage.getItem("patientData");
    if (storedData) {
      setPatientData(JSON.parse(storedData));
    }
  }, []);

  // const columns = React.useMemo(
  //   () => [
  //     {
  //       header: "Patient Name",
  //       accessorKey: "name",
  //     },
  //     {
  //       header: "Mob Number",
  //       accessorKey: "mobileNumber",
  //     },
  //     {
  //       header: "whatsapp Number",
  //       accessorKey: "wpNumber",
  //     },
  //     {
  //       header: "E-mail",
  //       accessorKey: "email",
  //     },
  //     {
  //       header: "Address",
  //       accessorKey: "address",
  //       cell: ({ row }) => {
  //         const address = row.getValue("address");
  //         return (
  //           <div
  //             className="truncate max-w-[120px] cursor-pointer"
  //             title={address} 
  //           >
  //             {address.length > 10 ? address.slice(0, 10) + "..." : address}
  //           </div>
  //         );
  //       },
  //     },
      
  //     {
  //       header: "Assigned Doctor",
  //       accessorKey: "doctorName",
  //       cell: ({ getValue }) => (
  //         <span className="text-primary-o-370">{getValue() || "-"}</span>
  //       ),
  //     },
  //     {
  //       header: "Date & Time",
  //       accessorKey: "appointmentDateTime",
  //       cell: ({ row }) => {
  //         return row.original.sessionDate
  //           ? `${row.original.sessionDate} ${row.original.sessionTime}`
  //           : "-";
  //       },
  //     },      {
  //       header: "",
  //       accessorKey: "numberOfPages",
  //       cell: ({ row }) => {
  //         const handleSummary = () => {
  //           setRowData(row.original);
  //         };

  //         const [viewTooltipVisible, setViewTooltipVisible] = useState(false);
  //         const [calendarTooltipVisible, setCalendarTooltipVisible] =
  //           useState(false);

  //         return (
  //           <div className="flex justify-center items-center">
  //             {row.original.status === "Pending" ? (
  //               <div
  //                 className="relative cursor-pointer"
  //                 onMouseEnter={() => setCalendarTooltipVisible(true)}
  //                 onMouseLeave={() => setCalendarTooltipVisible(false)}
  //               >
  //                 <MdCalendarMonth
  //                   style={{ fontSize: "22px" }}
  //                   onClick={() => {
  //                     handleSummary();
  //                     setScheduled(true);
  //                   }}
  //                 />
  //                 {calendarTooltipVisible && (
  //                   <div className="absolute z-20 bg-gray-600 text-white text-xs px-2 py-1 rounded-md shadow-lg bottom-8 left-1/2 transform -translate-x-1/2">
  //                     Schedule
  //                   </div>
  //                 )}
  //               </div>
  //             ) : (
  //               <div
  //                 className="relative cursor-pointer"
  //                 onMouseEnter={() => setViewTooltipVisible(true)}
  //                 onMouseLeave={() => setViewTooltipVisible(false)}
  //               >
  //                 <MdOutlineRemoveRedEye
  //                   style={{ fontSize: "22px" }}
  //                   onClick={() => {
  //                     handleSummary();
  //                     setView(true);
  //                   }}
  //                 />
  //                 {viewTooltipVisible && (
  //                   <div className="absolute z-20 bg-gray-600 text-white text-xs px-2 py-1 rounded-md shadow-lg bottom-8 left-1/2 transform -translate-x-1/2">
  //                     View
  //                   </div>
  //                 )}
  //               </div>
  //             )}
  //           </div>
  //         );
  //       },
  //     },
  //     {
  //       header: "Status",
  //       accessorKey: "status",
  //       enableSorting: false,
  //       cell: ({ row }) => {
  //         const renderStatus = () => {
  //           if (row.original.status === "Pending") {
  //             return (
  //               <div className="py-1 px-3 rounded-full text-status-danger-300 bg-status-danger-10 w-fit">
  //                 Pending
  //               </div>
  //             );
  //           } else if (row.original.status === "Ongoing") {
  //             return (
  //               <div className="py-1 px-3 rounded-full text-primary-o-600 bg-blue-o-50 w-fit">
  //                 Ongoing
  //               </div>
  //             );
  //           } else if (row.original.status === "Scheduled") {
  //             return (
  //               <div className="py-1 px-3 rounded-full text-statusPillYellowText bg-statusPillYellowbg w-fit">
  //                 Scheduled
  //               </div>
  //             );
  //           } else if (row.original.status === "Completed") {
  //             return (
  //               <div className="py-1 px-3 rounded-full text-pvDarkGreen bg-pvExtraLightGreen w-fit">
  //                 Completed
  //               </div>
  //             );
  //           } else {
  //             return <div>-</div>;
  //           }
  //         };

  //         return <div className="flex items-center">{renderStatus()}</div>;
  //       },
  //     },
  //   ],
  //   []
  // );

  const handleAdd = () => {
    setAddPatient(true);
    setpopMenu(true);
  };

  return (
    <>
      <div className="relative">
        {scheduled ? (
          <DRCard
            setScheduled={setScheduled}
            data={rowData}
            setPatientData={setPatientData}
          />
        ) : (
          <Table
            columns={[]}
            data={patientData ?? []}
            isFilter={true}
            isSearch
            dateProps={{ start: startDate, end: endDate }}
            isAddNewBtn
            handleAddNewBtnClick={() => handleAdd()}
            paginationShow
            isTitle
            isTitleName="Appointment List"
          />
        )}
        {view && <ViewDetail data={rowData} onClose={() => setView(false)} />}
      </div>
      {addPatient && (
        <AddPatient
          hideModal={() => setAddPatient(false)}
          setPatientData={setPatientData}
        />
      )}
    </>
  );
};

export default PatientList;
