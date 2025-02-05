"use client";
import React from "react";

import FilterTab from "@/components/FilterTab";
import ListView from "@/components/ListView/ListView";

const DRCard = ({ setScheduled, data, setPatientData }) => {
  return (
    <>
      <FilterTab
        isTitle
        isSearch
        isFilter
        isTitleName={"Available Doctors"}
        isTitleLeftArrow
        handleTitleLeftArrowClick={() => setScheduled(false)}
      />

      <ListView patientData={data} setPatientData={setPatientData} />
    </>
  );
};

export default DRCard;
