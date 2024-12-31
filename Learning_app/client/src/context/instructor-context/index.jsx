import { createContext, useState } from "react";
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from "@/config";
import { use } from "react";

export const InstructorContext = createContext(null);

export default function InstructorProvider({ children }) {
  const [courseLandingFormData, setCourseLandingFormData] = useState(
    courseLandingInitialFormData);

  const [courseCurriculumFormDate,setCourseCurriculumFormDate] = useState(courseCurriculumInitialFormData);   

  return (
    <InstructorContext.Provider
      value={{
        courseLandingFormData,
        setCourseLandingFormData,
        courseCurriculumFormDate,setCourseCurriculumFormDate,
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
}
