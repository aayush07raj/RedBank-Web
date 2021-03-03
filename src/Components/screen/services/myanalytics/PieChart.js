import React from "react";
import { Bar, Pie } from "react-chartjs-2";

function PieChart(props) {
  return (
    <>
      <Pie
        data={{
          labels: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
          datasets: [
            {
              label: "units available",
              data: [100, 232, 100, 232, 100, 232, 100, 232],
              backgroundColor: ["lightgrey", "lightblue", "lightgreen", "pink"],
            },
          ],
        }}
        options={{
          legend: {
            position: "left",
          },
        }}
      />
    </>
  );
}

export default PieChart;
