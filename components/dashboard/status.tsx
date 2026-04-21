import { FileUser } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

type Props = {
    permanent: number
    contract: number
}

export function Status({ permanent, contract }: Props) {
    const total = permanent + contract
    const permanentPercent = total > 0 ? (permanent / total) * 100 : 0
    const contractPercent = total > 0 ? (contract / total) * 100 : 0

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex gap-1">
                    <FileUser className="h-6 w-6" />
                    Status Karyawan
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center mb-2">
                    <div>
                        <span className="text-primary">Permanent: {permanent} ({Math.round(permanentPercent)}%)</span>
                    </div>
                    <div>
                        <span className="text-secondary">Contract: {contract} ({Math.round(contractPercent)}%)</span>
                    </div>
                </div>
                <div className="w-full h-5 bg-muted rounded-full relative overflow-hidden">
                    <div
                        className="bg-primary h-full absolute left-0 top-0 transition-all duration-300"
                        style={{ width: `${permanentPercent}%` }}
                    ></div>
                    <div
                        className="bg-secondary h-full absolute top-0 transition-all duration-300"
                        style={{ left: `${permanentPercent}%`, width: `${contractPercent}%` }}
                    ></div>
                </div>
            </CardContent>
        </Card>
    )
}