import React, {PureComponent} from 'react';
import {Pie, PieChart, Sector} from 'recharts';
import {showNotification} from "react-admin";

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 25) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{`Udział ${(percent * 100).toFixed(2)}%`}</text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor}
                  fill="#333">{`Zysk netto ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor}>{payload.name}</text>
        </g>
    );
};


export default class Example extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/hqnrgxpj/';

    state = {
        activeIndex: 0,
        data: []
    };

    componentWillMount() {
        fetch(`${process.env.REACT_APP_URL}/dashboard/revenue-per-customer`,
            {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            .then((response) => {
                return response.json()
            }).then(value => {
            console.log(value);
            this.state.data = value;
            this.forceUpdate();
        })
            .catch((e) => {
                showNotification('Error: comment not approved', 'warning')
            });
    }

    onPieEnter = (data, index) => {
        this.setState({
            activeIndex: index,

        });
    };

    render() {
        return (
            <PieChart width={600} height={400}>
                <Pie
                    activeIndex={this.state.activeIndex}
                    activeShape={renderActiveShape}
                    data={this.state.data}
                    cx={300}
                    cy={200}
                    innerRadius={60}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="revenue"
                    onMouseEnter={this.onPieEnter}
                />
            </PieChart>
        );
    }
}