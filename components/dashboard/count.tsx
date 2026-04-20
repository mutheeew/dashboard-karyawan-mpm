import { Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

type Props = {
    count: number
}

export function Count({ count }: Props) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex gap-1">
                    <Users className="h-6 w-6" />
                    Total Karyawan
                </CardTitle>
            </CardHeader>
            <CardContent>
                <h1 className="text-3xl font-bold text-center">{count}</h1>
            </CardContent>
        </Card>
    )
}