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
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Bonus Recipients</CardTitle>
                <CardDescription>Karyawan dengan skor performa di atas 90</CardDescription>
            </CardHeader>
            <div className="px-5">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Departemen</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.employee.fullName}</TableCell>
                            <TableCell>{item.job.department}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </div>
            
        </Card>
            
    )
}