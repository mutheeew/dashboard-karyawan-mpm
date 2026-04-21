"use client"
import * as React from "react"
import { Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { MaritalData } from "@/lib/utils/dashboard/marital"
import { Flower2 } from "lucide-react"

type Props = {
  data: MaritalData[]
  dateRange?: string
}

export function MaritalChart({ data, dateRange }: Props) {
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      total: { label: "Total Karyawan" },
    }
    data.forEach((item) => {
      config[item.maritalStatus] = {
        label: item.maritalStatus,
        color: item.fill,
      }
    })
    return config
  }, [data])

  const totalKaryawan = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.total, 0)
  }, [data])

  return (
    <Card className="flex flex-col w-full overflow-visible">
      <CardHeader className="items-start px-4">
        <CardTitle className="flex gap-1">
          <Flower2 className="h-6 w-6" />
          Status Perkawinan
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-full aspect-square"
          style={{ marginBottom: "-20%", marginTop: "-15%", maxHeight: 180 }}
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="total"
              nameKey="maritalStatus"
              innerRadius={50}
              outerRadius={80}
              strokeWidth={3}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex justify-center gap-6 pt-0 pb-4">
        {data.map((item) => (
          <div key={item.maritalStatus} className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: item.fill }}
            />
            <span className="text-sm text-muted-foreground">
              {item.maritalStatus} —{" "}
              <span className="font-medium text-foreground">
                {item.total} ({totalKaryawan > 0 ? ((item.total / totalKaryawan) * 100).toFixed(1) : 0}%)
              </span>
            </span>
          </div>
        ))}
      </CardFooter> */}
    </Card>
  )
}