import { EmployeeRecord } from "@/lib/types/data-karyawan";

export type DepartmentData = {
  department: string;
  total: number;
  fill: string;
};

const COLORS = [
  "#3b82f6",
  "#60a5fa",
  "#93c5fd",
  "#1d4ed8",
  "#2563eb",
];

export const mapDepartmentData = (
  data: EmployeeRecord[]
): DepartmentData[] => {
  const grouped = Object.values(
    data.reduce<Record<string, Omit<DepartmentData, "fill">>>(
      (acc, item) => {
        const dept = item.job?.department ?? "Unknown";

        if (!acc[dept]) {
          acc[dept] = { department: dept, total: 0 };
        }

        acc[dept].total += 1;

        return acc;
      },
      {}
    )
  );

  return grouped.map((item, index) => ({
  ...item,
  fill: COLORS[index % COLORS.length],
}));
};