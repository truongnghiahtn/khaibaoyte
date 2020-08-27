import React, { Component } from 'react';

import $ from 'jquery'



export default class Chart1 extends Component {

    componentDidMount() {
        this.render3DPie();

    }
    render3DPie = () => {
        if ($("#am-3dpie-chart").length) {
            window.am4core.ready(function () {


                window.am4core.useTheme(window.am4themes_animated);
                // Themes end

                var chart = window.am4core.create("am-3dpie-chart", window.am4charts.PieChart3D);
                chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

                chart.legend = new window.am4charts.Legend();

                chart.data = [{
                    country: "Lithuania",
                    litres: 501.9,
                    fill: "red"
                }, {
                    country: "Germany",
                    litres: 165.8
                }, {
                    country: "Australia",
                    litres: 139.9
                }, {
                    country: "Austria",
                    litres: 128.3
                }, {
                    country: "UK",
                    litres: 99
                }, {
                    country: "Belgium",
                    litres: 60
                }];

                var series = chart.series.push(new window.am4charts.PieSeries3D());
                series.colors.list = [window.am4core.color("#089bab"), window.am4core.color("#FC9F5B"), window.am4core.color("#57de53"),
                window.am4core.color("#f26361"), window.am4core.color("#ababab"), window.am4core.color("#61e2fc")
                ];
                series.dataFields.value = "litres";
                series.dataFields.category = "country";

            }); // end window.am4core.ready()
        }
    }
    render() {
        return (
            <div className="row">
                <div className="iq-card col-6">
                    <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                            <h4 className="card-title"> 3D Pie Chart</h4>
                        </div>
                    </div>
                    <div className="iq-card-body">
                        <div id="am-3dpie-chart" style={{ height: "500px" }}></div>
                    </div>

                </div>
                <div class="iq-card">
                    <div class="iq-card-header d-flex justify-content-between">
                        <div class="iq-header-title">
                            <h4 class="card-title">Bar Chart</h4>
                        </div>
                    </div>
                    <div class="iq-card-body">
                        <div id="apex-bar"></div>
                    </div>
                </div>
            </div>

        );
    }
}
