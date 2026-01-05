import type { Student } from "./types";

export const mockStudent: Student = {
  id: "26STD001",
  name: "Alex Johnson",
  email: "alex@student.com",
  avatar: "https://i.pravatar.cc/150?img=12",
  progress: 25,
  courseName: "Web Development Course",
  courseUrl: "https://course-url.com",
  liveClassUrl: "https://course-url.com/meet/xyz-abc",
  mentor: {
    name: "Sarah Connor",
    expertise: "Senoir Dev",
    email: "mentor@example.com",
    discordLink: "https://discord.gg/example",
  },
};
