import React, {PureComponent} from 'react';
import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis,} from 'recharts';
import Card from "@material-ui/core/Card";
import {showNotification} from "react-admin";

export default class Example extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/Lrffmzfc/';

    state = {
        data: []
    };

    componentWillMount() {
        fetch(`${process.env.REACT_APP_URL}/dashboard/revenue`,
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

    render() {
        return (
            <Card>
                <AreaChart
                    width={600}
                    height={400}
                    data={this.state.data}
                    margin={{
                        top: 10, right: 10, left: 0, bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="month"/>
                    <YAxis/>
                    <Tooltip/>
                    <Area type="monotone" dataKey="revenue" name={"Zysk netto"} stroke="#8884d8" fill="#8884d8"/>
                </AreaChart>
            </Card>
        );
    }
}
