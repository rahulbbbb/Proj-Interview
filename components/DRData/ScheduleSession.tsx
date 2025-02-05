import React, { useState } from "react";
import { Field, Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import FormBody from "@/components/CommonComponents/FormBody";
import FormFooter from "@/components/CommonComponents/FormFooter";
import { RightDrawer } from "../CommonComponents/RightDrawer";
import "react-datepicker/dist/react-datepicker.css";
import AdminSuccess from "../CommonComponents/AdminModal";
import { ConfirmationModal } from "../CommonComponents/ConfirmationModal";
import Select from "react-select";
import { CloseNewIcon } from "../Icons";

const validationSchema = Yup.object().shape({
  sessionType: Yup.string().required("Session Type is required"),
  sessionTime: Yup.string().required("Session Time is required"),
  sessionDate: Yup.string()
    .required("Session Date is required")
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "Session Date must be in YYYY-MM-DD format"
    ),
});

interface PatientData {
  patientId: string;
  doctorName?: string;
  sessionTime?: string;
  sessionDate?: string;
}

export default function ScheduledSession({
  hideModal,
  doctorData,
  patientData,
  setPatientData,
}) {
  const [footerHeight, setFooterHeight] = useState(0);
  const [modal, setModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showTimeSlots, setShowTimeSlots] = useState(false);

  const communityOptions = [
    {
      label: (
        <div className="flex justify-between">
          <span>Intro</span> <span>(15 mins - Free Session)</span>
        </div>
      ),
      value: "Intro-(15 mins - Free Session)",
    },
    {
      label: (
        <div className="flex justify-between">
          <span>Counselling Session</span> <span>(15 mins - Free Session)</span>
        </div>
      ),
      value: "Counselling Session-(15 mins - Free Session)",
    },
    {
      label: "Renewal of Prescription",
      value: "Renewal of Prescription",
    },
  ];

  const formik = useFormik({
    initialValues: {
      sessionType: "",
      sessionMode: "Inperson",
      detail: "",
      sessionTime: "",
      sessionDate: "",
      link: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = {
        doctorId: doctorData?.id,
        patientId: patientData.patientId,
        name: patientData.name,
        sessionType: values.sessionType,
        sessionMode: values.sessionMode,
        sessionTime: values.sessionTime,
        sessionDate: values.sessionDate,
        detail: values?.detail,
        link: values.link,
        status: "Scheduled",
      };

      try {
        const existingData =
          JSON.parse(localStorage.getItem("scheduledData")) || [];
        existingData.unshift(payload);
        localStorage.setItem("scheduledData", JSON.stringify(existingData));

        const patientDataa =
          JSON.parse(localStorage.getItem("patientData")) || [];
        const updatedPatientData = patientDataa.map((patient) => {
          if (patient.patientId === patientData.patientId) {
            return {
              ...patient,
              doctorName: doctorData.title,
              sessionTime: values.sessionTime,
              sessionDate: values.sessionDate,
              sessionFee: doctorData.sessionFee,
              sessionMode: values.sessionMode,
              link:values.link,
              status: "Scheduled",
            };
          }
          return patient;
        });

        localStorage.setItem("patientData", JSON.stringify(updatedPatientData));

        setPatientData(updatedPatientData);

        setModal(true);

        window.dispatchEvent(new Event("storageUpdate"));

        setTimeout(() => {
          formik.resetForm();
          hideModal(true);
          setModal(false);
        }, 1500);
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    },
  });

  const isDisabledDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) return true;

    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 6 || dayOfWeek === 0) return true;

    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    const nextWeekTuesday = new Date(nextWeek);
    nextWeekTuesday.setDate(
      nextWeekTuesday.getDate() + (2 - nextWeekTuesday.getDay())
    );

    const nextWeekWednesday = new Date(nextWeekTuesday);
    nextWeekWednesday.setDate(nextWeekTuesday.getDate() + 1);

    if (
      selectedDate.toDateString() === nextWeekTuesday.toDateString() ||
      selectedDate.toDateString() === nextWeekWednesday.toDateString()
    ) {
      return true;
    }

    return false;
  };

  const CustomDatePicker = ({ field, form }) => {
    const handleChange = (e) => {
      const selectedDate = e.target.value;
      if (!isDisabledDate(selectedDate)) {
        form.setFieldValue(field.name, selectedDate);
      }
    };

    return (
      <input
        type="date"
        {...field}
        onChange={handleChange}
        min={new Date().toISOString().split("T")[0]}
        className="border rounded-md p-2 w-full text-black placeholder-gray-400"
      />
    );
  };

  return (
    <div>
      {errorMessage ? (
        <ConfirmationModal
          type={"deleteMap"}
          hideModal={() => {
            setErrorMessage("");
          }}
          message={errorMessage}
        />
      ) : (
        ""
      )}
      {modal ? (
        <AdminSuccess
          message={"Session Scheduled successfully!"}
          responseCode={200}
          hideModal={() => setModal(false)}
        />
      ) : (
        <RightDrawer
          header={"Schedule Session"}
          hideModal={hideModal}
          width="1/3"
        >
          <div className="flex flex-col relative">
            <FormikProvider value={formik}>
              <Form
                placeholder="Enter some text"
                onPointerEnter={() => console.log("Pointer entered")}
                onPointerLeave={() => console.log("Pointer left")}
                {...({} as any)}
              >
                <FormBody footerHeight={footerHeight}>
                  <div className="grid grid-cols-1 w-full gap-5">
                    <div>
                      <label className="text-gray-500 font-medium">
                        Patient <span className="text-red-500">*</span>
                      </label>
                      <div className="flex bg-gray-50 gap-6 p-2 rounded-lg">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-300">
                          <span className="text-white font-bold text-lg">
                            {patientData.name
                              ? patientData.name[0].toUpperCase()
                              : ""}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <div>{patientData.name}</div>
                          <div className="text-xs">
                            {`+91${patientData.mobileNumber}`}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-500 font-medium">
                        Assign Doctor <span className="text-red-500">*</span>
                      </label>
                      <div className="flex bg-gray-50 gap-6 p-2 rounded-lg">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img
                            src={doctorData.media.url}
                            alt={doctorData.media.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <div>{doctorData.title}</div>
                          <div className="text-xs">
                            {doctorData.mobileNumber}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-500 font-medium">
                        Session Type <span className="text-red-500">*</span>
                      </label>
                      <Select
                        options={communityOptions}
                        onChange={(option) =>
                          formik.setFieldValue("sessionType", option.value)
                        }
                        placeholder={"Select session type"}
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                      <div className="text-red-500 text-xs mt-0.5">
                        {formik.errors.sessionType &&
                          formik.touched.sessionType &&
                          formik.errors.sessionType}
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="sessionMode"
                        className="font-semibold text-gray-500"
                      >
                        Session Mode
                      </label>
                      <div className="flex space-x-6">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="inPerson"
                            name="sessionMode"
                            value="Inperson"
                            checked={formik.values.sessionMode === "Inperson"}
                            onChange={() =>
                              formik.setFieldValue("sessionMode", "Inperson")
                            }
                            className="w-4 h-4 mr-2 cursor-pointer border-gray-300 focus:ring-0 focus:ring-offset-0 focus:border-black accent-black peer"
                          />
                          <label
                            htmlFor="inPerson"
                            className="cursor-pointer text-sm text-gray-700 peer-checked:text-black"
                          >
                            In-Person
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="online"
                            name="sessionMode"
                            value="Online"
                            checked={formik.values.sessionMode === "Online"}
                            onChange={() =>
                              formik.setFieldValue("sessionMode", "Online")
                            }
                            className="w-4 h-4 mr-2 cursor-pointer border-gray-300 focus:ring-0 focus:ring-offset-0 focus:border-black accent-black peer"
                          />
                          <label
                            htmlFor="online"
                            className="cursor-pointer text-sm text-gray-700 peer-checked:text-black"
                          >
                            Online
                          </label>
                        </div>
                      </div>
                      <div className="text-red-500 text-xs mt-0.5">
                        {formik.errors.sessionMode &&
                          formik.touched.sessionMode &&
                          formik.errors.sessionMode}
                      </div>
                    </div>

                    <div className="flex gap-6">
                      <div className="flex flex-col w-full">
                        <label
                          htmlFor="sessionDate"
                          className="text-gray-500 font-medium mb-1"
                        >
                          Session Date <span className="text-red-500">*</span>
                        </label>

                        <Field
                          name="sessionDate"
                          component={CustomDatePicker}
                        />
                        <div className="text-red-500 text-xs mt-0.5">
                          {formik.errors.sessionDate &&
                            formik.touched.sessionDate &&
                            formik.errors.sessionDate}
                        </div>
                      </div>

                      <div className="flex flex-col w-full">
                        <label
                          htmlFor="sessionTime"
                          className="text-gray-500 font-medium mb-1"
                        >
                          Session Time <span className="text-red-500">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowTimeSlots(true)}
                          className="border rounded-md w-full text-left pl-2 p-2 bg-white text-black placeholder-gray-400"
                        >
                          {formik.values.sessionTime || "Select session time"}{" "}
                        </button>
                        <div className="text-red-500 text-xs mt-0.5">
                          {formik.errors.sessionTime &&
                            formik.touched.sessionTime &&
                            formik.errors.sessionTime}
                        </div>
                      </div>
                    </div>

                    {formik.values.sessionMode === "Online" && (
                      <div>
                        <label className="text-gray-700 font-medium">
                          Online Session Link{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="text"
                          name="link"
                          placeholder="Enter patient name"
                          className="placeholder-gray-400 text-black border rounded-md p-2 w-full"
                        />
                        <div className="text-red-500 text-xs mt-0.5">
                          {formik.errors.link &&
                            formik.touched.link &&
                            formik.errors.link}
                        </div>
                      </div>
                    )}
                    <div>
                      <label className="text-gray-500 font-medium">
                        Session Details (Optional)
                      </label>
                      <div className="relative">
                        <Field
                          as="textarea"
                          name="detail"
                          placeholder="Enter details"
                          className="min-h-[100px] pl-2 pr-16 border rounded-md p-2 w-full"
                        />
                        <span className="absolute bottom-2 right-2 text-xs text-gray-400">
                          {`${formik.values?.detail?.length}/5000`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {showTimeSlots && (
                    <>
                      <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-50"
                        onClick={() => setShowTimeSlots(false)}
                      ></div>

                      <div className="fixed bottom-0 left-0 w-full bg-white rounded-t-lg shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
                        <div className="flex justify-between items-center p-4 border-b border-gray-200">
                          <h2 className="text-lg font-semibold text-gray-700 mx-auto">
                            Session Time
                          </h2>
                          <button
                            onClick={() => setShowTimeSlots(false)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <CloseNewIcon />
                          </button>
                        </div>

                        <div className="p-4 space-y-4">
                          {[
                            {
                              label: "Morning",
                              times: [
                                "08:00 AM",
                                "09:00 AM",
                                "10:00 AM",
                                "11:00 AM",
                              ],
                            },
                            {
                              label: "Afternoon",
                              times: [
                                "12:00 PM",
                                "01:00 PM",
                                "02:00 PM",
                                "03:00 PM",
                              ],
                            },
                            {
                              label: "Evening",
                              times: [
                                "04:00 PM",
                                "05:00 PM",
                                "06:00 PM",
                                "07:00 PM",
                              ],
                            },
                            {
                              label: "Night",
                              times: [
                                "08:00 PM",
                                "09:00 PM",
                                "10:00 PM",
                                "11:00 PM",
                              ],
                            },
                          ].map(({ label, times }) => (
                            <div key={label}>
                              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                {label}
                              </h3>
                              <div className="grid grid-cols-4 gap-4">
                                {times.map((time) => {
                                  const isDisabled = Math.random() < 0.3;

                                  return (
                                    <button
                                      key={time}
                                      type="button"
                                      onClick={() => {
                                        if (!isDisabled) {
                                          formik.setFieldValue(
                                            "sessionTime",
                                            time
                                          );
                                          setShowTimeSlots(false);
                                        }
                                      }}
                                      disabled={isDisabled}
                                      className={`border rounded-md p-2 ${
                                        isDisabled
                                          ? "border-gray-300 text-gray-400 cursor-not-allowed opacity-50"
                                          : formik.values.sessionTime === time
                                          ? "border-red-500 text-red-600"
                                          : "border-gray-300 text-gray-700"
                                      }`}
                                    >
                                      {time}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </FormBody>
                <FormFooter onHeightChange={setFooterHeight}>
                  <button
                    type="button"
                    onClick={() => hideModal(true)}
                    className="inline-flex items-center justify-center transition-all duration-150 ease-linear outline-none text-pink-500 font-medium focus:outline-none text-sm px-6 md:px-9 h-10 py-2 rounded-md border border-pink-500 hover:bg-pink-500 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center text-white transition-all duration-150 ease-linear outline-none bg-gradient-to-r from-purple-500 to-pink-500 focus:outline-none text-sm px-6 md:px-9 h-10 py-2 rounded-md hover:scale-105"
                  >
                    Confirm
                  </button>
                </FormFooter>
              </Form>
            </FormikProvider>
          </div>
        </RightDrawer>
      )}
    </div>
  );
}
