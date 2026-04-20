import { FileUser } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Progress } from "../ui/progress"

type Props = {
    permanent: number
    contract: number
}

export function Status({ permanent, contract }: Props) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex gap-1">
                    <FileUser className="h-6 w-6" />
                    Status Karyawan
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center">
                    <span>Contract</span>
                    <div>
                        <span className="ml-auto">{contract}</span>
                        <span className="text-muted-foreground">
                            {`(${Math.round((contract / (permanent + contract)) * 100) || 0}%)`}
                        </span>
                    </div>
                </div>
                <Progress value={permanent} id="permanent" className="w-full h-5"/>

                <div className="flex justify-between items-center mt-5">
                    <span>Permanent</span>
                    <div>
                        <span className="ml-auto">{permanent}</span>
                        <span className="text-muted-foreground">
                            {`(${Math.round((permanent / (permanent + contract)) * 100) || 0}%)`}
                        </span>
                    </div>
                </div>
                <Progress value={permanent} id="permanent" className="w-full h-5"/>
            </CardContent>
        </Card>
    )
}