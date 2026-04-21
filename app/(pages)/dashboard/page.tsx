import Bonus from "@/components/dashboard/bonus";
import { DepartmentChart } from "@/components/dashboard/department";
import { Gender } from "@/components/dashboard/gender";
import { MaritalChart } from "@/components/dashboard/marital";
import { Salary } from "@/components/dashboard/salary";
import { getDataKaryawan } from "@/lib/api/data-karyawan";
import getBonusRecipients from "@/lib/utils/dashboard/bonus";
import { mapDepartmentData } from "@/lib/utils/dashboard/department";
import { mapMaritalData } from "@/lib/utils/dashboard/marital";
import { Users } from "lucide-react";

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

  const bonus = getBonusRecipients(res.data)

  const total = permanentCount + contractCount
    const permanentPercent = total > 0 ? (permanentCount / total) * 100 : 0
    const contractPercent = total > 0 ? (contractCount / total) * 100 : 0

 
  return (
    <div className="p-6">
      <div>
        <div className="flex flex-col gap-3">
          <div className="w-full p-5 md:w-1/2">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 p-2 rounded-md">
                <Users className="h-6 w-6  text-white" />
              </div>
              
              <div className="font-heading text-sm font-medium">Total Karyawan</div>
            </div>
            <div className="ms-10">
              <h1 className="text-5xl ps-7 font-bold text-blue-600">{totalKaryawan}</h1>
            </div>
            
            <div className="mt-5 py-5">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="text-blue-600 text-xs">Permanent {permanentCount} ({Math.round(permanentPercent)}%)</span>
                </div>
                <div>
                  <span className="text-orange-600 text-xs">Contract {contractCount} ({Math.round(contractPercent)}%)</span>
                </div>
              </div>
              <div className="w-full h-7 bg-muted rounded-full relative overflow-hidden">
                <div
                    className="bg-blue-600 h-full absolute left-0 top-0 transition-all duration-300"
                    style={{ width: `${permanentPercent}%` }}
                ></div>
                <div
                    className="bg-orange-600 h-full absolute top-0 transition-all duration-300"
                    style={{ left: `${permanentPercent}%`, width: `${contractPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="grid w-full gap-3 md:grid-cols-3">
            <Gender male={maleCount} female={femaleCount} />
            <MaritalChart data={maritalData}/>
            <Salary salaryMax={salaryMax} salaryMin={salaryMin} />
          </div>
        </div>

        
      </div>
      {/* <div className="flex items-center justify-between mb-6 gap-3">
        <Count count={totalKaryawan} />
        <Status permanent={permanentCount} contract={contractCount} />
        <Salary salaryMax={salaryMax} salaryMin={salaryMin} />
      </div>
      <div className="flex gap-3 mt-5">
        <Gender male={maleCount} female={femaleCount} />
        <MaritalChart data={maritalData}/>
      </div> */}
      <div className="grid gap-3 mt-5 md:grid-cols-2">
        <DepartmentChart data={departmentData} />
        <Bonus data={bonus} />
      </div>
    </div>
  )
}
 