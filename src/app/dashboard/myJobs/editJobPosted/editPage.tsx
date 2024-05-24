'use client'
import { useState } from "react";

import jobRegistrationForm from "../createJob/forms";
function EditPage(data){
    const [formData, setFormData] = useState(
        {eventName:data.eventName,
        createDateStart:data.createDateStart,
        createDateEnd:data.createDateEnd,
        createJob0:data.createJob0,
        createJob1:data.createJob1, 
        createLoc0:data.createLoc0,
        createLoc:data.createLoc,
        createWageType:data.createWageType,
        createWageTypeVal:data.createWageTypeVal,
        createDescription:data.createDescription})
    return(
        <>
        {jobRegistrationForm(formData)}
        </>
    )
}

export default EditPage;