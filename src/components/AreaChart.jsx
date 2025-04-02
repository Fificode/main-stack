import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/ui/chart"
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} 

export function Component() {
  return (
    <div className="w-[75%]">
    <Card>
      <div className="flex gap-[64px] items-center">
      <div className="flex flex-col gap-2">
      <h3 className="font-[500] text-[14px] leading-[16px] text-secondary">Available Balance</h3>
<h2 className="font-[700] text-[36px] leading-[48px] text-primary">USD 120,500.00</h2>
</div>
<button className="bg-primary w-auto h-[52px] py-[14px] px-[28px] rounded-[100px] flex justify-center items-center text-center font-[600] text-[16px] leading-[24px] text-white">Withdraw</button>
      </div>
    <div>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="#fff"
              // fillOpacity={0.4}
              stroke="#FF5403"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      </div>
      <CardFooter>
      </CardFooter>
    </Card>
    </div>
  )
}
