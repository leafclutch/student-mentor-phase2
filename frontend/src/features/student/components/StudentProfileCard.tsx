import { useState } from "react";
import type { Student } from "../types";

type Props = {
  student: Student;
};

const StudentProfileCard = ({ student }: Props) => {
  // Local state for profile image
  const [avatar, setAvatar] = useState(student.avatar);

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a temporary preview URL
    const imageUrl = URL.createObjectURL(file);
    setAvatar(imageUrl);

    // Later (backend):
    // upload image → get URL → save in DB
  };

  return (
    <div className="flex flex-col items-center text-center pb-4 border-b">
      {/* Profile Image */}
      <div className="relative">
        <img
          src={avatar}
          alt="Student Avatar"
          className="w-20 h-20 rounded-full object-cover"
        />

        {/* Edit Button */}
        <label className="absolute bottom-0 right-0 bg-indigo-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center cursor-pointer">
          ✎
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Student Info */}
      <div>
        <p className="mt-3 font-semibold">{student.name}</p>
        <p className="text-xs text-gray-500">STD ID: {student.id}</p>
      </div>
    </div>
  );
};

export default StudentProfileCard;
