export type LeaveStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface LeaveUser {
  id: string;
  name: string;
  email: string;
}

export interface LeaveRequest {
  id: string;
  userId: string;
  fromDate: string;
  toDate: string;
  startTime: string | null;
  endTime: string | null;
  isFullDay: boolean;
  reason: string;
  status: LeaveStatus;
  rejectReason: string | null;
  processedById: string | null;
  processedAt: string | null;
  createdAt: string;
  deletedAt: string | null;
  user: LeaveUser;
  processedBy: LeaveUser | null;
}

export interface LeaveMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LeaveHistoryResponse {
  data: LeaveRequest[];
  meta: LeaveMeta;
}
