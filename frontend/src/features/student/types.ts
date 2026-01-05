export interface Mentor {
  name: string;
  email: string;
  discordLink: string;
  expertise: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string; // profile image
  mentor: Mentor;
  progress: number;
  courseName: string;
  courseUrl: string;
  liveClassUrl: string;
}
