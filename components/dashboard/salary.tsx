import { Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

type Props = {
    salaryMax: number
    salaryMin: number
}

export function Salary({ salaryMax, salaryMin }: Props) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex gap-1">
                    <Users className="h-6 w-6" />
                    Gaji Maksimum dan Minimum (IDR)
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div>
                    <span>Gaji Maksimum: </span>
                    <span className="font-bold">{salaryMax.toLocaleString("id-ID")}</span>
                </div>
                <div>
                    <span>Gaji Minimum: </span>
                    <span className="font-bold">{salaryMin.toLocaleString("id-ID")}</span>
                </div>
            </CardContent>
        </Card>
    )
}