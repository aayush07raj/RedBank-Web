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
              backgroundColor: [
                "#E94364",
                "#E74C3C",
                "#F4D03F",
                "#F39C12",
                "#EB984E",
                "#DC7633",
                "#B3B6B7",
                "#A9CCE3",
              ],
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
