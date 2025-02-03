"use client";

import SvgDataSearchComponent from "@/components/DataSearchSVG";
import ListView from "@/components/ListView/ListView";
import { Tabs } from "@/components/Tabs";
import { TopNavigation } from "@/components/TopNavigation";
import AddEvent from "@/components/AddEvent/AddEvent";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import PatientList from "@/components/PatientList/page";

interface Event {
  photo: string;
  community: { label: string; value: string };
  startDateTime: string;
  endDateTime: string;
  location: string;
  description: string;
}

export default function Home() {
  const [editUnitNumber, setEditUnitNumber] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("eventFormData");
    if (storedData) {
      setEvents(JSON.parse(storedData));
    }
  }, []);

  const handleDelete = () => {
    localStorage.removeItem("eventFormData");
    setEvents([]);
  };

  return (
    <>
     <div className='flex h-screen w-full overflow-y-hidden'>
     <Sidebar />
      <div className="flex h-screen w-full flex-col ">
        <TopNavigation />

        <div className="w-full mb-4 mt-4 flex justify-between px-6 flex-none">
          {/* <Tabs
            orientation="horizontal"
            handleTabs={(index) => {
              setActiveTab(index);
            }}
          >
            <Tabs.Tab label="Events" />
            <Tabs.Tab label="Communities" />
          </Tabs> */}
          {/* <div className="flex gap-2">
            {activeTab === 0 && events.length > 0 && (
              <button
                onClick={handleDelete}
                className="inline-flex items-center justify-center text-white transition-all duration-150 ease-linear outline-none bg-status-danger-800 hover:bg-status-danger-900 focus:outline-none text-xs sm:text-sm px-4 sm:px-6 md:px-9 h-10 py-2 rounded-md w-full sm:w-auto"
              >
                Delete All
              </button>
            )}
            {activeTab === 0 && (
              <button
                onClick={() => setEditUnitNumber(true)}
                className="inline-flex items-center justify-center text-white transition-all duration-150 ease-linear outline-none bg-primary-o-600 hover:bg-primary-o-550 focus:outline-none text-xs sm:text-sm px-4 sm:px-6 md:px-9 h-10 py-2 rounded-md w-full sm:w-auto"
              >
                Create
              </button>
            )}
          </div> */}
        </div>

        <div className="flex-1">
          {/* {activeTab === 1 || events?.length === 0 ? (
            <div
              className="flex flex-col justify-center items-center"
              style={{ height: "calc(100vh - 250px)" }}
            >
              <div className="m-5 flex flex-col justify-center items-center">
                <SvgDataSearchComponent />
              </div>
            </div>
          ) : ( */}
            <PatientList />
          {/* )} */}
        </div>
      </div>
      </div>


      {editUnitNumber && (
        <AddEvent
          setEvents={setEvents}
          hideModal={() => setEditUnitNumber(false)}
        />
      )}
    </>
  );
}
