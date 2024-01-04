import cubejs from '@cubejs-client/core';

const cubejsApi = cubejs({
  apiUrl: 'http://localhost:4000/cubejs-api/v1',
});

async function fetchSumOfEmployeeCount() {
  try {
    // Faites la somme des données dans 'employees.count'
    const resultSet = await cubejsApi.load({
      measures: [
        {
          expression: 'employees.count',
          aggregation: 'sum', // Utilisez 'sum' pour faire la somme
        },
      ],
      dimensions: ['employees.first_name', 'employees.last_name'], 
    });

    // Récupérez la somme des données
    const sumOfEmployeeCount = resultSet.series()[0]?.value;

    // Affichez la somme des données
    console.log('Sum of Employee Count:', sumOfEmployeeCount);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Appelez la méthode pour récupérer la somme des données
fetchSumOfEmployeeCount();
