export type ProctorEvent = {
  examId: string;
  userId: string;
  event_type:
    | "FOCUS_OUT"
    | "WINDOW_BLUR"
    | "FULLSCREEN_ENTER"
    | "FULLSCREEN_EXIT"
    | "CAMERA_ON"
    | "CAMERA_OFF";
  event_detail: any;
};