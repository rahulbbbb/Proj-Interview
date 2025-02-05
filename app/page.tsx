"use client";

import { TopNavigation } from "@/components/TopNavigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import PatientList from "@/components/PatientList/page";
import { Provider } from "react-redux";
import { store } from "@/stores";

interface Event {
  photo: string;
  community: { label: string; value: string };
  startDateTime: string;
  endDateTime: string;
  location: string;
  description: string;
}

export default function Home() {
  const [patientData, setPatientDate] = useState<Event[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    if (typeof window !== "undefined") {
      handleResize(); 
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("patientData");
    if (storedData) {
      setPatientDate(JSON.parse(storedData));
    }
  }, []);

  const handleDelete = () => {
    localStorage.removeItem("patientData");
    setPatientDate([]);
  };

  return (
    <>
      <Provider store={store}>
        <div className="flex h-screen w-full overflow-y-hidden">
          {!isMobile && <Sidebar />}
          <div className="flex h-screen w-full flex-col ">
            <TopNavigation />

            <div className="w-full mb-4 mt-4 flex justify-between px-6 flex-none"></div>

            <div className="flex-1">
              <PatientList />
            </div>
          </div>
        </div>
      </Provider>
    </>
  );
}
