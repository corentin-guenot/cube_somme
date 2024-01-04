cube(`employees`, {
  sql_table: `public.employees`,

  data_source: `default`,

  joins: {},

  dimensions: {
    salary: {
      sql: `salary`,
      type: `number`,
    },

    last_name: {
      sql: `last_name`,
      type: `string`,
    },

    first_name: {
      sql: `first_name`,
      type: `string`,
    },
  },

  measures: {
    count: {
      type: `count`,
    },
    totalSalary: {
      sql: `salary`,
      type: `sum`,
    },
  },

  pre_aggregations: {
    // Pre-aggregation definitions go here.
    // Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },
});
