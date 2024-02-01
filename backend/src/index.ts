import * as dotenv from 'dotenv'
import express from 'express'
import router from './application/routes'
import { DatabaseFactory } from './external/factories/database/DatabaseFactory'
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json'; 
const cors = require('cors');

dotenv.config();

const database = DatabaseFactory();
database.connect();

const app = express()

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json())
app.use(router)

app.listen(process.env.HOST_PORT, () => console.log(`Listening ${process.env.HOST_PORT}`))