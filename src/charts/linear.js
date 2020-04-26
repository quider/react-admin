import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {ArgumentAxis, Chart, LineSeries, Title, ValueAxis,} from '@devexpress/dx-react-chart-material-ui';


const data = [
    {argument: 1, value: 10},
    {argument: 2, value: 20},
    {argument: 3, value: 30},
];

export default (props) => (
    <Paper>
        <Chart
            data={data}
        >
            <ArgumentAxis/>
            <ValueAxis/>
            <Title text={props.title}/>
            <LineSeries valueField="value" argumentField="argument"/>
        </Chart>
    </Paper>
);
