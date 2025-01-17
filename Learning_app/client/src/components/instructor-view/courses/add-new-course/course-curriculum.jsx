import MediaProgressbar from "@/components/media-progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { courseCurriculumInitialFormData } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { mediaUploadService } from "@/services";
import { useContext } from "react";

function CourseCurriculum() {
  const {
    courseCurriculumFormDate,
    setCourseCurriculumFormDate,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage ,
    setMediaUploadProgressPercentage
  } = useContext(InstructorContext);

  // Handle new lecture add
  function handleNewLecture() {
    setCourseCurriculumFormDate([
      ...courseCurriculumFormDate,
      {
        ...courseCurriculumInitialFormData[0],
      },
    ]);
  };
  // Handle course Title Change
  function handleCourseTitleChange(event, currentIndex) {
    let copyCourseCurriculumFormData = [...courseCurriculumFormDate];
    copyCourseCurriculumFormData[currentIndex] = {
      ...copyCourseCurriculumFormData[currentIndex],
      title: event.target.value,
    };
    setCourseCurriculumFormDate(copyCourseCurriculumFormData);
  }

  // Handle free preview change
  function handleFreePreviewChange(currentValue, currentIndex) {
    let copyCourseCurriculumFormData = [...courseCurriculumFormDate];
    copyCourseCurriculumFormData[currentIndex] = {
      ...copyCourseCurriculumFormData[currentIndex],
      freePreview: currentValue,
    };
    setCourseCurriculumFormDate(copyCourseCurriculumFormData);
  };

  // Handle single lecture upload
  async function handleSingleLectureUpload(event, currentIndex) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const videoFormData = new FormData();
      videoFormData.append("file", selectedFile);

      try {
        setMediaUploadProgress(true);
        const response = await mediaUploadService(videoFormData,setMediaUploadProgressPercentage);
        
        if (response.success) {
          let copyCourseCurriculumFormData = [...courseCurriculumFormDate];
          copyCourseCurriculumFormData[currentIndex] = {
            ...copyCourseCurriculumFormData[currentIndex],
            videoUrl: response?.data?.url,
            public_id: response?.data?.public_id,
          };
          setCourseCurriculumFormDate(copyCourseCurriculumFormData);
          setMediaUploadProgress(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  console.log(courseCurriculumFormDate);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleNewLecture}>Add Lecture</Button>
        {
          mediaUploadProgress ? (<MediaProgressbar
          isMediaUploading={mediaUploadProgress}
          progress={mediaUploadProgressPercentage}
          />) : null
        }
        <div className="mt-4 space-y-4">
          {courseCurriculumFormDate.map((curriculumItem, index) => (
            <div key={`lecture-${index}`} className="border p-5 rounded-md">
              <div className="flex gap-5 items-center">
                <h3 className="font-semibold">Lecture {index + 1}</h3>
                <Input
                  name={`title -${index + 1}`}
                  placeholder="Enter lecture title"
                  className="max-w-96"
                  onChange={(event) => handleCourseTitleChange(event, index)}
                  value={courseCurriculumFormDate[index]?.title }
                  // Ensure a defined value
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    onCheckedChange={(value) =>
                      handleFreePreviewChange(value, index)
                    }
                    checked={
                      courseCurriculumFormDate[index]?.freePreview 
                    }
                    // Ensure a boolean value
                    id={`freePreview -${index + 1}`}
                  />

                  <Label htmlFor={`freePreview -${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
              </div>
              <div className="mt-6">
                <Input
                  type="file"
                  accept="video/*"
                  onChange={(event) => handleSingleLectureUpload(event, index)}
                  className="mb-4"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseCurriculum;
