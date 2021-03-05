import React from "react";
import { Bar, Pie } from "react-chartjs-2";

function PieChart({ data, name }) {
  console.log(name);
  console.log(data);
  return (
    <>
      <Pie
        data={{
          labels: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
          datasets: [
            {
              label: "units available",
              data: [
                data.aPosUnits,
                data.aNegUnits,
                data.bPosUnits,
                data.bNegUnits,
                data.oPosUnits,
                data.oNegUnits,
                data.abPosUnits,
                data.abNegUnits,
              ],
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
