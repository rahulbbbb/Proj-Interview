import {
  ColumnDef,
  CoreRow,
  Row,
  RowData,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, {
  CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactPaginate from "react-paginate";

import {
  ArrowDown,
  ArrowUp,
  AuditTrailIcon,
  CardviewIcon,
  FilterIcon,
  LeftIcon,
  ListviewIcon,
  PlusIcon,
  SearchIcon,
  TransferHistoryIcon,
} from "@/components/Icons";

import clsx from "clsx";

import {
  Table as SuperResponsiveTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import { NoDataFound } from "@/components/CommonComponents/DataNotFound";
// import { Pagination } from "./Pagination/Pagination";
import GlobalQuickFilter from "./GlobalQuickFilter";
import {
  ToolTip,
  tooltipInterface,
} from "@/components/CommonComponents/Tooltip";
import { Filter } from "./Filtered";
import { Loader } from "@/components/CommonComponents/Loader";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    deleteRow: (rowId: string) => void;
  }
}

interface pType {
  selectedPageSize?: number;
  pageNumber?: number;
  skipPage?: number;
}

interface quickFiltersData {
  id?: string;
  name?: string;
}

export interface TableI {
  data: any;
  addNewRow?: any;
  columns: any;
  isFilter?: boolean;
  isAudit?: boolean;
  paginationShow?: boolean;
  pagination?: any;
  filterData?: any;
  maxHeight?: any;
  filterCheckedState?: any;
  isLoading?: boolean;
  selectedPagePagination?: pType;
  isCardViewBtn?: boolean;
  currentView?: string;
  onChangePagePagination?: ({
    selectedPageSize,
    pageNumber,
    skipPage,
  }: pType) => void;
  onFilterApply?: ({
    data: {},
    date,
    amountRange,
    secondaryDate,
  }: {
    data: any;
    date: { startDate: string; endDate: string };
    amountRange: number[];
    secondaryDate: { startDate: string; endDate: string };
  }) => void;
  onFilterReset?: ({
    data: {},
    date,
    amountRange,
  }: {
    data: any;
    date: { startDate: string; endDate: string };
    amountRange: number[];
  }) => void;
  onTableDismount?: () => void;

  NotToRenderToolTip?: string[] | string;

  quickFilters?: Array<{ id: string; name: string }>;
  onClickQuickFilter?: (value: object) => void;
  quickFilterSelected?: quickFiltersData;
  tooltipProps?: tooltipInterface;
  onViewChange?: (val: string) => void;

  sliderProps?: {
    min?: number;
    max?: number;
  };
  dateProps?: {
    start?: string;
    end?: string;
  };
  secondaryDateProps?: {
    start?: string;
    end?: string;
  };
  showSecondaryFilter?: boolean;
  showSecondaryDateFieldName?: string;
  showDateFilterName?: string;
  showDateFilter?: boolean;
  showSliderFilter?: boolean;
  isLeft?: boolean;
  isSearch?: boolean;
  onEditTableChange?: (arg: Array<any>) => void;
  onSearchText?: (text: string) => void;
  isTableEditable?: boolean;
  columnsToEdit?: Array<string> | string;
  lineItemToBedeleted?: Array<string> | string;
  onDeleteRowClick?: (row: CoreRow<any>["original"]) => void;
  footerTitle?: string;
  showFooter?: boolean;
  subjectTitle?: string;
  getDeletedRowId?: (arg: any) => void;
  getData?: (data: any) => void;
  columnToStick?: Array<string>;
  isTransferHistory?: boolean;
  handleAuditTrailClick?: () => void;
  handleTransferHistoryClick?: () => void;
  isAddNewBtn?: boolean;
  isAddNewBtnName?: string;
  isAddNewBtnIcon?: React.ReactNode | React.FC;
  handleAddNewBtnClick?: () => void;
  isAddNewBtnCss?: string;
  isCustomTab?: boolean;
  customTabName?: string;
  customTabIcon?: React.ReactNode | React.FC;
  handleCustomTabClick?: () => void;
  customTabCss?: string;
  initialLengthOfQuickFilter?: number;
  isDeleteTab?: boolean;
  deleteTabName?: string;
  deleteTabIcon?: React.ReactNode | React.FC;
  handleDeleteTabClick?: () => void;
  deleteTabCss?: string;
  resetSelection?: any;
  isCustomComponent?: boolean;
  customComponent?: React.ReactNode | React.FC;
  isTitle?: boolean;
  isTitleName?: string;
  isTitleLeftArrow?: boolean;
  handleTitleLeftArrowClick?: () => void;
}

function Table({
  columnToStick = [],
  data = [],
  addNewRow = [],
  columns,
  pagination,
  isFilter,
  isAudit,
  paginationShow,
  filterData = [],
  maxHeight = 290,
  isLoading = false,
  selectedPagePagination,
  onChangePagePagination,
  onFilterApply,
  onFilterReset,
  filterCheckedState,
  onTableDismount = () => {},
  NotToRenderToolTip = [],
  quickFilters = [],
  onClickQuickFilter,
  quickFilterSelected,
  tooltipProps,
  sliderProps,
  dateProps,
  showDateFilter = false,
  showSliderFilter = false,
  isLeft = false,
  isSearch = false,
  onEditTableChange = () => {},
  onSearchText = (e) => {},
  isTableEditable = false,
  columnsToEdit = [],
  lineItemToBedeleted,
  onViewChange = (val) => {},

  // onDeleteRowClick = () => { },
  showDateFilterName = "Date Range",
  footerTitle,
  showFooter = false,
  subjectTitle,
  getDeletedRowId = () => {},
  getData,
  isTransferHistory = false,
  handleAuditTrailClick = () => {},
  handleTransferHistoryClick = () => {},
  isAddNewBtn = false,
  isAddNewBtnName = "",
  isAddNewBtnIcon = null,
  handleAddNewBtnClick = () => {},
  isAddNewBtnCss = "",
  isCustomTab = false,
  customTabName = "",
  customTabIcon = null,
  handleCustomTabClick = () => {},
  customTabCss = "",
  isDeleteTab = false,
  deleteTabName = "",
  deleteTabIcon = <></>,
  handleDeleteTabClick = () => {},
  deleteTabCss = "",
  secondaryDateProps,
  showSecondaryDateFieldName,
  showSecondaryFilter = false,
  resetSelection,
  initialLengthOfQuickFilter = 2,
  isCustomComponent = false,
  customComponent = <></>,
  isTitle = false,
  isTitleName = "",
  isTitleLeftArrow = false,
  isCardViewBtn = false,
  currentView = "list",
  handleTitleLeftArrowClick = () => {},
}: TableI) {
  const [sorting, setSorting] = useState<any>([]);
  const [Tdata, setTData] = useState([...data, ...addNewRow]);
  const [filtering, setFiltering] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [selectedPageSize, setSelectedPageSize] = useState(
    (selectedPagePagination?.selectedPageSize as number) || 10
  );
  const [isCardView, setIsCardView] = useState(false);

  const [pageNumber, setPageNumber] = useState(
    (selectedPagePagination?.pageNumber as number) || 0
  );
  const [skipPage, setSkipPage] = useState(
    selectedPagePagination?.skipPage || 0
  );

  const [showFilter, setShowFilter] = useState(false);

  const onDeleteRowClick = (rowId: string) => {
    getDeletedRowId(rowId);
    table.options.meta?.deleteRow(rowId);
  };

  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
    setSkipPage(selected * selectedPageSize);
  };

  useEffect(() => {
    return () => onTableDismount();
  }, []);

  useEffect(() => {
    if (selectedPageSize) {
      setPageNumber(0);
    }
  }, [selectedPageSize]);

  useEffect(() => {
    if (!isTableEditable) return;
    onEditTableChange(Tdata);
  }, [Tdata]);

  useEffect(() => {
    if (typeof onChangePagePagination === "function") {
      onChangePagePagination({
        selectedPageSize,
        pageNumber,
        skipPage,
      });
    }
  }, [selectedPageSize, pageNumber, skipPage]);
  

  useEffect(() => {
    table?.getHeaderGroups()[0]?.headers?.map((header) => {
      if (
        columnToStick.includes(header?.id as string) &&
        header.column.getIsPinned() !== "left"
      ) {
        header.column.pin("left");
      }
    });
  }, []);

  const toggleView = (viewType: "list" | "card") => {
    onViewChange(viewType);
    if (viewType === "card") {
      setIsCardView(true);
    } else {
      setIsCardView(false);
    }
  };

  const pageCount = pagination ? Math.ceil(pagination / selectedPageSize) : 10;

  const defaultColumn: Partial<ColumnDef<any>> = useMemo(() => {
    return {
      cell: function Cell({
        getValue,
        row: { index, original },
        column,
        table,
      }) {
        const { id } = column;
        const initialValue = getValue();

        const [value, setValue] = useState(initialValue);

        useEffect(() => {
          setValue(initialValue);
        }, [initialValue]);

        if (
          (columnsToEdit?.length > 0 && columnsToEdit?.includes(id)) ||
          columnsToEdit == "all"
        ) {
          // When the input is blurred, we'll call our table meta's updateData function
          const onBlur = () => {
            table.options.meta?.updateData(index, id, value);

            const data = [...table.options.data];

            // Modify the specific row's data
            const updatedRow = { ...original, [id]: value };
            data[index] = updatedRow;

            // Update the data array in the table
            table.setOptions({
              ...table.options,
              data: data,
            });
            // const newArray = [...Tdata]
            // newArray[index] = original
            setTData(data);
            if (getData) getData(data);
          };

          return (
            <div className="group newTooltipWrap relative">
              {original?.isAssessmentLineItem ? (
                <span>{value as string}</span>
              ) : (
                <input
                  value={value as string}
                  type="number"
                  className="w-12 h-auto border border-gray-o-370 rounded-md px-1 shadow-nest-shadow focus-within:shadow-input-ring focus-within:outline-none"
                  // onChange={(e) =>handleChange(e)}
                  onChange={(e) => setValue(e.target.value)}
                  onBlur={onBlur}
                />
              )}
              {value ? (
                <span className="absolute bg-white -top-7 rounded text-xs px-2 z-10 shadow-md py-1 hidden group-hover:block transition-opacity duration-200 pointer-events-none">
                  {value as string}
                </span>
              ) : (
                <></>
              )}
            </div>
          );
        }

        return initialValue;
      },
    };
  }, [columnsToEdit]);

  const getCommonPinningStyles = (column: any): CSSProperties => {
    const isPinned = column.getIsPinned();
    const isSticky = column.columnDef.isSticky || false; // Use the isSticky property
    const shouldBeSticky = isSticky || isPinned;
    const isLastLeftPinnedColumn =
      shouldBeSticky && isPinned === "left" && column.getIsLastColumn("left");
    const isFirstRightPinnedColumn =
      shouldBeSticky &&
      isPinned === "right" &&
      column.getIsFirstColumn("right");

    return {
      boxShadow: isLastLeftPinnedColumn
        ? "-4px 0 4px -4px gray inset"
        : isFirstRightPinnedColumn
        ? "4px 0 4px -4px gray inset"
        : undefined,
      left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
      right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
      // opacity: isPinned ? 0.95 : 1,
      position: isPinned ? "sticky" : "relative",
      width: column.getSize(),
      zIndex: isPinned ? 1 : 0,
    };
  };

  const [expanded, setExpanded] = React.useState({});

  const table = useReactTable({
    data: Tdata,
    columns,
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getExpandedRowModel: getExpandedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
      rowSelection: rowSelection,
      expanded,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    defaultColumn: isTableEditable ? defaultColumn : undefined,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setTData((old: any) =>
          old.map((row: any, index: number) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
      deleteRow: (rowId: string) => {
        setTData((prev: any) => {
          const updatedData = prev.filter((row: any) => row.id !== rowId);
          return updatedData;
        });
      },
    },
  });

  useEffect(() => {
    if (resetSelection) {
      resetSelection(() => table.resetRowSelection());
    }
  }, [resetSelection, table]);

  useEffect(() => {
    setTData([...data, ...addNewRow]);
  }, [data]);

  if (typeof window !== "undefined") {
    const Arr: any = [];
    const selectedRowModel = table?.getSelectedRowModel();
    if (selectedRowModel && selectedRowModel.flatRows) {
      selectedRowModel.flatRows.map((item) => Arr.push(item.original));
    }
    localStorage.setItem("items", JSON.stringify(Arr));
    window.dispatchEvent(new Event("storage"));
  } else {
    // console.log("we are running on the server");
  }

  // const handleChange = (e: any) => {

  //   // Check if Enter key is pressed
  //   if (e.key === "Enter") {
  //     e.preventDefault(); // Prevent default behavior
  //   } else {
  //     // If other keys are pressed, invoke the onSearchText callback
  //     onSearchText(e.target.value);
  //   }
  // };

  return (
    <div
      className={`flex flex-col justify-between h-full ${
        (isAudit || isFilter) && "gap-4"
      }`}
    >
      <Loader isLoading={isLoading} bgOpacity={0.3} />
      <div>
        <div className="flex justify-between items-center flex-wrap gap-1 md:gap-3 text-sm px-5 py-4 text-gray-o-620 tableTopData">
          <div>
            {isTitle && (
              <div
                className={`flex items-center ${
                  isTitleLeftArrow ? "gap-3" : ""
                }`}
              >
                {isTitleLeftArrow && (
                  <div
                    onClick={() => {
                      handleTitleLeftArrowClick();
                    }}
                  >
                    <span className="border border-gray-o-40 hover:bg-gray-o-70 rounded-md flex items-center justify-center h-7 md:h-9 w-7 md:w-9 cursor-pointer">
                      <LeftIcon />
                    </span>{" "}
                    {isTitleLeftArrow}
                  </div>
                )}
                <div className="text-base md:text-22 text-black-b-250 font-medium">
                  {isTitleName}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end items-center flex-wrap gap-1 md:gap-3 text-sm text-gray-o-620">
            {isAddNewBtn && (
              <div className="relative ">
                <div
                  className={`flex justify-center items-center gap-2 px-3 py-2 rounded-md cursor-pointer bg-primary-o-600 hover:bg-primary-o-550 text-white transition-all duration-300 ${isAddNewBtnCss}`}
                  onClick={() => {
                    handleAddNewBtnClick();
                  }}
                >
                  {/* <span>{isAddNewBtnIcon ? isAddNewBtnIcon : <PlusIcon />}</span> */}
                  <span>{isAddNewBtnName || "Add New"}</span>
                </div>
              </div>
            )}

            {isCardViewBtn && (
              <div className="flex border border-gray-o-300 rounded-md divide-x h-9">
                <div
                  onClick={() => toggleView("list")}
                  className={`cardViewBtn px-2.5 h-full flex justify-center items-center cursor-pointer transition-all duration-300 group ${
                    !isCardView ? "bg-[#E6F4FF] active" : "bg-white"
                  } hover:bg-[#E6F4FF] rounded-tl-md rounded-bl-md`}
                >
                  <ListviewIcon />
                </div>
                <div
                  onClick={() => toggleView("card")}
                  className={`cardViewBtn px-2.5 h-full flex justify-center items-center cursor-pointer transition-all duration-300 group ${
                    isCardView ? "bg-[#E6F4FF] active" : "bg-white"
                  } hover:bg-[#E6F4FF] rounded-tr-md rounded-br-md`}
                >
                  <CardviewIcon />
                </div>
              </div>
            )}

            {quickFilters?.length > 0 && (
              <GlobalQuickFilter
                initialLengthOfQuickFilter={initialLengthOfQuickFilter}
                isLeft={isLeft}
                filters={quickFilters}
                onClickQuickFilter={onClickQuickFilter}
                quickFilterSelected={quickFilterSelected as quickFiltersData}
              />
            )}

            {isSearch && (
              <div className="search w-full md:w-44">
                <SearchIcon />
                <input
                  className="border-none shadow-none focus:outline-none search-input focus:shadow-none ring-0 focus:ring-0 font-normal"
                  type="text"
                  placeholder="Search..."
                  // value={filtering}
                  onChange={(e) => {
                    // setFiltering(e.target.value);
                    e.preventDefault();
                    e.stopPropagation();
                    onSearchText(e.target.value);
                  }}
                  // onKeyDown={handleChange}
                />

                {/* <FaSearch size='16' className='my-auto text-gray-o-500' /> */}
              </div>
            )}
            {isFilter && (
              <div className="relative ">
                <div
                  className="flex justify-center items-center w-9 h-9 p-2 rounded-md bg-[#F7F7FE] hover:bg-blue-o-10 border border-blue-o-10 cursor-pointer transition-all duration-300"
                  onClick={() => {
                    setShowFilter(!showFilter);
                  }}
                >
                  <FilterIcon />
                  {/* <span>Filter</span> */}
                </div>
                {/* {
                                    showFilter &&
                                    <div className="absolute z-50 right-0">
                                        <Filter data={filterData} hideModal={() => setShowFilter(false)} />
                                    </div>
                                } */}
              </div>
            )}
            {isAudit && (
              <div
                className="flex justify-center items-center w-9 h-9 p-2 rounded-md bg-[#F7F7FE] hover:bg-blue-o-10 border border-blue-o-10 cursor-pointer transition-all duration-300"
                onClick={() => {
                  handleAuditTrailClick();
                }}
              >
                <span>
                  <AuditTrailIcon />
                </span>
                {/* <span>Audit Trail</span> */}
              </div>
            )}
            {isTransferHistory && (
              <div className="relative ">
                <div
                  className="flex justify-center items-center w-9 h-9 p-2 rounded-md bg-[#F7F7FE] hover:bg-blue-o-10 border border-blue-o-10 cursor-pointer"
                  onClick={() => {
                    handleTransferHistoryClick();
                  }}
                >
                  <TransferHistoryIcon />
                  {/* <span>Transfer History</span> */}
                </div>
              </div>
            )}

            {/* {isDeleteTab && (
              <div className="relative ">
                <div
                  className={`flex justify-center items-center gap-1 px-2 py-1.5 rounded border border-blue-o-10 cursor-pointer ${deleteTabCss}`}
                  onClick={() => {
                    handleDeleteTabClick();
                  }}
                >
                  {deleteTabIcon}
                </div>
              </div>
            )} */}

            {isCustomTab && (
              <div className="relative ">
                <div
                  className={`flex justify-center items-center gap-2 px-3 py-2 rounded-md cursor-pointer bg-primary-o-600 hover:bg-primary-o-550 text-white transition-all duration-300 ${customTabCss}`}
                  onClick={() => {
                    handleCustomTabClick();
                  }}
                >
                  {/* {customTabIcon ? customTabIcon : <PlusIcon />} */}
                  <span>{customTabName || "Add New"}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* {isCustomComponent && customComponent} */}
        <div className="flex relative z-20">
          <div
            className="overflow-y-auto relative table-height main-table-wrap w-full"
            style={{
              maxHeight: `calc(100vh - ${maxHeight}px)`,
            }}
          >
            <SuperResponsiveTable
              key={columns
                .map((x: { accessorKey: string }) => x.accessorKey)
                .join("-")}
              className="responsiveTable block md:hidden"
            >
              <Thead>
                <Tr className="relative">
                  {table &&
                    table.getHeaderGroups().map((headerGroup, index) =>
                      headerGroup.headers.map((header, index) => (
                        <Th
                          key={index}
                          onClick={header.column.getToggleSortingHandler()}
                          className={`py-2 md:py-3 px-4 md:px-5 pl-0 text-black-b-140 font-medium text-xs text-left capitalize border-b border-blue-o-10 ${
                            header.column.columnDef.header === "Action"
                              ? "actionIconWrap"
                              : ""
                          }`}
                        >
                          <div
                            className={clsx(
                              "flex items-center gap-1 text-black-b-140",
                              header.column.columnDef.header === "Action" ||
                                header.column.columnDef.header === "Status" ||
                                header.column.columnDef.header === "Logo" ||
                                header.column.columnDef.header === "Channels" ||
                                header.column.columnDef.header ==
                                  "Payment Status"
                                ? "justify-start md:justify-center"
                                : ""
                            )}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header?.column?.getCanSort() &&
                              header.column.columnDef.header !== "Action" &&
                              ({
                                asc: <ArrowDown className="text-gray-o-480" />,
                                desc: <ArrowUp className="text-gray-o-480" />,
                              }[
                                header.column.getIsSorted() as "asc" | "desc"
                              ] ??
                                null)}
                          </div>
                        </Th>
                      ))
                    )}
                </Tr>
              </Thead>
              <Tbody>
                {table &&
                  table.getRowModel().rows.map((row, index) => (
                    <Tr key={index} className="hover:bg-gray-50 relative">
                      {row.getVisibleCells().map((cell, index) => (
                        <Td
                          key={index}
                          className={`py-2 px-4 text-gray-o-480 font-normal text-xs whitespace-nowrap tablecellData border-b border-blue ${
                            row?.parentId != undefined && `bg-gray-o-70`
                          } ${
                            table
                              .getHeaderGroups()
                              .flatMap((headerGroup) => headerGroup.headers)[
                              index
                            ].column.columnDef.header === "Action"
                              ? "actionIconWrap"
                              : ""
                          }`}
                          style={{
                            borderBottom: "1px solid #EAECF0",
                          }}
                        >
                          <ToolTip
                            arrowPosition="left"
                            renderToolTip={
                              NotToRenderToolTip == "all"
                                ? false
                                : !NotToRenderToolTip.includes(
                                    cell.column.id as string
                                  )
                            }
                            tooltipText={
                              cell.row.getValue(cell.column.id) ?? ""
                            }
                            {...tooltipProps}
                          >
                            <div className="tdDataRight">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </div>
                          </ToolTip>
                        </Td>
                      ))}
                    </Tr>
                  ))}
              </Tbody>
              {!!showFooter && !(Tdata.length == 0 || Tdata === undefined) && (
                <Tbody className="py-2 md:py-3 px-4 text-black-b-350 font-bold  text-sm text-left capitalize tFoot-Wrap">
                  <Tr className="relative !bg-blue-o-70 group">
                    {table.getAllColumns().map((cell: any, index: number) => (
                      <Td
                        key={index}
                        className="py-2 md:py-3 px-4 text-black-b-140 font-medium text-xs whitespace-nowrap tablecellData"
                        style={{
                          borderBottom: "1px solid #EAECF0",
                        }}
                      >
                        {!cell.columnDef?.toCalculate &&
                          index == 0 &&
                          footerTitle}

                        {!!cell.columnDef?.toCalculate &&
                          "$" +
                            " " +
                            table.getRowModel().rows.reduce((acc, row) => {
                              return acc + Number(row.getValue(cell.id));
                            }, 0)}
                      </Td>
                    ))}
                  </Tr>
                </Tbody>
              )}
            </SuperResponsiveTable>

            <table className="w-full mainTable hidden md:table">
              <thead className="sticky z-20 top-0 w-full">
                {table.getHeaderGroups().map((headerGroup, index) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header, index) => (
                      <th
                        key={index}
                        style={{
                          ...getCommonPinningStyles(header?.column),
                          whiteSpace: "nowrap",
                        }}
                        // style={
                        //   columnToStick?.length > 0
                        //     ? { ...getCommonPinningStyles(header?.column) }
                        //     : {}
                        // }
                        onClick={header.column.getToggleSortingHandler()}
                        className="py-2 md:py-3 px-5 text-black-b-250 uppercase font-semibold bg-white border-b border-[#A2A2A2]"
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            className={clsx(
                              "flex items-center gap-1 text-black-b-250 font-medium uppercase",
                              header.column.columnDef.header == "Action" ||
                                header.column.columnDef.header == "Status" ||
                                header.column.columnDef.header == "Logo" ||
                                header.column.columnDef.header == "Channels" ||
                                header.column.columnDef.header ==
                                  "Payment Status"
                                ? "justify-start"
                                : ""
                            )}
                          >
                            {/* {header.column.getIsPinned()} */}
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.columnDef.header != "Action" &&
                              {
                                asc: (
                                  <ArrowDown className="text-gray-o-480 min-w-3" />
                                ),
                                desc: (
                                  <ArrowUp className="text-gray-o-480 min-w-3" />
                                ),
                              }[
                                (header.column.getIsSorted() as
                                  | "asc"
                                  | "desc") ?? null
                              ]}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="z-10 relative">
                {table.getRowModel().rows.map((row, index) => (
                  <tr
                    key={index}
                    className="bg-white relative group/item hover:bg-gray-50"
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <td
                        key={index}
                        className={`py-2 px-5 text-gray-p-450 font-normal text-sm whitespace-nowrap tablecellData border-b border-gray-p-350 ${
                          row?.parentId != undefined && `bg-gray-o-70`
                        }`}
                        // style={{
                        //   borderBottom: "1px solid #EAECF0",
                        // }}
                        style={
                          columnToStick?.length > 0
                            ? { ...getCommonPinningStyles(cell?.column) }
                            : {}
                        }
                        // style={{ ...getCommonPinningStyles(cell?.column) }}
                      >
                        <ToolTip
                          arrowPosition="left"
                          renderToolTip={
                            NotToRenderToolTip == "all"
                              ? false
                              : !NotToRenderToolTip.includes(
                                  cell.column.id as string
                                )
                          }
                          tooltipText={cell.row.getValue(cell.column.id) ?? ""}
                          {...tooltipProps}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </ToolTip>
                      </td>
                    ))}
                    {lineItemToBedeleted?.includes(row?.original.id) && (
                      // {row.original?.newRow && (
                      <svg
                        width="14"
                        onClick={() =>
                          onDeleteRowClick(row?.original.id ?? row?.id)
                        }
                        className="absolute right-0 mr-3 hover:cursor-pointer -translate-y-1/2 top-1/2 hidden group-hover/item:block"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.527344"
                          width="16"
                          height="16"
                          rx="8"
                          fill="#ED5757"
                        />
                        <path
                          d="M12.5273 8H8.52734L4.52734 8"
                          stroke="#F9FAFB"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </tr>
                ))}
              </tbody>
              {!!showFooter && !(Tdata.length == 0 || Tdata === undefined) && (
                <tfoot className="py-2 md:py-3 px-4 bg-blue-o-70 text-black-b-350 font-bold  text-sm text-left capitalize">
                  <tr className="relative group">
                    {table.getAllColumns().map((cell: any, index: number) => (
                      <td
                        key={index}
                        className="py-2 md:py-3 px-4 text-black-b-140 bg-blue-o-70 hover:bg-blue-o-70 font-medium text-xs whitespace-nowrap tablecellData"
                        style={{
                          borderBottom: "1px solid #EAECF0",
                        }}
                      >
                        {!cell.columnDef?.toCalculate &&
                          index == 0 &&
                          footerTitle}

                        {!!cell.columnDef?.toCalculate &&
                          "$" +
                            " " +
                            roundToTwoDecimalPlaces(
                              table.getRowModel().rows.reduce((acc, row) => {
                                return acc + Number(row.getValue(cell.id));
                              }, 0)
                            )}
                        {/* {!!cell.columnDef?.toCalculate &&
                          table
                            .getRowModel()
                            .rows.reduce((acc, row) => {
                              return acc + Number(row.getValue(cell.id));
                            }, 0)
                            .toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 0,
                            })} */}
                      </td>
                    ))}
                  </tr>
                </tfoot>
              )}
            </table>

            {Tdata.length == 0 || Tdata === undefined ? (
              <div
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "40%",
                }}
              >
                <NoDataFound message={"No data found !"} />
              </div>
            ) : null}
          </div>
          {showFilter && filterData && (
            <div
              className={`${!showFilter && "hidden"}`}
              style={{
                maxHeight: `calc(100vh - ${maxHeight}px)`,
              }}
            >
              <Filter
                data={filterData}
                filterData={filterCheckedState}
                onFilterApply={onFilterApply}
                onFilterReset={onFilterReset}
                hideModal={() => setShowFilter(false)}
                sliderProps={sliderProps}
                date={dateProps}
                showDateFilter={showDateFilter}
                showDateFilterName={showDateFilterName}
                showSliderFilter={showSliderFilter}
                showSecondaryDateFilterName={showSecondaryDateFieldName}
                secondaryDate={secondaryDateProps}
                showSecondaryFilter={showSecondaryFilter}
              />
            </div>
          )}
        </div>
      </div>

      {/* <Pagination
        pagination={pagination}
        paginationShow={paginationShow}
        selectedPagePagination={selectedPagePagination}
        onChangePagePagination={onChangePagePagination}
      /> */}
    </div>
  );
}

export { Table };

export function roundToTwoDecimalPlaces(value: any) {
  if (Number.isInteger(value)) {
    return value;
  } else {
    return Number.parseFloat(value).toFixed(2);
  }
}
