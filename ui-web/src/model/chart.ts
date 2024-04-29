export interface ChartDataProps {
  labels: string[];
  datasets: {
    label: string;
    borderColor: string;
    data: number[];
    backgroundColor: string;
    cubicInterpolationMode: 'monotone';
    fill?: boolean;
    borderWidth?: number;
  }[];
}

export interface ChartOptionProps {
  responsive: boolean;
  scales: {
    y: {
      beginAtZero?: boolean;
      ticks: {
        color: string;
      };
      max?: number;
      grid: {
        color: string;
      };
    };
    x: {
      beginAtZero?: boolean;
      ticks: {
        color: string;
      };
      grid: {
        color: string;
      };
    };
  };
  plugins?: {};
}
