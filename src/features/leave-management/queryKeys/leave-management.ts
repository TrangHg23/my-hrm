export const leaveManagementKeys = {
  all: ['admin-leave'] as const,
  lists: () => [...leaveManagementKeys.all, 'list'] as const,
  listPaginated: (page: number, limit: number) => [...leaveManagementKeys.lists(), { page, limit }] as const,
  pendingCount: () => [...leaveManagementKeys.all, 'pending-count'] as const,
};
