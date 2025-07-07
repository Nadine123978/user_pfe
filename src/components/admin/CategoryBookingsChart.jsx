import React, { useEffect, useState } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import axios from "axios";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

export default function CategoryEventsBookingsChart() {
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/admin/events-and-bookings-per-category")
      .then((res) => {
        setTableData(res.data);
        const formattedChartData = res.data
          .filter((cat) => cat.bookingsCount > 0)
          .map((cat) => ({
            label: cat.categoryName,
            value: Number(cat.bookingsCount),
          }));
        setChartData(formattedChartData);
      })
      .catch((err) => {
        console.error("Error fetching category data:", err);
      });
  }, []);

  const chartConfigs = {
    type: "pie2d",
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Bookings per Category",
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
          <table
            style={{
              marginTop: "2rem",
              width: "100%",
              borderCollapse: "collapse",
              color: "#fff",
              textAlign: "left",
            }}
          >
            <thead>
              <tr>
                <th style={{ borderBottom: "2px solid #6366f1", padding: "8px" }}>
                  Category
                </th>
                <th style={{ borderBottom: "2px solid #6366f1", padding: "8px" }}>
                  Events Count
                </th>
                <th style={{ borderBottom: "2px solid #6366f1", padding: "8px" }}>
                  Bookings Count
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map(({ categoryName, eventsCount, bookingsCount }) => (
                <tr key={categoryName}>
                  <td style={{ borderBottom: "1px solid #444", padding: "8px" }}>
                    {categoryName}
                  </td>
                  <td style={{ borderBottom: "1px solid #444", padding: "8px" }}>
                    {eventsCount}
                  </td>
                  <td style={{ borderBottom: "1px solid #444", padding: "8px" }}>
                    {bookingsCount}
                  </td>
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
