import LabelName from "@/components/label-name";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bank, EmployeeDetails, Job, Legal, Payroll, Performance } from "@/lib/types/data-karyawan";
import Image from "next/image";

type props = {
    data: EmployeeDetails | null
    job: Job | null
    bank: Bank | null
    legal: Legal | null
    performance: Performance | null
    payroll: Payroll | null
}
export default function PersonalDataJob({ data, job, bank, legal, performance, payroll }: props) {
    function calculateTotalIncome() {
        if (!payroll) return undefined

        const { baseSalary, allowances, bonus } = payroll
        const totalAllowances = Object.values(allowances).reduce((sum, allowance) => sum + (allowance ?? 0), 0)
        return baseSalary + totalAllowances + (bonus ?? 0)
    }

    const totalIncome = calculateTotalIncome()
    return (
        <>
            <Card>
                <div className="flex justify-between p-5">
                    <div className="flex">
                        <Image
                            src={data?.profilePhotoUrl ?? "/default-profile.png"}
                            alt="Profile Picture"
                            width={150}
                            height={150}
                            className="rounded-full mx-auto"
                        />
                        <CardContent>
                            <h2 className="text-xl font-bold">{data?.fullName ?? 'Nama tidak tersedia'}</h2>
                            <p className="">{data?.employeeId ?? 'ID tidak tersedia'}</p>
                            <p className="text-xs">{job?.position}{' . '}{job?.department}{' . '}{job?.level}</p>
                            <div className="grid grid-cols-2 pt-5">
                                <p>{data?.address?.city?? 'Kota tidak tersedia'}{', '}{data?.address?.province?? 'Provinsi tidak tersedia'}</p>
                                <p>Bergabung {job?.joinDate}</p>
                            </div>
                        
                        </CardContent>
                    </div>
                </div>
            </Card>
            <div className="flex gap-4">
                <div className="w-1/2 mt-5">
                    <Card>
                        <CardHeader>
                            <CardTitle>Data Pribadi</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <LabelName label="NIK" value={data?.nik ?? 'NIK tidak tersedia'} />
                            <LabelName label="Nama Lengkap" value={data?.fullName ?? 'Nama tidak tersedia'} />
                            <LabelName label="Tempat Lahir" value={data?.birthPlace ?? 'Tempat lahir tidak tersedia'} />
                            <LabelName label="Tanggal Lahir" value={data?.birthDate ? new Date(data.birthDate).toLocaleDateString("id-ID") : 'Tanggal lahir tidak tersedia'} />
                            <LabelName label="Jenis Kelamin" value={data?.gender === "female" ? "Wanita" : "Pria"} />
                            <LabelName label="Agama" value={data?.religion ?? 'Agama tidak tersedia'} />
                            <LabelName label="Status Pernikahan" value={data?.maritalStatus === "single" ? "Belum Menikah" : "Menikah"} />
                            <LabelName label="Jumlah Anak" value={data?.numberOfChildren !== undefined ? String(data.numberOfChildren) : 'Jumlah anak tidak tersedia'} />
                        </CardContent>
                    </Card>

                    <Card className="mt-5">
                        <CardHeader>
                            <CardTitle>Pekerjaan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <LabelName label="Department" value={job?.department ?? 'Departemen tidak tersedia'} />
                            <LabelName label="Jabatan" value={job?.position ?? 'Jabatan tidak tersedia'} />
                            <LabelName label="Level" value={job?.level ?? 'Level tidak tersedia'} />
                            <LabelName label="Status" value={job?.employmentStatus === "permanent" ? "Tetap" : "Kontrak"} />
                            <LabelName label="Tanggal Masuk" value={job?.joinDate ? new Date(job.joinDate).toLocaleDateString("id-ID") : 'Tanggal masuk tidak tersedia'} />
                            <LabelName label="Nama Atasan" value={job?.directSupervisor ?? 'Nama atasan tidak tersedia'} />
                            <LabelName label="Lokasi Kerja" value={job?.workLocation ?? 'Lokasi kerja tidak tersedia'} />
                            <LabelName label="Shift Kerja" value={job?.shift ?? 'Shift kerja tidak tersedia'} />
                        </CardContent>
                    </Card>
                </div>
                <div className="w-1/2 mt-5">
                    <Card>
                        <CardHeader>
                            <CardTitle>Kontak dan Alamat</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <LabelName label="Email" value={data?.email ?? 'Email tidak tersedia'} />
                            <LabelName label="No HP" value={data?.phoneNumber ?? 'No HP tidak tersedia'} />
                            <LabelName label="Alamat" value={data?.address?.street ?? 'Alamat tidak tersedia'} />
                            <LabelName label="Kota" value={data?.address?.city ?? 'Kota tidak tersedia'} />
                            <LabelName label="Provinsi" value={data?.address?.province ?? 'Provinsi tidak tersedia'} />
                            <LabelName label="Kode Pos" value={data?.address?.postalCode ?? 'Kode pos tidak tersedia'} />
                        </CardContent>
                    </Card>

                    <Card className="mt-5">
                        <CardHeader>
                            <CardTitle>Data Bank</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <LabelName label="Bank" value={bank?.bankName ?? 'Nama bank tidak tersedia'} />
                            <LabelName label="No Rekening" value={bank?.accountNumber ?? 'No rekening tidak tersedia'} />
                            <LabelName label="Atas Nama" value={bank?.accountHolderName ?? 'Atas nama tidak tersedia'} />
                        </CardContent>
                    </Card>

                    <Card className="mt-5">
                        <CardHeader>
                            <CardTitle>Data Legal Dokumen</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <LabelName label="No NPWP" value={legal?.npwp ?? 'No NPWP tidak tersedia'} />
                            <LabelName label="No BPJS Kesehatan" value={legal?.bpjsHealth ?? 'No BPJS Kesehatan tidak tersedia'} />
                            <LabelName label="No BPJS Ketenagakerjaan" value={legal?.bpjsEmployment ?? 'No BPJS Ketenagakerjaan tidak tersedia'} />
                            <LabelName label="Status Kontrak" value={legal?.contractStatus ?? 'Status kontrak tidak tersedia'} />
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="mt-5">
                <Card>
                    <CardHeader>
                        <CardTitle>Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <LabelName label="Performance Score" value={performance?.performanceScore !== undefined ? String(performance.performanceScore) : 'Performance score tidak tersedia'} />
                        <LabelName label="Performance Grade" value={performance?.performanceGrade ?? 'Performance grade tidak tersedia'} />
                        <LabelName label="KPI Target" value={performance?.kpiTarget !== undefined ? String(performance.kpiTarget) : 'KPI target tidak tersedia'} />
                        <LabelName label="KPI Achievement" value={performance?.kpiAchievement !== undefined ? String(performance.kpiAchievement) : 'KPI achievement tidak tersedia'} />
                        <LabelName label="Last Review Date" value={performance?.lastReviewDate ? new Date(performance.lastReviewDate).toLocaleDateString("id-ID") : 'Tanggal review tidak tersedia'} />
                    </CardContent>
                </Card>
            </div>
            <div className="mt-5">
                <Card>
                    <CardHeader>
                        <CardTitle>Salary</CardTitle>
                    </CardHeader>
                    <CardContent className="flex gap-7">
                        <div className="w-1/2">
                            <LabelName label="Gaji Pokok" value={payroll?.baseSalary !== undefined ? `Rp ${payroll.baseSalary.toLocaleString("id-ID")}` : 'Gaji pokok tidak tersedia'} />
                            <div className="flex gap-2">
                                <p>Tunjangan</p>
                                <div className="w-full">
                                    <LabelName label="Tunjangan Transportasi" value={payroll?.allowances.transport !== undefined ? `Rp ${payroll.allowances.transport.toLocaleString("id-ID")}` : 'Tunjangan transportasi tidak tersedia'} />
                                    <LabelName label="Tunjangan Makan" value={payroll?.allowances.meal !== undefined ? `Rp ${payroll.allowances.meal.toLocaleString("id-ID")}` : 'Tunjangan makan tidak tersedia'} />
                                    <LabelName label="Tunjangan Posisi" value={payroll?.allowances.position !== undefined ? `Rp ${payroll.allowances.position.toLocaleString("id-ID")}` : 'Tunjangan posisi tidak tersedia'} />
                                </div>
                            </div>
                            <LabelName label="Bonus" value={payroll?.bonus !== undefined ? `Rp ${payroll.bonus.toLocaleString("id-ID")}` : 'Bonus tidak tersedia'} />
                            <hr/>
                            <LabelName label="Total Pendapatan" value={totalIncome !== undefined ? `Rp ${totalIncome.toLocaleString("id-ID")}` : 'Total pendapatan tidak tersedia'} />
                        </div>
                        <div className="w-1/2">
                            <LabelName label="Potongan BPJS" value={payroll?.deductions.bpjs !== undefined ? `Rp ${payroll.deductions.bpjs.toLocaleString("id-ID")}` : 'Potongan BPJS tidak tersedia'} />
                            <LabelName label="Potongan Pajak" value={payroll?.deductions.tax !== undefined ? `Rp ${payroll.deductions.tax.toLocaleString("id-ID")}` : 'Potongan Pajak tidak tersedia'} />
                            <hr/>
                            <LabelName label="Total Potongan" value={payroll ? `Rp ${(payroll.deductions.bpjs + payroll.deductions.tax).toLocaleString("id-ID")}` : 'Total potongan tidak tersedia'} />

                            <LabelName label="Net Salary" value={payroll ? `Rp ${(totalIncome - (payroll.deductions.bpjs + payroll.deductions.tax)).toLocaleString("id-ID")}` : 'Gaji bersih tidak tersedia'} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
        
    )
}