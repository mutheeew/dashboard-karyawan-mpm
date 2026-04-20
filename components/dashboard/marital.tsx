"use client"
import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
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

type Props = {
  data: MaritalData[]
  dateRange?: string 
}

export function MaritalChart({ 
  data, 
  dateRange,
}: Props) {
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      total: {
        label: "Total Karyawan",
      },
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

  const largestDept = React.useMemo(() => {
    if (data.length === 0) return null
    return data.reduce((max, curr) => 
      curr.total > max.total ? curr : max
    )
  }, [data])

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Status Perkawinan</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent 
                  hideLabel
                //   hideIndicator={true}
                  className="w-auto"
                />
              }
            />
            <Pie
              data={data}
              dataKey="total"
              nameKey="department"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalKaryawan.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Karyawan
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}