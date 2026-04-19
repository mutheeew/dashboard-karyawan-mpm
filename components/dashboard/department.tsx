"use client"
import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
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
import { DepartmentData } from "@/lib/utils/dashboard/department"

type Props = {
  data: DepartmentData[]
  dateRange?: string // Optional: e.g., "Januari - Juni 2024"
  showTrendingUp?: boolean // Optional: default true
}

export function DepartmentChart({ 
  data, 
  dateRange,
  showTrendingUp = true 
}: Props) {
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      total: {
        label: "Total Karyawan",
      },
    }
    data.forEach((item) => {
      config[item.department] = {
        label: item.department,
        color: item.fill,
      }
    })
    return config
  }, [data])

  const totalKaryawan = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.total, 0)
  }, [data])

  // Hitung departement terbesar
  const largestDept = React.useMemo(() => {
    if (data.length === 0) return null
    return data.reduce((max, curr) => 
      curr.total > max.total ? curr : max
    )
  }, [data])

  // Dynamic description berdasarkan data
  const getDescription = () => {
    if (dateRange) return dateRange
    return `Data ${new Date().toLocaleDateString("id-ID", { 
      month: "long", 
      year: "numeric" 
    })}`
  }

  // Dynamic trending text
  const getTrendingText = () => {
    if (!showTrendingUp) return null
    if (!largestDept) return null
    
    const percentage = Math.round((largestDept.total / totalKaryawan) * 100)
    return `${largestDept.department} mendominasi dengan ${percentage}% dari total karyawan`
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribusi Departement</CardTitle>
        <CardDescription>{getDescription()}</CardDescription>
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
                  hideIndicator={true}
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
      <CardFooter className="flex-col gap-2 text-sm">
        {getTrendingText() && (
          <div className="flex items-center gap-2 leading-none font-medium">
            {getTrendingText()} <TrendingUp className="h-4 w-4" />
          </div>
        )}
        <div className="leading-none text-muted-foreground">
          Total karyawan: {totalKaryawan} orang di {data.length} departement
        </div>
      </CardFooter>
    </Card>
  )
}