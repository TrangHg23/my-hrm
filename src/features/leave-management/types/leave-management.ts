export type ProcessLeaveStatus = "APPROVED" | "REJECTED";

export interface ProcessLeaveRequestParams {
  id: string;
  status: ProcessLeaveStatus;
  rejectReason?: string;
}