import StudentLayout from "../../../layout/StudentLayout";

import CourseInfoCard from "../components/CourseInfoCard";
import { mockStudent } from "../mockStudentData";

const Overview=()=>{
    return(
        <StudentLayout student={mockStudent}>
            <h1 className="text-2xl font-semibold mb-6">
                Dashboard Overview
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* <StudentProfileCard student={mockStudent}/> */}
                <CourseInfoCard student={mockStudent}/>
            </div>
        </StudentLayout>
    );
};

export default Overview;