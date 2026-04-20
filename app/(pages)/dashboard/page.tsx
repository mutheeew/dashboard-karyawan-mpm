import { Count } from "@/components/dashboard/count";
import { DepartmentChart } from "@/components/dashboard/department";
import { Gender } from "@/components/dashboard/gender";
import { MaritalChart } from "@/components/dashboard/marital";
import { Salary } from "@/components/dashboard/salary";
import { Status } from "@/components/dashboard/status";
import { getDataKaryawan } from "@/lib/api/data-karyawan";
import { mapDepartmentData } from "@/lib/utils/dashboard/department";
import { mapMaritalData } from "@/lib/utils/dashboard/marital";

export default async function Page() {
  const res = await getDataKaryawan()
  const departmentData = mapDepartmentData(res.data)
  const totalKaryawan = res.data.length
  const permanentCount = res.data.filter(k => k.job.employmentStatus === "permanent").length
  const contractCount = res.data.filter(k => k.job.employmentStatus === "contract").length
  const maleCount = res.data.filter(k => k.employee.gender === "male").length
  const femaleCount = res.data.filter(k => k.employee.gender === "female").length
  const maritalData = mapMaritalData(res.data)
  console.log(maritalData)
  const salaryMax = res.data.reduce((max, curr) => 
    curr.payroll.netSalary > max ? curr.payroll.netSalary : max
  , 0)
  const salaryMin = res.data.reduce((min, curr) => 
    curr.payroll.netSalary < min ? curr.payroll.netSalary : min
  , Infinity)
 
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 gap-3">
        <Count count={totalKaryawan} />
        <Status permanent={permanentCount} contract={contractCount} />
        <Salary salaryMax={salaryMax} salaryMin={salaryMin} />
      </div>
      <div className="flex gap-3 mt-5">
        <Gender male={maleCount} female={femaleCount} />
        <MaritalChart data={maritalData}/>
      </div>
      <div className="mt-5">
        <DepartmentChart data={departmentData} />
      </div>
    </div>
  )
}
 