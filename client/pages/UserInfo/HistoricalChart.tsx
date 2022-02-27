import { Container } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { weeklyProgress } from '../../entities/user';
import RANKS from '../common/const';

interface IHistoricalChart {
    data: weeklyProgress[]
}

const HistoricalChart: React.FC<IHistoricalChart> = ({ data }) => {
  let lines:string[] = [];
  data.forEach(e=>{
      Object.keys(e).forEach((key:string) => {
          if (key !== 'date' && !lines.includes(key)) {
              lines.push(key)
            };
        });
  })
  return (
      <Container minW='100%' minH='300px' border='2px'>
        <ResponsiveContainer width="100%" height={500}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {lines.sort().map((e)=> <Line key={e} connectNulls type="monotone" dataKey={e} stroke={RANKS[e].color} name={RANKS[e].name}/>)}
        </LineChart>
    </ResponsiveContainer>
    </Container>
  )
}

export default HistoricalChart