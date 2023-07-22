// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/bar
import { ResponsiveBarCanvas } from '@nivo/bar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const Bar = ({ data /* see data tab */ }) => (
    <ResponsiveBarCanvas
        data={data}
        keys={[
            'count'
        ]}
        indexBy="labelName"
        margin={{ top: 50, right: 60, bottom: 50, left: 150 }}
        pixelRatio={2}
        padding={0.15}
        innerPadding={0}
        minValue="auto"
        maxValue="auto"
        groupMode="stacked"
        layout="horizontal"
        reverse={false}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'paired' }}
        colorBy="indexValue"
        borderWidth={0}
        borderRadius={0}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    '0.8'
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
        }}
        enableGridX={false}
        enableGridY={false}
        enableLabel={true}
        label={(x) => `${x.value} ${x.data.endAdornment}`}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        isInteractive={true}
        legends={[]}
    />
)

export default Bar;