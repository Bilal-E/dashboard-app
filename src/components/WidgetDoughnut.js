import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

function WidgetDoughnut(props) {

    const chartConfigs = {
        type: "doughnut2d",
        width: "100%",
        height: "300",
        dataFormat: "json",

        dataSource: {
            chart: {
                plotGradientColor: '#d2691e',
                usePlotGradientColor: 1,
                pieRadius: "47%",
                doughnutRadius: "50%",
                bgColor: "#343a40",
                theme: "fusion"
            },

            data: props.data
        }
    };

    return (
        <ReactFC {...chartConfigs} />
    );
}

export default WidgetDoughnut;