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
import DatePicker from "react-datepicker";
import { CalendarIcon2 } from "../Icons";

// validation schema definition
const validationSchema = Yup.object().shape({
  sessionType: Yup.string().required("Session Type is required"),
  sessionTime: Yup.string()
    .required("Session Time is required")
    .matches(
      /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/,
      "Session Time must be in HH:mm format"
    ),
  sessionDate: Yup.string()
    .required("Session Date is required")
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "Session Date must be in YYYY-MM-DD format"
    ),
    // link: Yup.string().when("sessionMode", {
    //   // You may use this function as a condition to check if the sessionMode value is 'Online'
    //   //ts-ignore
    //   is: (sessionMode) => sessionMode === "Online",  // Check if sessionMode is 'Online'
    //   then: Yup.string()
    //     .url("Link must be a valid URL")
    //     .required("Online meeting link is required"), // Apply URL validation and required validation
    //   otherwise: Yup.string().notRequired(), // Do not require the field if the sessionMode is not "Online"
    // }),
});


export default function ScheduledSession({ hideModal, doctorData, data }) {
  const [footerHeight, setFooterHeight] = useState(0);
  const [modal, setModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const communityOptions = [
    {
      label: (
        <div className="flex justify-between">
          <span>Intro</span> <span>(15 mins - Free Session)</span>
        </div>
      ), // JSX element as label
      value: "(15 mins - Free Session)",
    },
    {
      label: (
        <div className="flex justify-between">
          <span>Counselling Session</span> <span>(15 mins - Free Session)</span>
        </div>
      ), // JSX element as labe,
      value: "(15 mins - Free Session)",
    },
    {
      label: "Renewal of Prescription",
      value: null,
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
        doctorId: crypto.randomUUID(),
        patientId: data.id,
        name: data.name,
        sessionType: "",
        sessionMode: "",
        sessionTime: "",
        sessionDate: "",
        detail: values?.detail,
        link: "",
        status: "Scheduled",
      };

      try {
        const existingData =
          JSON.parse(localStorage.getItem("scheduledData")) || [];
        existingData.unshift(payload);
        localStorage.setItem("scheduledData", JSON.stringify(existingData));

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
          <div className="flex flex-col">
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
                            {data.name ? data.name[0].toUpperCase() : ""}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <div>{data.name}</div>
                          <div className="text-xs">
                            {`+91${data.mobileNumber}`}
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
                          formik.setFieldValue("sessionType", option.label)
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
                        <input
                          type="date"
                          id="sessionDate"
                          name="sessionDate"
                          placeholder="Select session date"
                          className="border rounded-md p-2 w-full text-black placeholder-gray-400"
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
                          className="text-gray-700 font-medium mb-1"
                        >
                          Session Time <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="time"
                            id="sessionTime"
                            name="sessionTime"
                            placeholder="Select session time"
                            className="border rounded-md w-full text-black placeholder-gray-400"
                          />
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                            <i className="fas fa-clock"></i>
                          </span>
                        </div>
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
                      </div>
                    </div>
                  </div>
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
