export const mockEmployees = Array.from({ length: 15 }, (_, i) => ({
  id: `94731f84-1d2b-4ef2-980c-1771bf0da113-${i}`,
  email: `employee${i + 1}@company.com`,
  role: "EMPLOYEE",
  name: `Đặng Sơn ${i + 1}`,
  phone: i % 2 === 0 ? "0901234567" : null,
  creatorId: "935a63db-5a1e-4f71-999c-89d6c3474e7e",
  createdAt: new Date(2025, 0, i + 1).toISOString(),
  updatedAt: new Date(2025, 0, i + 1).toISOString(),
}));
