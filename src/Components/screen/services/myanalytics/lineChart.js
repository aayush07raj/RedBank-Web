import React from "react";
import { Line } from "react-chartjs-2";

function LineChart(props) {
  return (
    <>
      <Line
        data={{
          labels: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
          datasets: [
            {
              label: "units available",
              data: [40, 100, 50, 500, 125, 700, 350, 700],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        options={{
          title: {
            display: true,
            text: props.title,
            fontSize: 20,
            fontColor: "black",
          },
        }}
        height={400}
        width={600}
      />
    </>
  );
}

export default LineChart;
