import { mapAttendance } from "@/features/attendance/types/attendance";
import { api } from "@/lib/axios";

export const checkInCheckOutApi = async () => {
  const res = await api.post("/attendance/punch");
  return mapAttendance(res.data);
};

