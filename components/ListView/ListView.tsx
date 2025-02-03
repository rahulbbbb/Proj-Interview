import React, { useEffect, useState } from "react";
import { MapPin, Clock } from "lucide-react"; 
import { CiCircleMinus } from "react-icons/ci";

const ListView = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = () => {
    const storedData = localStorage.getItem("eventFormData");
    if (storedData) {
      setEvents(JSON.parse(storedData));
    }
  };

  useEffect(() => {
    fetchEvents(); 

    const handleStorageUpdate = () => fetchEvents();

    window.addEventListener("storageUpdate", handleStorageUpdate);

    return () => {
      window.removeEventListener("storageUpdate", handleStorageUpdate);
    };
  }, []);

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

  const removeEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
    localStorage.setItem("eventFormData", JSON.stringify(updatedEvents));
    window.dispatchEvent(new Event("storageUpdate"));
  };

  return (
    <div className="p-6 bg-gray-100 h-screen flex flex-col" style={{ height: "calc(100vh - 120px)" }}>
      <div className="flex-1 overflow-y-auto" >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-48 overflow-hidden">
                {event.media.type.startsWith("image") ? (
                  <img src={event.media.url} alt="Event" className="w-full h-full object-cover" />
                ) : event.media.type.startsWith("video") ? (
                  <video src={event.media.url} controls className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <p className="text-gray-500">Unsupported media format</p>
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium mb-2">
                    {event.community ? `By ${event.community.label}` : "Community not selected"}
                  </span>
                  <CiCircleMinus
                    className="text-red-700 w-5 h-5 cursor-pointer hover:text-red-900"
                    onClick={() => removeEvent(index)} 
                  />
                </div>

                <h1 className="text-xl font-semibold mb-2">{`${event.title}`}</h1>

                <p className="text-gray-600 mb-2 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-purple-500" />
                  {event.location}
                </p>

                <p className="text-gray-600 mb-2 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-500" />
                  {`${formatDate(event.startDateTime)} - ${formatDate(event.endDateTime)}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListView;
