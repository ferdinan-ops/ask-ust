import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface DoughnutChartProps {
  labels: string[]
  data: number[]
  children?: React.ReactNode
}

const bgColor = ['#C6C7F8', '#BAEDBD', '#95A4FC', '#B1E3FF', '#A8C5DA', '#A1E3CB']

export default function DoughnutChart({ labels, data, children }: DoughnutChartProps) {
  const total = data?.reduce((acc, current) => acc + current, 0)
  const formatLabels = labels?.map((label, index) => ({
    bgColor: bgColor[index],
    label: `${label} : ${total === 0 ? 0 : ((data[index] / total) * 100).toFixed(0)}%`
  }))

  return (
    <div className="flex flex-col gap-[55px]">
      {children}
      {total === 0 ? (
        <div className="dark: mx-auto flex h-44 w-44 rounded-full bg-zinc-200 dark:bg-white/10">
          <div className="m-auto h-24 w-24 rounded-full bg-[#F7F9FB] dark:bg-[#242427]" />
        </div>
      ) : (
        <Doughnut
          data={{ labels, datasets: [{ data, backgroundColor: bgColor }] }}
          options={{
            plugins: {
              tooltip: { callbacks: { label: (item) => `${item.label} : ${item.formattedValue.replace(',', '.')} ` } },
              legend: { display: false }
            }
          }}
          style={{ maxHeight: 190 }}
        />
      )}
      <div className="grid grid-cols-1 content-between gap-3 xl:grid-cols-2">
        {formatLabels?.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.bgColor }}></div>
            <p className="text-xs font-medium text-primary dark:text-white">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
