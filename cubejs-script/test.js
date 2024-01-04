import cubejs from "@cubejs-client/core";

const cubejsApi = cubejs({
  apiUrl: "http://localhost:4000/cubejs-api/v1",
});

async function fetchSumOfEmployeeCount() {
  try {
    // Faites la somme des données dans 'employees.count'
    const resultSet = await cubejsApi.load({
      measures: ["employees.totalSalary"],

      // dimensions: ["employees.first_name", "employees.last_name"],
    });

    console.log("resultSet", resultSet.series()[0].series[0].value);

    // // Récupérez la somme des données
    // const sumOfEmployeeCount = resultSet.series()[0]?.value;

    // Affichez la somme des données
    // console.log("Sum of Employee Count:", sumOfEmployeeCount);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Appelez la méthode pour récupérer la somme des données
fetchSumOfEmployeeCount();
