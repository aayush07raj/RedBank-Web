import React from "react";
import { Bar } from "react-chartjs-2";

function BarChart({ labels, legends, data }) {
  return (
    <>
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: "units sold",
              data: data,
              backgroundColor: "#E94394",
              borderColor: "#E94394",
              borderWidth: 1,
            },
          ],
        }}
        height={220}
        width={600}
      />
    </>
  );
}

export default BarChart;
