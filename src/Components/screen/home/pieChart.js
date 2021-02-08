import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart() {
  return (
    <>
      <Pie
        data={{
          labels: ["Blood", "Plasma", "Platelets"],
          datasets: [
            {
              label: "Number of Customers Added",
              data: [20, 40, 50],
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
        height={400}
        width={600}
      />
    </>
  );
}

export default PieChart;
