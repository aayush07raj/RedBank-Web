import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart({ data, type, name }) {
  return (
    <>
      {name === "hos" || name === "bb" ? (
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
                  "rgba(233, 67, 100,0.2)",
                  "rgba(231, 76, 60,0.2)",
                  "rgba(244, 208, 63,0.2)",
                  "rgba(243, 156, 18,0.2)",
                  "rgba(235, 152, 78,0.2)",
                  "rgba(220, 118, 51,0.2)",
                  "rgba(179, 182, 183,0.2)",
                  "rgba(169, 204, 227,0.2)",
                ],
                borderColor: [
                  "rgba(233, 67, 100,1)",
                  "rgba(231, 76, 60,1)",
                  "rgba(244, 208, 63,1)",
                  "rgba(243, 156, 18,1)",
                  "rgba(235, 152, 78,1)",
                  "rgba(220, 118, 51,1)",
                  "rgba(179, 182, 183,1)",
                  "rgba(169, 204, 227,1)",
                ],
              },
            ],
          }}
          options={{
            legend: {
              position: "left",
              align: "end",
            },
            title: {
              display: true,
              position: "top",
              text: type,
              fontSize: "15",
            },
          }}
        />
      ) : (
        <Pie
          data={{
            labels: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
            datasets: [
              {
                label: "blood",
                data: data,
                backgroundColor: [
                  "rgba(233, 67, 100,0.2)",
                  "rgba(231, 76, 60,0.2)",
                  "rgba(244, 208, 63,0.2)",
                  "rgba(243, 156, 18,0.2)",
                  "rgba(235, 152, 78,0.2)",
                  "rgba(220, 118, 51,0.2)",
                  "rgba(179, 182, 183,0.2)",
                  "rgba(169, 204, 227,0.2)",
                ],
                borderColor: [
                  "rgba(233, 67, 100,1)",
                  "rgba(231, 76, 60,1)",
                  "rgba(244, 208, 63,1)",
                  "rgba(243, 156, 18,1)",
                  "rgba(235, 152, 78,1)",
                  "rgba(220, 118, 51,1)",
                  "rgba(179, 182, 183,1)",
                  "rgba(169, 204, 227,1)",
                ],
              },
            ],
          }}
          options={{
            legend: {
              position: "left",
              align: "end",
            },
            title: {
              display: true,
              position: "top",
              text: name,
              fontSize: "15",
            },
          }}
        />
      )}
    </>
  );
}

export default PieChart;
