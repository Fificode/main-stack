import { useEffect, useMemo } from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
} from "../components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/ui/chart"
import { useDispatch, useSelector } from "react-redux"
import { fetchWallet } from "../store/walletSlice"
import { fetchTransactions } from "../store/transactionSlice"
import { FaSpinner } from "react-icons/fa6";




const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} 

export function Component({filteredTransactions}) {
  const dispatch = useDispatch();
      const { wallet, loading, error } = useSelector((state) => state.wallet);
      // const { transactions} = useSelector((state) => state.transaction);

      useEffect(() => {
        dispatch(fetchWallet());
        dispatch(fetchTransactions());
      }, [dispatch]);

 // Function to format the date
 const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

        // Transform transactions into chart format
  // const chartData = useMemo(() => {
  //   return filteredTransactions.map((transaction) => ({
  //     date: formatDate(transaction.date),
  //     amount: transaction?.amount
  //   }));
  // }, [filteredTransactions]);

  const chartData = useMemo(() => {
    if (!filteredTransactions || filteredTransactions.length === 0) {
      // No filtered transactions, display a red horizontal line in the middle
      const todayInLagos = new Date();
      const middleValue = 50; // Replace with your desired middle value

      // Create two points for the horizontal line spanning a short period
      const startDate = new Date(todayInLagos);
      const endDate = new Date(todayInLagos);
      endDate.setDate(todayInLagos.getDate() + 3); // Add one day

      return [
        { date: formatDate(startDate), amount: middleValue },
        { date: formatDate(endDate), amount: middleValue },
      ];
    }

    // Transform transactions into chart format
    return filteredTransactions.map((transaction) => ({
      date: formatDate(transaction.date),
      amount: transaction?.amount,
    }));
  }, [filteredTransactions]);
   
      if (error) return <p>Error: {error}</p>;
    
  return (
    <div className="w-[75%] bg-white -z-10">
  {loading && <div className="flex justify-center items-center"> <FaSpinner className="text-primary animate-spin mx-auto w-10 h-10"/> </div> }
   {wallet && <Card>
      <div className="flex gap-[64px] items-center">
      <div className="flex flex-col gap-2">
      <h3 className="font-[500] text-[14px] leading-[16px] text-secondary">Available Balance</h3>
<h2 className="font-[700] text-[36px] leading-[48px] text-primary">USD {wallet?.balance}</h2>
</div>
<button className="bg-primary w-auto h-[52px] py-[14px] px-[28px] rounded-[100px] flex justify-center items-center text-center font-[600] text-[16px] leading-[24px] text-white">Withdraw</button>
      </div>
    <div>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full ">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
            zIndex={10}
          >
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={true}
              tickMargin={8}
              // tickFormatter={(value) => value.slice(5, 10)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="amount"
              type="linear"
              fill="transparent"
              // fillOpacity={0.4}
              stroke="#FF5403"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      </div>
      <CardFooter>
      </CardFooter>
    </Card>}
    </div>
  )
}
