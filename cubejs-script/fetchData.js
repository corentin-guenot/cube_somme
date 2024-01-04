// import cubejs from "@cubejs-client/core";
// import moment from "moment";

// import Chart from "chart.js";

// import "chartjs-plugin-colorschemes";
// import { RdPu4 } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.brewer";

// // Create an instance of Cube.js JavaScript Client
// //  b1b5be685fb9073056a306e1247a0aef
// const cubejsApi = cubejs(
// //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDA4MjEwNjV9.gXQyEUYWeOYC6vxbJrqvfM_99l-94lw9y9Bm-O1JFmg",
//   {
//     apiUrl:
//       "http://localhost:4000/cubejs-api/v1",
//   },
// );

// // Query data from Cube.js Backend
// cubejsApi
//   .load({
//     limit: 5000,
//     measures: ["zeros.avg_value"],
//     timeDimensions: [
//       {
//         dimension: "zeros.time",
//         granularity: "month",
//       },
//     ],
//   })
//   .then((resultSet) => {
//     console.log(resultSet.chartPivot({
//       fillMissingDates: false
//     }));

//     //Transform data for visualization
//     const labels = resultSet
//       .seriesNames({
//         x: [],
//         y: ["Orders.createdAt"],
//       })
//       .map((column) => moment(column.yValues[0]).format("MMMM"));

//     const datasets = resultSet.series().map((item, i) => {
//       return {
//         label: item.title,
//         data: item.series.map((item) => item.value),
//       };
//     });

//     //Visualize the data
//     var ctx = document.getElementById("chart").getContext("2d");
//     window.myBar = new Chart(ctx, {
//       type: "bar",
//       data: {
//         labels,
//         datasets,
//       },
//       options: {
//         legend: {
//           position: "bottom",
//           align: "start",
//         },
//         plugins: {
//           colorschemes: {
//             scheme: RdPu4,
//           },
//         },
//       },
//     });
//   });

import cubejs from "@cubejs-client/core";

// Replace 'your-cubejs-api-url' with the actual Cube.js API endpoint
const cubejsApi = cubejs(
  //.default
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDA4MjEwNjV9.gXQyEUYWeOYC6vxbJrqvfM_99l-94lw9y9Bm-O1JFmg",
  {
    apiUrl:
      'http://localhost:4000/cubejs-api/v1',
  },
);

async function fetchDataAndManipulate() {
  try {
    // Fetch data from the 'employees' cube
    const resultSet = await cubejsApi.load({
      measures: [
        {
          measure: 'employees.count',
          type: 'number',
          aggregation: 'sum',
          drillMembers: ['employees.first_name', 'employees.last_name'],
          // Ajoutez d'autres options si nécessaire
        },
      ],
      dimensions: ['employees.first_name', 'employees.last_name'],
    });

    // Log the raw data
    console.log('Raw Data:', resultSet.rawData());

    // Perform some basic manipulation (you can customize this based on your needs)
    const manipulatedData = resultSet
      .series('employees.first_name')
      .flatMap(({ xValues, yValuesArray }) => {
        if (Array.isArray(yValuesArray) && yValuesArray.length > 0) {
          const values = yValuesArray[0];
          return xValues.map((x, i) => ({ name: x, value: values[i] }));
        } else {
          console.warn('yValuesArray is empty or undefined.');
          return [];
        }
      });

    // Log the manipulated data
    console.log('Manipulated Data:', manipulatedData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Call the method to fetch and manipulate data
fetchDataAndManipulate();
