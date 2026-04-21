'use client'
import { VenusAndMars } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ChartConfig, ChartContainer } from "../ui/chart";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

type Props = {
    male: number
    female: number
}

export function Gender({ male, female }: Props) {

const total = male + female;

const malePercent = total > 0 ? (male / total) * 100 : 0;
const femalePercent = total > 0 ? (female / total) * 100 : 0;

const data = [
  {
    name: "gender",
    male: malePercent,
    female: femalePercent,
    maleRaw: male,
    femaleRaw: female,
  },
];

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
        <Card className="w-full overflow-visible">
            <CardHeader>
                <CardTitle className="flex gap-1">
                    <VenusAndMars className="h-6 w-6" />
                    Gender Karyawan
                </CardTitle>
            </CardHeader>
            <CardContent className="pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto w-full aspect-square"
                    style={{ marginBottom: "-50%" }}
                >
                  <RadialBarChart
                    data={data}
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={100}
                  >
                    <PolarAngleAxis
                      type="number"
                      domain={[0, 100]}
                      tick={false}
                    />
                    <RadialBar
                      dataKey="male"
                      stackId="a"
                      fill="#2563eb"
                      name="Male"
                      cornerRadius={20}
                    />
                    <RadialBar
                      dataKey="female"
                      stackId="a"
                      fill="#db2777"
                      name="Female"
                      cornerRadius={20}
                    />
                  </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex justify-center gap-6 pt-0 pb-4">
                <div className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-full bg-blue-600" />
                    <span className="text-xs text-muted-foreground">
                        Male <span className="font-medium text-foreground">{male} ({malePercent.toFixed(1)}%)</span>
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-full bg-pink-600" />
                    <span className="text-xs text-muted-foreground">
                        Female <span className="font-medium text-foreground">{female} ({femalePercent.toFixed(1)}%)</span>
                    </span>
                </div>
            </CardFooter>
        </Card>
    )
}