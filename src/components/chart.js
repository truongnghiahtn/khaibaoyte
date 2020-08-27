import React, { Component } from 'react';
import Chart from 'chart.js';

export default class chart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mang: ['Red', 'Blue', "haha"]
        }
    };

    componentDidMount() {
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: this.state.mang,
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 20, 15],
                    borderWidth: 1,
                    backgroundColor: ["#7f21ff", "red", "yellow"]

                }]
            },
            // options: {
            //     scales: {
            //         yAxes: [{
            //             stacked: true
            //         }]
            //     }
            // }
        });
    }

    render() {
        return (
            <div className="chart">
                <canvas id="myChart" width="400" height="400"></canvas>
            </div>
        );
    }
}
