"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { classNames } from "@/components/Utils";
import { Table } from "@/components/Table";
import data from "./data.json";
import { usePopper } from "react-popper";
import { MdCalendarMonth } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";

// import {
//   getSelectedPagePagination,
//   initialState,
//   setSelectedPageSizePagination,
// } from "@/slices/pagination/pagination";
// import AddUnitNumber from "@/components/UnitNumber/AddUnitNumber";
// import { IconEdit } from "@/components/icons/index";
// import { IconDelete } from "@/components/icons/index";
// import { getFilterData, setFilterData } from "@/slices/filterSlice/filterSlice";

// import {
//   useDeleteUnitNumberMutation,
//   useGetallUnitNumberQuery,
// } from "@/slices/UnitNumber/index";
// import { useDispatch, useSelector } from "react-redux";
// import { useDeleteResponse } from "@/components/Util";

import { ConfirmationModal } from "@/components/CommonComponents/ConfirmationModal";
import { CalendarIcon, Eye } from "../Icons";
// import { DeleteModal } from "@/components/CommonComponents/Modal";
// import { Loader } from "@/components/CommonComponents/Loader";
// import { useGetallGlobalMasterQuery } from "@/slices/GlobalMaster";
// import { ConfirmModal } from "@/components/CommonComponents/ConfirmModal";
export function StatusPillCustomerIndex(props) {
  // const status = props?.value ? props?.value.toLowerCase() : "";
  const status =
    props?.column?.id.toLowerCase() === "status"
      ? props?.row?.original?.status
        ? props?.row?.original?.status.toLowerCase()
        : props?.value
        ? props?.value?.toLowerCase()
        : ""
      : props?.row?.original?.paymentStatus
      ? props?.row?.original?.paymentStatus.toLowerCase()
      : props?.value
      ? props?.value?.toLowerCase()
      : "";
  // const status = props?.row?.original?.status ? props?.row?.original?.status.toLowerCase() : props?.value ?  props?.value?.toLowerCase():"" ;
  return (
    // ${headerName === "Status"?"mx-auto":""}
    <div className={`flex justify-center items-center flex-col mx-auto`}>
      <span
        className={classNames(
          "paddingXStatusPill py-0.5 px-2 leading-wide text-xxs rounded-full capitalize",
          status.startsWith("active") ||
            status.startsWith("prepaid") ||
            status.startsWith("paid") ||
            status?.startsWith("posted") ||
            status?.startsWith("accepted")
            ? "bg-pvLightGreen text-pvGreen"
            : null,
          status.startsWith("in escrow") ||
            status.startsWith("delinquent") ||
            status.startsWith("waived off") ||
            status?.startsWith("partially posted")
            ? "bg-statusPillYellowbg text-statusPillYellowText"
            : null,
          status.startsWith("draft") ||
            status.startsWith("current") ||
            status.startsWith("inactive") ||
            status.startsWith("pending") ||
            status.startsWith("on hold")
            ? "bg-pvLightGray text-pvPrimaryText"
            : null,
          status.startsWith("payment planned") || status.startsWith("upcoming")
            ? "bg-pvLightBlue text-pvBlue"
            : null,
          status.startsWith("in collection") ||
            status.startsWith("overdue") ||
            status?.startsWith("reverse") ||
            status?.startsWith("declined")
            ? "bg-pvLightRed text-pvRed"
            : null
        )}
      >
        {/* {props?.row?.original?.status} */}
        {status}
      </span>
      {props?.row?.original?.status == "In escrow" &&
      props.cell.column.id == "Status" ? (
        <div className="text-left text-xxs text-gray-500 pt-0.5 whitespace-nowrap capitalize">
          {props.row.original.subStatus}
        </div>
      ) : null}
    </div>
  );
}

const PatientList = () => {
  const [date, setDate] = useState({ startDate: "", endDate: "" });
  const [isDeleteApiError, setIsDeleteApiError] = useState(false);
  const [calendarTooltipVisible, setCalendarTooltipVisible] = useState(false);
  const [calendarPopperElement, setCalendarPopperElement] = useState(null);
  const [popMenu, setpopMenu] = useState<boolean>(false);
  const [idData, setIdData] = useState(null);
  //   const reduxData = useSelector(getFilterData);
  const startDate = date.startDate;
  const endDate = date.endDate;
  const [addUnitNumber, setAddUnitNumber] = useState<boolean>(false);
  const [editUnitNumber, setEditUnitNumber] = useState<boolean>(false);
  //   const paginationState = useSelector(getSelectedPagePagination);

  //GetAllUnitNumber
  //   const {
  //     data,
  //     isError,
  //     isFetching: unitNumberLoading,
  //   } = useGetallUnitNumberQuery({
  //     "PageCriteria.EnablePage": true,
  //     "PageCriteria.PageSize":
  //       paginationState?.selectedPageSize === null
  //         ? 5
  //         : paginationState?.selectedPageSize,
  //     "PageCriteria.Skip": paginationState?.skipPage,
  //     "RequestParam.IsMapped": true,
  //     "RequestParam.FloorId": reduxData?.data["Floor"],
  //     "RequestParam.PropertyTypeId": reduxData?.data["Unit Type"],
  //     "RequestParam.StartDate": date?.startDate,
  //     "RequestParam.EndDate": date?.endDate,
  //   });

  //   const dispatch = useDispatch();

  //   const { updateGlobalButtonState } = useGlobalButtonContext();

  //   const [
  //     deleteUnitNumber,
  //     { isLoading: deleteLoading, error: deleteApiError },
  //   ] = useDeleteUnitNumberMutation();

  //   const { deleteModal, setDeleteModal, response, setDeleteID, handleDelete } =
  //     useDeleteResponse(deleteUnitNumber);

  //   useEffect(() => {
  //     if (deleteApiError) {
  //       setIsDeleteApiError(true);
  //     }
  //   }, [deleteApiError]);

  //   useLayoutEffect(() => {
  //     updateGlobalButtonState({
  //       buttonName: "",
  //       onButtonClick: () => {
  //         setAddUnitNumber(true);
  //         setpopMenu(true);
  //       },
  //     });
  //   }, []);

  //GetAllGlobalMaster
  //   const { data: globalFloorData } = useGetallGlobalMasterQuery({
  //     "PageCriteria.EnablePage": false,
  //     "RequestParam.DocumentType": "Floor",
  //   });

  //   const { data: globalPropertyTypeData } = useGetallGlobalMasterQuery({
  //     "PageCriteria.EnablePage": false,
  //     "RequestParam.DocumentType": "PropertyType",
  //   });

  const columns = React.useMemo(
    () => [
      {
        header: "Patient Name",
        accessorKey: "name",
      },
      {
        header: "Mob Number",
        accessorKey: "mobileNumber",
      },
      {
        header: "whatsapp Number",
        accessorKey: "whatsappNumber",
      },
      {
        header: "E-mail",
        accessorKey: "email",
      },
      {
        header: "Address",
        accessorKey: "address",
      },
      // {
      //   header: "Doctor",
      //   accessorKey: "doctor",
      // },
      {
        header: "",
        accessorKey: "numberOfPages",
        cell: ({ row }) => {
          // const handleSummary = () => {
          //   setRowData(row.original);
          // };

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
              <div
                ref={calendarRef}
                className="relative cursor-pointer"
                onMouseEnter={() => setCalendarTooltipVisible(true)}
                onMouseLeave={() => setCalendarTooltipVisible(false)}
              >
                <MdCalendarMonth style={{ fontSize: "22px" }} />
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
    setAddUnitNumber(true);
    setpopMenu(true);
  };

  //   const filterData = [
  //     {
  //       title: "Unit Type",
  //       data:
  //         globalPropertyTypeData &&
  //         globalPropertyTypeData?.data?.globalMasters?.map((master) => ({
  //           uniqueId: master.globalMasterId,
  //           name: master.name,
  //         })),
  //     },
  //     {
  //       title: "Floor",
  //       data:
  //         globalFloorData &&
  //         globalFloorData?.data?.globalMasters?.map((master) => ({
  //           uniqueId: master.globalMasterId,
  //           name: master.name,
  //         })),
  //     },
  //   ];

  return (
    <>
      <div className="relative">
        {/* <div className="absolute top-7 left-5 font-medium" style={{fontSize:"22px"}}> 
          <span>Unit Numbers</span>
        </div> */}
        {/* {data && ( */}
        <Table
          columns={columns}
          data={data}
          isFilter={true}
          // filterData={filterData}
          // filterCheckedState={reduxData}
          // onFilterApply={({ data, date }) => {
          //   dispatch(
          //     setFilterData({
          //       data,
          //       filterData: undefined,
          //     })
          //   );
          //   setDate(date);
          // }}
          showDateFilter
          showDateFilterName="Added On"
          dateProps={{ start: startDate, end: endDate }}
          // onFilterReset={() => {
          //   setDate({ startDate: "", endDate: "" });
          //   dispatch(
          //     setFilterData({
          //       data: {},
          //       filterData: undefined,
          //     })
          //   );
          // }}
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
          isTitleName="Unit Number"
        />
        {/* )} */}
      </div>
      {/* <Loader isLoading={unitNumberLoading} />
       */}
    </>
  );
};

export default PatientList;
