import React from "react";
import { Bar } from "react-chartjs-2";

function BarChart(props) {
  return (
    <>
      <Bar
        data={{
          labels: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
          datasets: [
            {
              label: "sales",
              data: [100, 20, 50, 500, 400, 700, 350, 200],
              backgroundColor: "#E94394",
              borderColor: "#E94394",
              borderWidth: 1,
            },

            {
              label: "revenue",
              data: [2000, 5000, 35000, 30000, 20000, 70000, 40000, 15000],
              backgroundColor: "grey",
              borderColor: "grey",
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

export default BarChart;
