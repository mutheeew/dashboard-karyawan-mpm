import { EmployeeRecord } from "@/lib/types/data-karyawan";

export type MaritalData = {
  maritalStatus: string;
  total: number;
  fill: string;
};

const COLORS = [
  "#3b82f6",
  "#60a5fa",
];

export const mapMaritalData = (
  data: EmployeeRecord[]
): MaritalData[] => {
  const grouped = Object.values(
    data.reduce<Record<string, Omit<MaritalData, "fill">>>(
      (acc, item) => {
        const maritalStatus = item.employee?.maritalStatus ?? "Unknown";
        console.log(maritalStatus)

        if (!acc[maritalStatus]) {
          acc[maritalStatus] = { maritalStatus: maritalStatus, total: 0 };
        }

        acc[maritalStatus].total += 1;

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