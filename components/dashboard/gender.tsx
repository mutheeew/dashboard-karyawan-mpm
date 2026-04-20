'use client'
import { Users, VenusAndMars } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { RadialBar, RadialBarChart } from "recharts";

type Props = {
    male: number
    female: number
}

export function Gender({ male, female }: Props) {

    const chartData = [
        { male: male, female: female},
        // { gender: "female", total: female}
    ]

    const chartConfig = {
        male: {
            label: "Male",
            color: "#021A54",
        },
        female: {
            label: "Female",
            color: "#FF85BB",
        },
    } satisfies ChartConfig

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex gap-1">
                    <VenusAndMars className="h-6 w-6" />
                    Gender Karyawan
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-62.5"
                >
                    <RadialBarChart
                        data={chartData}
                        endAngle={180}
                        innerRadius={80}
                        outerRadius={110}
                    >
                        <RadialBar
                            dataKey="male"
                            fill="#021A54"
                            stackId="a"
                            cornerRadius={5}
                            className="stroke-transparent stroke-2"
                        />
                        <RadialBar
                            dataKey="female"
                            fill="#FF85BB"
                            stackId="a"
                            cornerRadius={5}
                            className="stroke-transparent stroke-2"
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}