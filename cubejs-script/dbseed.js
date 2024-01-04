import { Client } from "pg";
import "dotenv/config";

console.log("process.env.POSTGRES_USER", process.env.POSTGRES_USER);
// PostgreSQL client configuration
const client = new Client({
  user: "myuser",
  host: "localhost",
  database: "mydatabase",
  password: "mypassword",
  port: 5433,
});

const createTableText = `
CREATE TABLE IF NOT EXISTS employees (
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    salary DECIMAL(10, 2)
);`;

const insertDataText = `
INSERT INTO employees (first_name, last_name, salary)
VALUES 
    ('John', 'Doe', ${Math.random() * 100000}),
    ('Jane', 'Smith', ${Math.random() * 100000}),
    ('Alice', 'Johnson', ${Math.random() * 100000}),
    ('Bob', 'Brown', ${Math.random() * 100000}),
    ('Mike', 'Davis', ${Math.random() * 100000}),
    ('Sarah', 'Miller', ${Math.random() * 100000}),
    ('Chris', 'Wilson', ${Math.random() * 100000}),
    ('Pat', 'Taylor', ${Math.random() * 100000}),
    ('Jamie', 'Anderson', ${Math.random() * 100000}),
    ('Alex', 'Thomas', ${Math.random() * 100000});
`;

async function main() {
  try {
    await client.connect();
    await client.query(createTableText);
    await client.query(insertDataText);
    console.log("Table created and data inserted successfully");
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

main();
