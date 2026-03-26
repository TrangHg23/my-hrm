import { ProcessLeaveRequestParams } from "@/features/leave-management/types/leave-management";
import { api } from "@/lib/axios";

export const processLeaveRequestApi = async ({
  id,
  status,
  rejectReason,
}: ProcessLeaveRequestParams) => {
  const res = await api.patch(`/leave/${id}/process`, {
    status,
    rejectReason,
  });

  return res.data;
};
