import { Card, CardContent } from "@/components/ui/card"
import { EmployeeDetails, Job } from "@/lib/types/data-karyawan"
import Image from "next/image"

type props = {
    employee: EmployeeDetails
    job: Job
}
export default function Summary( { employee, job }: props) {
    return(
        <Card>
            <div className="flex justify-between p-5">
                <div className="flex">
                    <Image
                        src={employee?.profilePhotoUrl ?? "/default-profile.png"}
                        alt="Profile Picture"
                        width={150}
                        height={150}
                        className="rounded-full mx-auto"
                    />
                    <CardContent>
                        <h2 className="text-xl font-bold">{employee?.fullName ?? 'Nama tidak tersedia'}</h2>
                        <p className="">{employee?.employeeId ?? 'ID tidak tersedia'}</p>
                        <p className="text-xs">{job.position}{' . '}{job?.department}{' . '}{job?.level}</p>
                        <div className="grid grid-cols-2 pt-5">
                            <p>{employee?.address?.city?? 'Kota tidak tersedia'}{', '}{employee?.address?.province?? 'Provinsi tidak tersedia'}</p>
                            <p>Bergabung {job?.joinDate}</p>
                        </div>
                    
                    </CardContent>
                </div>
                <div>
                    icon dan icon
                </div>
            </div>
        </Card>
    )
}