import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { courseCurriculumInitialFormData } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { useContext } from "react";

function CourseCurriculum() {
  const { courseCurriculumFormDate, setCourseCurriculumFormDate } =
    useContext(InstructorContext);

    function handleNewLecture(){
      setCourseCurriculumFormDate([
        ...courseCurriculumFormDate,
        {
          ...courseCurriculumInitialFormData[0],
        }
      ])
    };
    

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleNewLecture}>Add Lecture</Button>
        <div className="mt-4 space-y-4">
          {
          courseCurriculumFormDate.map((curriculumItem,index) => (
            <div className="border p-5 rounded-md">
              <div className="flex gap-5 items-center">
                <h3 className="font-semibold">
                  Lecture {index + 1}
                </h3>
                <Input 
                name={`title -${index + 1}`}
                placeholder="Enter lecture title"
                className="max-w-96"
                />
                <div className="flex items-center space-x-2">
                  <Switch 
                  checked={false}
                  id={`freePreview -${index + 1}`}
                  />
                  <Label htmlForm={`freePreview -${index + 1}`}>Free Preview</Label>
                </div>
              </div>
              <div className="mt-6">
                <Input type="file" accept="video/*" className="mb-4"/>
              </div>
            </div>
          ))
          }
          </div>
      </CardContent>
    </Card>
  );
}

export default CourseCurriculum;
