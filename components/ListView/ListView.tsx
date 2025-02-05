import React, { useEffect, useState } from "react";
import { MapPin, Clock } from "lucide-react";
import { CiCircleMinus } from "react-icons/ci";
import data from "@/components/DRData/data.json";
import AddPatient from "../AddPatient/AddPatient";
import ScheduledSession from "../DRData/ScheduleSession";
const ListView = ({patientData}) => {
    const [session, setSession] = useState<boolean>(false);
    const [doctorData, setDoctorData] = useState({});

    
  console.log("s",doctorData)
  // const [events, setEvents] = useState([]);

  // const fetchEvents = () => {
  //   const storedData = localStorage.getItem("eventFormData");
  //   if (storedData) {
  //     setEvents(JSON.parse(storedData));
  //   }
  // };

  // useEffect(() => {
  //   fetchEvents();

  //   const handleStorageUpdate = () => fetchEvents();

  //   window.addEventListener("storageUpdate", handleStorageUpdate);

  //   return () => {
  //     window.removeEventListener("storageUpdate", handleStorageUpdate);
  //   };
  // }, []);

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  // const removeEvent = (index) => {
  //   const updatedEvents = events.filter((_, i) => i !== index);
  //   setEvents(updatedEvents);
  //   localStorage.setItem("eventFormData", JSON.stringify(updatedEvents));
  //   window.dispatchEvent(new Event("storageUpdate"));
  // };

  return (
    <>
    <div
      className="p-6 bg-gray-100 h-screen flex flex-col"
      style={{ height: "calc(100vh - 120px)" }}
    >
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full"
            >
              <div className="w-full h-48 overflow-hidden">
                {
                  <img
                    src={event?.media?.url}
                    className="w-full h-full object-cover"
                  />
                }
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <h1 className="text-xl font-semibold mb-2 p-2 pb-0">{`${event.title}`}</h1>

                <div className="grid grid-cols-2 gap-4 text-gray-700 mt-4 flex-grow p-2 pt-0">
                  <p className="text-left flex flex-col">
                    <span className="font-semibold">Expertise:</span>{" "}
                    {event.expertise}
                  </p>
                  <p className="text-right flex flex-col">
                    <span className="font-semibold">Gender:</span>{" "}
                    {event.gender}
                  </p>
                  <p className="text-left flex flex-col">
                    <span className="font-semibold">Session Mode:</span>{" "}
                    {event.sessionMode}
                  </p>
                  <p className="text-right flex flex-col">
                    <span className="font-semibold">Session Fee:</span>{" "}
                    {event.sessionFee}
                  </p>
                </div>

                {/* Book Now Button */}
                <button className="w-full mt-auto py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg" onClick={()=>{setSession(true); setDoctorData(event)}}>
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
        {session &&
           <ScheduledSession hideModal={() => setSession(false)} doctorData={doctorData} data={patientData} />
           }
           </>
  );
};

export default ListView;
