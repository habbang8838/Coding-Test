export type Exam = {
  id: string;
  title: string;
  startsAtISO: string;
  durationMin: number;
  lobbyOpenOffsetMin: number;
  lobbyCloseOffsetMin: number;
};

export type Registration = {
  examId: string;
  userId: string;
  emailVerified: boolean;
  pretestPassed: boolean;
  webcamRequired: boolean;
};