import { DepartmentChart } from "@/components/dashboard/department";
import { getDataKaryawan } from "@/lib/api/data-karyawan";
import { mapDepartmentData } from "@/lib/utils/dashboard/department";

export default async function Page() {
  const res = await getDataKaryawan()

  const departmentData = mapDepartmentData(res.data)
 
  return (
    <div className="p-6">
      <DepartmentChart data={departmentData} />
    </div>
  )
}
 