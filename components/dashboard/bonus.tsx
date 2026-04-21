import { Award } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

type Props = {
    data: {
        employee: { fullName: string };
        job: { department: string };
    }[]
}

export default function Bonus({ data }: Props) {
    return (
        <Card className="w-full bg-blue-100">
  <CardHeader>
    <CardTitle className="text-blue-900">
        <Award className="h-6 w-6 inline-block mr-1" />
      Bonus Karyawan
    </CardTitle>
    <CardDescription className="text-blue-700">
      Karyawan dengan skor performa di atas 90
    </CardDescription>
  </CardHeader>

  <div className="px-5 pb-5">
    <Table>
      <TableHeader>
        <TableRow className="border-b border-blue-300">
          <TableHead className="text-blue-900 font-semibold">
            Nama
          </TableHead>
          <TableHead className="text-blue-900 font-semibold">
            Departemen
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="text-blue-800">
        {data.map((item, index) => (
          <TableRow
            key={index}
            className="border-b border-blue-200 hover:bg-blue-200/50 transition"
          >
            <TableCell className="py-3">
              {item.employee.fullName}
            </TableCell>
            <TableCell>
              {item.job.department}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableCaption className="text-blue-600">
        Total: {data.length} karyawan
      </TableCaption>
    </Table>
  </div>
</Card>
            
    )
}