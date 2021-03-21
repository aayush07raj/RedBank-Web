import React from "react";
import { Bar } from "react-chartjs-2";

function BarChart({ labels, legends, data, type }) {
  // cause of error ->
  // in case of monthly sales,revenue,purchases data is array
  // in case of yearly sales,revenue,purchases data is an object

  // in case of yearly.... labels is not present and data is an object

  if (type === "yearly") {
    console.log(data);
  }
  return (
    <>
      {type === "monthly" ? (
        <Bar
          data={{
            labels: labels,
            datasets: [
              {
                label: legends,
                data: data,
                backgroundColor: "#E94364",
                borderColor: "#E94364",
                borderWidth: 1,
              },
            ],
          }}
          height={220}
          width={600}
        />
      ) : (
        <Bar
          data={{
            labels: labels,
            datasets: [
              {
                label: "blood",
                data: data.bloodObject,
                backgroundColor: "blue",
                borderColor: "blue",
                borderWidth: 1,
              },
              {
                label: "plasma",
                data: data.plasmaObject,
                backgroundColor: "red",
                borderColor: "red",
                borderWidth: 1,
              },
              {
                label: "platelets",
                data: data.plateletObject,
                backgroundColor: "grey",
                borderColor: "grey",
                borderWidth: 1,
              },
            ],
          }}
          height={220}
          width={600}
        />
      )}
    </>
  );
}

export default BarChart;
