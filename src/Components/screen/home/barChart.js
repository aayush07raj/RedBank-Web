import React from "react";
import { Bar } from "react-chartjs-2";

function BarChart() {
  return (
    <>
      <Bar
        data={{
          labels: ["2016", "2017", "2018", "2019", "2020", "2021"],
          datasets: [
            {
              label: "Number of Customers Added",
              data: [3, 5, 10, 20, 40, 50],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        height={400}
        width={600}
      />
    </>
  );
}

export default BarChart;
