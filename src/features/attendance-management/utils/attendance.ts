import { AdminAttendanceRecord } from "../types/attendance-management";

export const getStatusConfig = (status: AdminAttendanceRecord["status"]) => {
  switch (status) {
    case "present":
      return {
        label: "Đi làm",
        classes: "bg-green-100 text-green-700 hover:bg-green-100 border-green-200",
      };
    case "leave":
      return {
        label: "Nghỉ phép",
        classes: "bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200",
      };
    case "absent":
      return {
        label: "Vắng mặt",
        classes: "bg-red-100 text-red-700 hover:bg-red-100 border-red-200",
      };
    default:
      return {
        label: "Không xác định",
        classes: "bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200",
      };
  }
};
