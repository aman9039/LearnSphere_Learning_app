import { createContext, useState } from "react";
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from "@/config";


export const InstructorContext = createContext(null);

export default function InstructorProvider({ children }) {
  const [courseLandingFormData, setCourseLandingFormData] = useState(
    courseLandingInitialFormData);

  const [courseCurriculumFormDate,setCourseCurriculumFormDate] = useState(courseCurriculumInitialFormData);   

  const [mediaUploadProgress,setMediaUploadProgress] = useState(false);

  const [mediaUploadProgressPercentage ,setMediaUploadProgressPercentage] = useState(0);

  return (
    <InstructorContext.Provider
      value={{
        courseLandingFormData,
        setCourseLandingFormData,
        courseCurriculumFormDate,setCourseCurriculumFormDate,
        mediaUploadProgress,
        setMediaUploadProgress,
        mediaUploadProgressPercentage ,
        setMediaUploadProgressPercentage
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
};
