export const leaveKeys = {
  all: ['leave'] as const,
  lists: () => [...leaveKeys.all, 'list'] as const,
  me: () => [...leaveKeys.lists(), 'me'] as const,
  mePaginated: (page: number, limit: number) => [...leaveKeys.me(), { page, limit }] as const,
}