import React, { useState } from "react";
import { Mail, Phone, Video, FileText, MessageCircle } from "lucide-react";
import {
  BagIcon,
  LocationIcon,
  MailIcon,
  MessageIcon,
  PhoneIcon,
  PhoneIcon2,
} from "../Icons";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

const CustomerProfile = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [activeIndex1, setActiveIndex1] = useState<number | null>(0);
  const [activeIndex2, setActiveIndex2] = useState<string>("history");

  const tabs = [
    { id: "history", label: "CUSTOMER HISTORY" },
    { id: "notes", label: "NOTES" },
    { id: "docs", label: "DOCS" },
  ];

  const data = [
    {
      icon: <BagIcon />,
      desc: "Made a purchase of Samsung Galaxy Z4 at price of Rs.12,999 only.",
      product: "SAMSUNG Galaxy S22 5G",
      price: "Rs. 16,999",
      background: "#F3AE3D",
    },
    {
      icon: <PhoneIcon />,
      desc: "Made an enquiry for Samsung Galaxy Z4 via initiate chat through Call.",
      audio: true,
      background: "#0070FC",
    },
    {
      icon: <MessageIcon />,
      desc: "Made an enquiry for Samsung Galaxy Z4 via initiate chat through Instagram.",
      button: "VIEW CHAT",
      background: "#57BE64",
    },
    {
      icon: <BagIcon />,
      desc: "Made a purchase of Samsung Galaxy Z4 at price of Rs.12,999 only.",
      product: "SAMSUNG Galaxy S22 5G",
      price: "Rs. 16,999",
      background: "#F3AE3D",
    },
  ];

  const [expanded, setExpanded] = useState(data.map(() => true));

  const toggleExpand = (index) => {
    setExpanded((prev) => prev.map((item, i) => (i === index ? !item : item)));
  };

  return (
    <div className="max-w-screen mx-auto p-6 bg-white ">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Customer Profile
      </h1>

      <div className="flex gap-6 border rounded-lg shadow-md w-full h-[500px] p-2">
        <div className="w-1/4  border-r p-4 ">
          <div className="flex items-center gap-3 border-b pb-4">
            <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-semibold">
              M
            </div>
            <div>
              <h2 className="text-lg font-normal font-din">Manmohan Singh</h2>
              <p className="text-sm text-gray-500">
                Joined 03 June, 2022 6:23 pm
              </p>
            </div>
          </div>

          <div className="flex justify-around mt-4">
            {[Mail, Phone, MessageCircle, FileText].map((Icon, i) => (
              <div
                key={i}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <Icon className="text-blue-500 w-5 h-5 cursor-pointer" />
              </div>
            ))}
          </div>

          
          <div className="mt-4 text-xs text-[#5F6368] space-y-2">
            <p className="flex items-start gap-2">
              <PhoneIcon2 className="w-3 h-3 mt-0.5" />
              +91 9667555094
            </p>
            <p className="flex items-center gap-2">
              <MailIcon className="w-4 h-4 mt-0.5" />{" "}
              Sushant@singleinterface.com
            </p>
            <p className="flex items-start gap-2">
              <LocationIcon className="w-4 h-4 mt-0.5" />
              24I, Udyog Vihar Phase, Sector 20, Gurugram, Haryana 122002
            </p>
          </div>

         
          <div className="mt-4">
            <h4 className="text-sm font-normal font-din text-[#5F6368] mb-1">Intent</h4>
            <div className="flex flex-wrap gap-2">
              {["Purchase", "Engagement", "Support"].map((tag, index) => (
                <span
                  key={tag}
                  onClick={() => setActiveIndex(index)}
                  className={`px-2 py-1 text-xs rounded border cursor-pointer ${
                    activeIndex === index
                      ? "border-blue-500 text-blue-700 bg-blue-50"
                      : "border-gray-300 text-gray-600 bg-gray-50"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h4 className="text-sm font-normal font-din text-[#5F6368] mb-1 mt-3">Lead Type</h4>
            <div className="flex gap-2 flex-wrap">
              {["Hot", "Warm", "Cold"].map((type, index) => (
                <span
                  key={type}
                  onClick={() => setActiveIndex1(index)}
                  className={`px-3 py-1 text-xs rounded border cursor-pointer transition-all duration-200 ${
                    activeIndex1 === index
                      ? "border-[#FF4E00] text-[#FF4E00] bg-orange-50"
                      : "border-gray-300 text-gray-600 bg-gray-50"
                  }`}
                >
                  {type}
                </span>
              ))}
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-normal font-din text-[#5F6368] mb-1">Interests</h4>
              <div className="border border-gray-300 rounded px-2 py-1 min-h-[48px] flex flex-wrap items-center gap-2">
                <span className="flex items-center px-2 py-1 text-xs rounded bg-gray-200 text-gray-800 cursor-default">
                  Strong Engine
                  <button className="ml-1 text-gray-500 hover:text-gray-700 text-sm leading-none">
                    ×
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-3/4">
          {/* Tabs */}
          <div className="flex border-b mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveIndex2(tab.id)}
                className={`px-4 py-2 text-sm font-normal font-din border-b-2 transition-colors duration-200 cursor-pointer ${
                  activeIndex2 === tab.id
                    ? "text-[#000000] border-blue-600"
                    : "text-gray-500 border-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative ml-5 border-l-2 border-gray-200 space-y-10">
            {data.map((item, i) => (
              <div key={i} className="relative pl-10">
                {/* Icon */}
                <div className="absolute -left-4 top-0 bg-white z-10">
                  <div
                    className="w-8 h-8 rounded-full bg-white border-1 border-white flex items-center justify-center text-lg shadow-md"
                    style={{ backgroundColor: item.background }}
                  >
                    {item.icon}
                  </div>
                </div>

                <div className="flex items-start w-full gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#333333] font-poppins">
                      {item.desc}
                    </p>

                    {expanded[i] && (
                      <>
                        {item.product && (
                          <div className="mt-2 flex items-center gap-3 p-2 bg-white w-fit">
                            <img
                              src="/shopping.png"
                              alt={item.product}
                              className="w-12 h-12 rounded object-cover border"
                            />
                            <div>
                              <p className="text-sm  text-black font-din font-normal ">
                                {item.product}
                              </p>
                              <p className="text-xs text-[#1E0A84] font-poppins  font-normal">
                                {item.price}
                              </p>
                            </div>
                          </div>
                        )}

                        {item.audio && (
                          <audio controls className="w-64 rounded-md p-2 mt-2">
                            <source src="sample.mp3" type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                        )}

                        {item.button && (
                          <button className="mt-2 text-xs font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded">
                            {item.button}
                          </button>
                        )}
                      </>
                    )}
                  </div>

                  <div className="w-[140px] flex items-start justify-center mt-1">
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      06/10/23 12:54 PM
                    </span>
                  </div>

                  <div
                    className="w-[40px] flex items-start mr-4 justify-end mt-1 cursor-pointer"
                    onClick={() => toggleExpand(i)}
                  >
                    {expanded[i] ? (
                      <IoIosArrowDown className="text-gray-400 w-4 h-4" />
                    ) : (
                      <IoIosArrowForward className="text-gray-400 w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;


