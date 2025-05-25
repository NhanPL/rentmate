import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
} from 'chart.js';

import { Bar, Line, Pie, Doughnut, Radar, PolarArea, ChartProps } from 'react-chartjs-2';

import { FC } from 'react';

// Đăng ký các thành phần cần thiết
ChartJS.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

type ChartType = 'bar' | 'line' | 'pie' | 'doughnut' | 'radar' | 'polarArea';

interface ChartWrapperProps extends Omit<ChartProps<'bar'>, 'type'> {
  type: ChartType;
}

const ChartWrapper: FC<ChartWrapperProps> = ({ type, data, options }) => {
  const chartMap: Record<ChartType, React.ElementType> = {
    bar: Bar,
    line: Line,
    pie: Pie,
    doughnut: Doughnut,
    radar: Radar,
    polarArea: PolarArea,
  };

  const ChartComponent = chartMap[type];
  return <ChartComponent className="w-full" data={data} options={options} />;
};

export default ChartWrapper;
