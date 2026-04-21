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
                    Max - Min Salary (IDR)
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div>
                    <p>Max Salary </p>
                    <p className="font-bold text-xl bg-teal-600 text-teal-50 py-2 text-center rounded-xl">Rp {salaryMax.toLocaleString("id-ID")}</p>
                </div>
                <div className="mt-5">
                    <p>Min Salary </p>
                    <p className="font-bold text-xl bg-orange-600 text-amber-50 py-2 text-center rounded-xl">Rp {salaryMin.toLocaleString("id-ID")}</p>
                </div>
            </CardContent>
        </Card>
    )
}