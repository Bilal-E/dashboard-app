import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

function WidgetPie(props) {

    const chartConfigs = {
        type: "pie3d",
        width: "100%",
        height: "300",
        dataFormat: "json",
        dataSource: {
            chart: {
                plotGradientColor: '#b34b4b #FFFFFF',
                usePlotGradientColor: 1,
                bgColor: '#343a40',
                caption: "Session Analytics",
                theme: "fusion",
            },
            data: props.data
        }
    };


    return(
                
         <ReactFC {...chartConfigs} />
    );
}

export default WidgetPie;