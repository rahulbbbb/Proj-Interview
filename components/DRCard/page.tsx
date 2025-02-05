'use client'
import React, { useState } from "react";

import FilterTab from "@/components/FilterTab";
import ListView from "@/components/ListView/ListView";





const DRCard = ({
  setScheduled,
  data,
 
}) => {
  const [expandedMonths, setExpandedMonths] = useState({});
  const [moreInspectionData, setMoreInspectionData] = useState(false);
  const [addPlanInspectionForm, setAddPlanInspectionForm] = useState(false);
  // const [scheduledForm, setScheduledForm] = useState(false);


  const [selectedYear, setSelectedYear] = useState(null);

  const [selectedMonthData, setSelectedMonthData] = useState(null);
  const [month, setMonth] = useState(null);




console.log(data)
 
  

  return (
    <>
      <FilterTab
        isTitle
        isTitleName={"Available Doctors"}
        isTitleLeftArrow
        handleTitleLeftArrowClick={() => setScheduled(false)}
      />

      <ListView patientData={data}/>
    </>
  );
};

export default DRCard;
