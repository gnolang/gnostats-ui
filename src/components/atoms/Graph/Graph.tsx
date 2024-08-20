import { IGraphProps } from './graph.types.ts';
import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Graph: FC<IGraphProps> = (props) => {
  const { name, icon } = props;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  };

  const labels = [100, 101, 102, 103, 104, 105, 106, 107, 108, 109];

  const data = {
    labels,
    datasets: [
      {
        data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        backgroundColor: '#50fa7b'
      }
    ]
  };

  return (
    <Flex
      direction={'column'}
      flexGrow={1}
      style={{
        border: '1px solid rgba(255, 255, 255, .05)'
      }}
      padding={4}
      rowGap={4}
    >
      <Flex alignItems={'center'} columnGap={4}>
        {icon}
        <Text
          fontWeight={700}
          textTransform={'uppercase'}
          color={'#AAA'}
          fontSize={'sm'}
        >
          {name}
        </Text>
      </Flex>
      <Flex height={'130px'}>
        <Bar options={options} data={data} />
      </Flex>
    </Flex>
  );
};

export default Graph;
