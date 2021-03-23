import React from "react";
import { Bar } from "react-chartjs-2";

function BarChart({ labels, legends, data, type }) {
  return (
    <>
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: "blood",
              data: data.bloodObject,
              backgroundColor: "rgba(233, 67, 100, 0.2)",
              borderColor: "rgba(233, 67, 100, 1)",
              hoverBackgroundColor: "rgba(233, 67, 100, 0.5)",
              borderWidth: 1,
            },
            {
              label: "plasma",
              data: data.plasmaObject,
              backgroundColor: "rgba(51, 153, 255, 0.2)",
              borderColor: "rgba(51, 153, 255, 1)",
              hoverBackgroundColor: "rgba(51, 153, 255, 0.5)",
              borderWidth: 1,
            },
            {
              label: "platelets",
              data: data.plateletObject,
              backgroundColor: "rgba(155, 231, 91, 0.2)",
              borderColor: "rgba(155, 231, 91, 1)",
              hoverBackgroundColor: "rgba(155, 231, 91, 0.5)",
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