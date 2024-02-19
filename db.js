import { Sequelize } from 'sequelize'

const db = new Sequelize(
  process.env.DB_NAME || 'node_pern',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || '123',
  {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5438
  }
)

export default db