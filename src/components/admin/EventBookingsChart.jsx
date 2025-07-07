import React, { useEffect, useState } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import axios from "axios";

// Register FusionCharts modules
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

export default function EventBookingsChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/admin/bookings-per-event")
      .then((res) => {
        const formattedData = res.data
          .filter((event) => event.bookingsCount > 0)
          .map((event) => ({
            label: event.eventName,
            value: Number(event.bookingsCount), // مهم يكون رقم
          }));
          
        setChartData(formattedData);
      })
      .catch((err) => {
        console.error("Error fetching chart data:", err);
      });
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
      },
      data: chartData,
    },
  };

  return (
    <div style={{ padding: "2rem", color: "#fff" }}>
      {chartData.length > 0 ? (
        <>
          <ReactFC {...chartConfigs} />

          {/* Table of Events and Booking Counts */}
          <table style={{ 
            marginTop: '2rem', 
            width: '100%', 
            borderCollapse: 'collapse',
            color: '#fff',
            textAlign: 'left'
          }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '2px solid #6366f1', padding: '8px' }}>Event</th>
                <th style={{ borderBottom: '2px solid #6366f1', padding: '8px' }}>Bookings</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map(({ label, value }) => (
                <tr key={label}>
                  <td style={{ borderBottom: '1px solid #444', padding: '8px' }}>{label}</td>
                  <td style={{ borderBottom: '1px solid #444', padding: '8px' }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No data to display.</p>
      )}
    </div>
  );
}
