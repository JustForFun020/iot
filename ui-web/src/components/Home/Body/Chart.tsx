import React, { useEffect, useState, useRef, useMemo } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  Filler,
} from 'chart.js';
import 'chartjs-adapter-luxon';
import StreamingPlugin from 'chartjs-plugin-streaming';
import { ChartDataProps, ChartOptionProps } from '@/model/chart';
import { WeatherProps } from '@/model/weather';
import { DHT11Props } from '@/model/dht11';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  Filler,
  StreamingPlugin,
);

interface ChartProps {
  weatherInfo: WeatherProps;
  getData: (value: any) => void;
}

const Chart = ({ weatherInfo, getData }: ChartProps) => {
  const [dht11, setDHT11] = useState<DHT11Props[]>([{ humidity: 0.0, time: '', temperature: 0.0, light: 0, dobui: 0 }]);
  const chartRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dht11]);

  const fetchData = async () => {
    try {
      const fetchUrl = await axios.get<DHT11Props[]>('http://localhost:5050/db/dht11');
      const res = fetchUrl.data;
      setDHT11(res);
      getDataChildren(res[res.length - 1]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const memoizedDht11Data: any = useMemo(
    () => ({
      labels: dht11.slice(-7).map((item: DHT11Props) => {
        return item.time.split(' ')[1];
      }),
      datasets: [
        {
          label: 'Nhiệt độ (°C)',
          borderColor: 'orange',
          backgroundColor: 'rgba(226, 135, 31, 0.4)',
          cubicInterpolationMode: 'monotone',
          fill: true,
          borderWidth: 2.5,
          data: dht11.slice(-7).map((item: DHT11Props) => item.temperature),
        },
        {
          label: 'Độ ẩm (%)',
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.2)',
          cubicInterpolationMode: 'monotone',
          borderWidth: 2.5,
          fill: true,
          data: dht11.slice(-7).map((item: DHT11Props) => item.humidity),
        },
        {
          label: 'Ánh sáng',
          borderColor: 'red',
          backgroundColor: 'rgba(226, 48, 35, 1)',
          cubicInterpolationMode: 'monotone',
          borderWidth: 2.5,
          data: dht11.slice(-7).map((item: DHT11Props) => Math.round(item.light / 10)),
        },
      ],
    }),
    [dht11],
  );

  const data2: any = useMemo(
    () => ({
      labels: dht11.slice(-7).map((item: DHT11Props) => {
        return item.time.split(' ')[1];
      }),
      datasets: [
        {
          label: 'Độ bụi (°C)',
          borderColor: 'orange',
          backgroundColor: 'rgba(226, 135, 31, 0.4)',
          cubicInterpolationMode: 'monotone',
          fill: true,
          borderWidth: 2.5,
          data: dht11.slice(-7).map((item: DHT11Props) => item.dobui),
        },
      ],
    }),
    [dht11],
  );

  const getDataChildren = (value: any) => {
    getData(value ?? { temperature: 30, humidity: 30.0, light: 0, dobui: 0 });
  };

  const options2: ChartOptionProps = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          color: '#fff',
        },
        max: 180,
        grid: {
          color: '#222',
        },
      },
      x: {
        ticks: {
          color: '#fff',
        },
        grid: {
          color: '#222',
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        color: '#fff',
      },
      title: {
        display: true,
        text: 'Biểu đồ Độ bụi',
        font: {
          size: 35,
          weight: 'bold',
        },
        color: '#4cceac',
      },
    },
  };

  const options: ChartOptionProps = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          color: '#fff',
        },
        max: 180,
        grid: {
          color: '#222',
        },
      },
      x: {
        ticks: {
          color: '#fff',
        },
        grid: {
          color: '#222',
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        color: '#fff',
      },
      title: {
        display: true,
        text: 'Biểu đồ Thời tiết',
        font: {
          size: 35,
          weight: 'bold',
        },
        color: '#4cceac',
      },
    },
  };

  return (
    <div className='home__chart' style={{ height: 'auto', padding: 20, display: 'flex' }}>
      <Line ref={chartRef} data={data2} options={options2} style={{ width: '50% !importance' }} />
      <Line ref={chartRef} data={memoizedDht11Data} options={options} style={{ width: '50% !importance' }} />
    </div>
  );
};

export default Chart;
