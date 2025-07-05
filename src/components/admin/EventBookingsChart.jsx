import React, { useEffect, useState } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import axios from "axios";

// Initialize FusionCharts modules
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

export default function EventBookingsChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // جَيبي البيانات من الباك
    axios.get("http://localhost:8081/api/admin/bookings-per-event")
      .then((res) => {
        const data = res.data;

        // شكّل بيانات الفيوجن تشارت
        const formattedData = data.map(event => ({
          label: event.eventName,
          value: event.bookingCount
        }));

        setChartData(formattedData);
      })
      .catch((err) => console.error("Error fetching chart data", err));
  }, []);

  const chartConfigs = {
    type: "pie2d",
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Bookings per Event",
        theme: "fusion",
        decimals: 0,
        pieRadius: "45%",
      },
      data: chartData,
    },
  };

  return (
    <div style={{ padding: "2rem" }}>
      <ReactFC {...chartConfigs} />
    </div>
  );
}
