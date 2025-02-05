"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { classNames } from "@/components/Utils";
import { Table } from "@/components/Table";
import data from "./data.json";
import { usePopper } from "react-popper";
import { MdCalendarMonth } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { getFilterData, setFilterData } from "@/slices/filterSlice/filterSlice";
import { ConfirmationModal } from "@/components/CommonComponents/ConfirmationModal";
import { CalendarIcon, Eye } from "../Icons";
import AddPatient from "../AddPatient/AddPatient";
import { useDispatch, useSelector } from "react-redux";
import DRCard from "@/components/DRCard/page";


const PatientList = () => {
  const [date, setDate] = useState({ startDate: "", endDate: "" });

  const [popMenu, setpopMenu] = useState<boolean>(false);
  const [idData, setIdData] = useState(null);
  //   const reduxData = useSelector(getFilterData);
  const startDate = date.startDate;
  const endDate = date.endDate;
  const [addPatient, setAddPatient] = useState<boolean>(false);
  const [editUnitNumber, setEditUnitNumber] = useState<boolean>(false);
  const [patientData, setPatientData] = useState([]);
  const [filterDataa, setFilterDataa] = useState([]);
  const [rowData, setRowData] = useState({});
  const [scheduled, setScheduled] = useState<boolean>(false);


  const reduxData = useSelector(getFilterData);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedData = localStorage.getItem("patientData");
    if (storedData) {
      setPatientData(JSON.parse(storedData));
    }
  }, []);

  
  // const handleFilterApply = ({ data, date }) => {
  //   // Extract the addPatient name from the filter data passed by the Table component
  //   const patientNameFilter = data["addPatient Name"]?.toLowerCase() || "";
    
  //   // Filter logic
  //   const filteredData = patientData.filter((addPatient) => {
  //     const matchesName = patientNameFilter
  //       ? addPatient.name.toLowerCase().includes(patientNameFilter)
  //       : true;
  
  //       return matchesName;
  //     });
      
  //     // Update filtered data state
  //     setFilterDataa(filteredData);
      
  //     // Optionally sync with Redux
  //     dispatch(setFilterData({ data, filterData: filteredData }));
  //   };
  //   console.log(filterDataa)
  

  const columns = React.useMemo(
    () => [
      {
        header: "addPatient Name",
        accessorKey: "name",
      },
      {
        header: "Mob Number",
        accessorKey: "mobileNumber",
      },
      {
        header: "whatsapp Number",
        accessorKey: "wpNumber",
      },
      {
        header: "E-mail",
        accessorKey: "email",
      },
      {
        header: "Address",
        accessorKey: "address",
      },
      {
        header: "Assigned Doctor",
        accessorKey: "doctor",
        cell: ({ getValue }) => getValue() || "-",

      },
      {
        header: "Date & Time",
        accessorKey: "appointmentDateTime",
        cell: ({ getValue }) => getValue() || "-",
     
      },
   
      {
        header: "",
        accessorKey: "numberOfPages",
        cell: ({ row }) => {
          const handleSummary = () => {
            setRowData(row.original);
          };

          const viewRef = useRef(null);
          const calendarRef = useRef(null);
          const [viewTooltipVisible, setViewTooltipVisible] = useState(false);
          const [calendarTooltipVisible, setCalendarTooltipVisible] =
            useState(false);

          const [viewPopperElement, setViewPopperElement] = useState(null);
          const [calendarPopperElement, setCalendarPopperElement] =
            useState(null);

          const { styles: editStyles, attributes: editAttributes } = usePopper(
            viewRef.current,
            viewPopperElement,
            {
              placement: "bottom",
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, 8],
                  },
                },
              ],
            }
          );

          const { styles: calendarStyles, attributes: calendarAttributes } =
            usePopper(calendarRef.current, calendarPopperElement, {
              placement: "bottom",
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, 8],
                  },
                },
              ],
            });

          return (
            <div className="flex justify-center items-center gap-6">
            <div className="w-6 h-6 flex justify-center items-center">
              {row.original.status === "Pending" && (
                <div
                  ref={calendarRef}
                  className="relative cursor-pointer"
                  onMouseEnter={() => setCalendarTooltipVisible(true)}
                  onMouseLeave={() => setCalendarTooltipVisible(false)}
                >
                  <MdCalendarMonth style={{ fontSize: "22px" }} onClick={() => {
                    handleSummary();
                    setScheduled(true);
                  }} />
                  {calendarTooltipVisible && (
                    <div
                      ref={setCalendarPopperElement}
                      style={calendarStyles.popper}
                      {...calendarAttributes.popper}
                      className="bg-gray-600 text-white text-xs px-2 py-1 rounded-md shadow-lg z-20"
                    >
                      Schedule
                    </div>
                  )}
                </div>
              )}
            </div>
          
            <div
              ref={viewRef}
              className="relative cursor-pointer"
              onMouseEnter={() => setViewTooltipVisible(true)}
              onMouseLeave={() => setViewTooltipVisible(false)}
            >
              <MdOutlineRemoveRedEye style={{ fontSize: "22px" }} />
              {viewTooltipVisible && (
                <div
                  ref={setViewPopperElement}
                  style={editStyles.popper}
                  {...editAttributes.popper}
                  className="bg-gray-600 text-white text-xs px-2 py-1 rounded-md shadow-lg z-20"
                >
                  View
                </div>
              )}
            </div>
          </div>
          
          );
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        enableSorting: false,
        cell: ({ row }) => {
          const renderStatus = () => {
            if (row.original.status === "Pending") {
              return (
                <div className="py-1 px-3 rounded-full text-status-danger-300 bg-status-danger-10 w-fit">
                  Pending
                </div>
              );
            } else if (row.original.status === "Ongoing") {
              return (
                <div className="py-1 px-3 rounded-full text-primary-o-600 bg-blue-o-50 w-fit">
                  Ongoing
                </div>
              );
            } else if (row.original.status === "Scheduled") {
              return (
                <div className="py-1 px-3 rounded-full text-statusPillYellowText bg-statusPillYellowbg w-fit">
                  Scheduled
                </div>
              );
            } else if (row.original.status === "Completed") {
              return (
                <div className="py-1 px-3 rounded-full text-pvDarkGreen bg-pvExtraLightGreen w-fit">
                  Completed
                </div>
              );
            } else {
              return <div>-</div>;
            }
          };

          return <div className="flex items-center">{renderStatus()}</div>;
        },
      },
    ],
    []
  );

  // const actions = [
  //   {
  //     text: "Add Legal Entity Address Mapping ",
  //     action: () => setAddLegalEntity(true),
  //   },
  //   {
  //     text: "Add Bulk Legal Entity Address Mapping",
  //     action: () => true,
  //   },
  // ];
  const handleAdd = () => {
    setAddPatient(true);
    setpopMenu(true);
  };

    // const filterData = [
    //   {
    //     title: "addPatient Name",
    //     data:
    //     patientData &&
    //     patientData?.map((master) => ({
    //         uniqueId: master.name,
    //         name: master.name,
    //       })),
    //   },
    //   // {
    //   //   title: "Floor",
    //   //   data:
    //   //     globalFloorData &&
    //   //     globalFloorData?.data?.globalMasters?.map((master) => ({
    //   //       uniqueId: master.globalMasterId,
    //   //       name: master.name,
    //   //     })),
    //   // },
    // ];

  return (
    <>
      {/* <div className="relative"> */}
        {/* <div className="absolute top-7 left-5 font-medium" style={{fontSize:"22px"}}> 
          <span>Unit Numbers</span>
        </div> */}
        {/* {data && ( */}
        {scheduled  ? (
        <DRCard  setScheduled={setScheduled} data={rowData} 
        />
      ) : (
        <Table
          columns={columns}
          data={patientData ?? []}
          isFilter={true}
          // filterData={filterData}
          // filterCheckedState={reduxData}
          // onFilterApply={handleFilterApply}
          // showDateFilter
          // showDateFilterName="Added On"
          dateProps={{ start: startDate, end: endDate }}
          onFilterReset={() => {
            setDate({ startDate: "", endDate: "" });
            dispatch(
              setFilterData({
                data: {},
                filterData: undefined,
              })
            );
          }}
          isAddNewBtn
          handleAddNewBtnClick={() => handleAdd()}
          paginationShow
          // pagination={data?.meta?.totalCount}
          // onChangePagePagination={({
          //   pageNumber,
          //   selectedPageSize,
          //   skipPage,
          // }) => {
          //   dispatch(
          //     setSelectedPageSizePagination({
          //       selectedPageSize: selectedPageSize,
          //       pageNumber: pageNumber,
          //       skipPage: skipPage,
          //     })
          //   );
          // }}
          // onTableDismount={() => {
          //   dispatch(setSelectedPageSizePagination(initialState));
          // }}
          // selectedPagePagination={paginationState}
          isTitle
          isTitleName="Appointment List"
        />
      )}
   

       {addPatient &&
       <AddPatient hideModal={()=>setAddPatient(false)} setPatientData={setPatientData}/>
       }
    </>
  );
};

export default PatientList;
