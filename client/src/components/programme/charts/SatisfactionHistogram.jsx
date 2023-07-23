import { ResponsiveBarCanvas } from '@nivo/bar'

const SatisfactionHistogram = ({data}) => {
    return (<ResponsiveBarCanvas 
      data={data} 
      keys={['mentorCount', 'menteeCount']}
      indexBy="labelName"
      colors={{ scheme: 'paired' }}
      groupMode='grouped'
      margin={{bottom: 20, left: 40, top: 10}}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Number of people',
        legendPosition: 'middle',
        legendOffset: -35
    }}
      />
    )
}

export default SatisfactionHistogram