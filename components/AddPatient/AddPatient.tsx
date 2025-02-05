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


const validationSchema = Yup.object().shape({
  mobileNumber: Yup.string()
    .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),
  wpNumber: Yup.string()
    .matches(/^\d{10}$/, "WhatsApp number must be exactly 10 digits")
    .required("WhatsApp number is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  address: Yup.string()
    .max(5000, "Address cannot exceed 5000 characters")
    .required("Address is required"),
  name: Yup.string().required("Name is required"),
  sameAsMobile: Yup.boolean(),
});

export default function AddPatient({ hideModal, setPatientData }) {
  const [footerHeight, setFooterHeight] = useState(0);
  const [modal, setModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      mobileNumber: "",
      wpNumber: "",
      address: "",
      email: "",
      description: "",
      name: "",
      sameAsMobile: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = {
        id: crypto.randomUUID(), 
        mobileNumber: values.mobileNumber,
        wpNumber: values.wpNumber,
        email: values.email,
        name: values?.name,
        address: values?.address,
        status:"Pending"
      };
  
      try {
        const existingData = JSON.parse(localStorage.getItem("patientData")) || [];
        existingData.unshift(payload);
        localStorage.setItem("patientData", JSON.stringify(existingData));
  
        setPatientData(existingData);
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
          message={"Patient Added successfully!"}
          responseCode={200}
          hideModal={() => setModal(false)}
        />
      ) : (
        <RightDrawer
          header={"Add Patient"}
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
                      <label className="text-gray-700 font-medium">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Enter patient name"
                        className="placeholder-gray-400 text-black border rounded-md p-2 w-full"
                      />
                      <div className="text-red-500 text-xs mt-0.5">
                        {formik.errors.name &&
                          formik.touched.name &&
                          formik.errors.name}
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-700 font-medium">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="number"
                        name="mobileNumber"
                        placeholder="Enter mobile number"
                        className="placeholder-gray-400 text-black border rounded-md p-2 w-full"
                        onChange={(e) => {
                          formik.handleChange(e);
                          if (formik.values.sameAsMobile) {
                            formik.setFieldValue("wpNumber", e.target.value);
                          }
                        }}
                      />
                      <div className="text-red-500 text-xs mt-0.5">
                        {formik.errors.mobileNumber &&
                          formik.touched.mobileNumber &&
                          formik.errors.mobileNumber}
                      </div>
                    </div>

                    {/* Checkbox - Positioned ABOVE WhatsApp Field */}

                    <div>
                      <label className="text-gray-700 font-medium">
                        WhatsApp Number <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="number"
                        name="wpNumber"
                        placeholder="Enter WhatsApp number"
                        className="placeholder-gray-400 text-black border rounded-md p-2 w-full"
                        disabled={formik.values.sameAsMobile}
                      />
                      <div className="text-red-500 text-xs mt-0.5">
                        {formik.errors.wpNumber &&
                          formik.touched.wpNumber &&
                          formik.errors.wpNumber}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 -mt-3">
                      <input
                        type="checkbox"
                        id="sameAsMobile"
                        name="sameAsMobile"
                        className="h-3 w-3 text-blue-600 border-gray-300 rounded cursor-pointer"
                        checked={formik.values.sameAsMobile}
                        onChange={(e) => {
                          formik.setFieldValue(
                            "sameAsMobile",
                            e.target.checked
                          );
                          if (e.target.checked) {
                            formik.setFieldValue(
                              "wpNumber",
                              formik.values.mobileNumber
                            );
                          }
                        }}
                      />
                      <label
                        htmlFor="sameAsMobile"
                        className="text-gray-700 text-xs"
                      >
                        Same as Mobile Number
                      </label>
                    </div>
                    <div>
                      <label className="text-gray-700 font-medium">
                        E-mail <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        name="email"
                        placeholder="Enter email id"
                        className="placeholder-gray-400 text-black border rounded-md p-2 w-full"
                      />
                      <div className="text-red-500 text-xs mt-0.5">
                        {formik.errors.email &&
                          formik.touched.email &&
                          formik.errors.email}
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-700 font-medium">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Field
                          as="textarea"
                          name="address"
                          placeholder="Enter a address"
                          className="min-h-[100px] pl-2 pr-16 border rounded-md p-2 w-full"
                        />
                        <span className="absolute bottom-2 right-2 text-xs text-gray-400">
                          {`${formik.values?.address?.length}/5000`}
                        </span>
                      </div>
                      <div className="text-red-500 text-xs mt-0.5">
                        {formik.errors.address &&
                          formik.touched.address &&
                          formik.errors.address}
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
                    Add
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
