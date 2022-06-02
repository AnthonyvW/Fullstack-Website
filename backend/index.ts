import bodyParser from 'body-parser'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import { Pool } from 'pg'


const app = express()
const router = express.Router()
const port = 3000

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "kartoriuminterndb",
  password: "admin",
  port: 5432
})

app.use(cors({ origin: "http://localhost:4200" }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(router)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

router.get('/', (request: Request, response: Response) => {
  response.json({ info: 'Karta Software Node.js, Express, and Postgres API' })
})

type Product = {
  id: number;
  product_name: string;
  price: number;
  product_description: string;
}
const isAdmin: boolean[] = [false];

router.post('/shop', addProduct)
router.delete('/shop/:id', deleteProduct)
router.get('/shop/:id', getProduct)
router.get('/shop', getProducts)
//router.put('/shop/:id', updateProduct)

async function addProduct(request: Request, response: Response, next: NextFunction){
  pool.query(`SELECT create_product($1, $2, $3);`, [request.body.product_name, request.body.product_description, request.body.price]).then(
    query => response.status(201).json(query.rows[0])
  )
}
async function deleteProduct(request: Request, response: Response, next: NextFunction){
  const product_ID = parseInt(request.params.id)
  pool.query('DELETE FROM products WHERE id = $1;', [product_ID]).then(
    query => response.status(200).json(query.rows[0])
  )

}
async function getProduct(request: Request, response: Response, next: NextFunction){
  const product_ID = parseInt(request.params.id)
 
  pool.query('SELECT * FROM products WHERE id = $1;', [product_ID]).then(
    query => response.status(200).json(query.rows[0])
  )

}
async function getProducts(request: Request, response: Response, next: NextFunction) {
  console.log("Getting Products. . .")
  pool.query('SELECT * FROM products;', []).then(
    query => response.status(200).json(query.rows)
  )
}