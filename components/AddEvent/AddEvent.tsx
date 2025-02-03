import React, { useState } from "react";
import { Field, Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import FormBody from "@/components/CommonComponents/FormBody";
import FormFooter from "@/components/CommonComponents/FormFooter";
import { RightDrawer } from "../CommonComponents/RightDrawer";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronUp, ChevronDown } from "lucide-react";
import AdminSuccess from "../CommonComponents/AdminModal";
import { ConfirmationModal } from "../CommonComponents/ConfirmationModal";
// import { ConfirmModal } from "../CommonComponents/ConfirmModal";

export default function AddEvent({ hideModal, setEvents }) {
  const [footerHeight, setFooterHeight] = useState(0);
  const [modal, setModal] = useState(false);

  const [previewMedia, setPreviewMedia] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(startDate.getTime() + 2 * 60 * 60 * 1000)
  ); 

  const communityOptions = [
    { label: "Society 1 Club", value: "Community 1" },
    { label: "Society 2 Club", value: "Community 2" },
    { label: "Society 3 Club", value: "Community 3" },
  ];

  const validationSchema = Yup.object().shape({
    media: Yup.mixed()
      .required("Please upload an event photo or video")
      .test("fileSize", "File size is too large", (value) => {
        if (!value) return true;
        const file = value as File;
        const MAX_SIZE_IMAGE = 1 * 1024 * 1024;
        const MAX_SIZE_VIDEO = 2 * 1024 * 1024;
        return (
          file.size <=
          (file.type.startsWith("video") ? MAX_SIZE_VIDEO : MAX_SIZE_IMAGE)
        );
      })
      .test("fileType", "Unsupported file format", (value) => {
        if (!value) return true;
        const file = value as File;
        const SUPPORTED_FORMATS = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "video/mp4",
          "video/quicktime",
        ];
        return SUPPORTED_FORMATS.includes(file.type);
      }),
    community: Yup.object().required("Please select a community"),
    startDateTime: Yup.date().required("Please select a start date and time"),
    endDateTime: Yup.date().required("Please select an end date and time"),
    location: Yup.string().required("Please enter location"),
    title: Yup.string().required("Please enter title"),
    description: Yup.string().required("Please enter description"),
  });

  const formik = useFormik({
    initialValues: {
      media: null,
      community: null,
      startDateTime: new Date(),
      endDateTime: new Date(),
      location: "",
      description: "",
      title: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = {
        media: {
          name: values.media.name,
          type: values.media.type,
          size: values.media.size,
          url: previewMedia, 
        },
        community: values.community || null,
        startDateTime: values.startDateTime,
        endDateTime: values.endDateTime,
        location: values.location,
        description: values.description,
        title: values?.title,
      };

      try {
        const existingData =
          JSON.parse(localStorage.getItem("eventFormData")) || [];
        existingData.push(payload);
        localStorage.setItem("eventFormData", JSON.stringify(existingData));

        setEvents(existingData); 

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

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const MAX_SIZE_IMAGE = 1 * 1024 * 1024;
      const MAX_SIZE_VIDEO = 2 * 1024 * 1024;
      const maxSize = file.type.startsWith("video")
        ? MAX_SIZE_VIDEO
        : MAX_SIZE_IMAGE;

      if (file.size > maxSize) {
        setErrorMessage(
          `File size exceeds ${
            maxSize / 1024 / 1024
          }MB. Please upload a smaller file.`
        );
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewMedia(reader.result as string);
        formik.setFieldValue("media", file);
      };
      reader.readAsDataURL(file);
    }
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
          message={"Event created successfully!"}
          responseCode={200}
          hideModal={() => setModal(false)}
        />
      ) : (
        <RightDrawer
          header={"Create New Event"}
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
                    {/* Media Upload */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Add Photo or Video{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center justify-center w-full">
                        <div className="relative flex flex-col items-center justify-center w-full h-80 border-2 border-dashed rounded-lg aspect-[3/4]">
                          {previewMedia ? (
                            <div className="relative w-full h-full">
                              {formik.values.media?.type.startsWith("video") ? (
                                <video
                                  src={previewMedia}
                                  controls
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              ) : (
                                <img
                                  src={previewMedia}
                                  alt="Preview"
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              )}
                              <button
                                type="button"
                                className="absolute bottom-2 right-40 bg-white/80 text-black px-3 py-1.5 rounded-md text-sm hover:bg-black/90 hover:text-white/90 flex items-center space-x-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  document
                                    .getElementById("file-input")
                                    ?.click();
                                }}
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                                <span>Replace Media</span>
                              </button>
                            </div>
                          ) : (
                            <div
                              className="absolute inset-0 flex flex-col items-center justify-center p-4 cursor-pointer"
                              onClick={() =>
                                document.getElementById("file-input")?.click()
                              }
                            >
                              <svg
                                className="w-16 h-16 mb-4 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <p className="text-lg text-gray-500 text-center">
                                Click to upload a photo or video
                              </p>
                            </div>
                          )}
                        </div>
                        <input
                          id="file-input"
                          type="file"
                          name="media"
                          className="hidden"
                          accept="image/*, video/*"
                          onChange={handleMediaUpload}
                        />
                      </div>
                      <div className="text-red-500 text-xs mt-0.5">
                        {formik.errors.media &&
                        formik.touched.media &&
                        typeof formik.errors.media === "string"
                          ? formik.errors.media
                          : ""}
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-700 font-medium">
                        Select Community <span className="text-red-500">*</span>
                      </label>
                      <Select
                        options={communityOptions}
                        value={formik.values.community}
                        onChange={(option) =>
                          formik.setFieldValue("community", option)
                        }
                        placeholder={"Please select a community"}
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                      <div className="text-red-500 text-xs mt-0.5">
                        {formik.errors.community &&
                          formik.touched.community &&
                          "Please select a community"}
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-700 font-medium">
                        Event Title <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        name="title"
                        placeholder="Enter Event Title"
                        className="placeholder-gray-400 text-black border rounded-md p-2 w-full"
                      />
                      <div className="text-red-500 text-xs mt-0.5">
                        {formik.errors.title &&
                          formik.touched.title &&
                          formik.errors.title}
                      </div>
                    </div>

                    <div className="space-y-4 w-full">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex flex-col items-center">
                            <button className="text-gray-700 font-semibold flex items-center">
                              <ChevronUp size={18} />
                            </button>
                            <div className="w-px h-4 bg-gray-400"></div>
                          </div>
                          <span className="text-gray-700 font-medium">
                            Starts
                          </span>
                        </div>

                        <DatePicker
                          selected={startDate}
                          onChange={(date: Date) => {
                            setStartDate(date);
                            setEndDate(
                              new Date(date.getTime() + 2 * 60 * 60 * 1000)
                            );
                          }}
                          showTimeSelect
                          dateFormat="EEE, dd MMM 'at' h:mm a"
                          className="w-56 p-2 border rounded-md text-gray-700"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex flex-col items-center">
                            <div className="w-px h-4 bg-gray-400"></div>
                            <button className="text-gray-700 font-semibold flex items-center">
                              <ChevronDown size={18} />
                            </button>
                          </div>
                          <span className="text-gray-700 font-medium">
                            Ends
                          </span>
                        </div>

                        <DatePicker
                          selected={endDate}
                          onChange={(date: Date) => setEndDate(date)}
                          showTimeSelect
                          dateFormat="EEE, dd MMM 'at' h:mm a"
                          className="w-56 p-2 border rounded-md text-gray-700"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-700 font-medium">
                        Choose Location <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        name="location"
                        placeholder="Enter event location"
                        className="placeholder-gray-400 text-black border rounded-md p-2 w-full"
                      />
                      <div className="text-red-500 text-xs mt-0.5">
                        {formik.errors.location &&
                          formik.touched.location &&
                          formik.errors.location}
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-700 font-medium">
                        Add Description <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Field
                          as="textarea"
                          name="description"
                          placeholder="Add event description"
                          className="min-h-[100px] pl-2 pr-16"
                        />
                        <span className="absolute bottom-2 right-2 text-xs text-gray-400">
                          {`${formik.values?.description?.length}/5000`}
                        </span>
                      </div>
                      <div className="text-red-500 text-xs mt-0.5">
                        {formik.errors.description &&
                          formik.touched.description &&
                          formik.errors.description}
                      </div>
                    </div>
                  </div>
                </FormBody>

                <FormFooter onHeightChange={setFooterHeight}>
                  <button
                    type="button"
                    onClick={() => hideModal(true)}
                    className="inline-flex items-center justify-center transition-all duration-150 ease-linear outline-none bg-gray-o-250 hover:bg-gray-o-150 text-black-b-300 font-medium focus:outline-none text-sm px-6 md:px-9 h-10 py-2 rounded-md border border-gray-p-350"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center text-white transition-all duration-150 ease-linear outline-none bg-primary-o-600 hover:bg-primary-o-550 focus:outline-none text-sm px-6 md:px-9 h-10 py-2 rounded-md"
                  >
                    Create Event
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
