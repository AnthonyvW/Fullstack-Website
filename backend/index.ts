import bodyParser from 'body-parser'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'

const app = express()
const router = express.Router()
const port = 3000
const rootFilePath = './assets'

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
  name: string;
  price: number;
  description: string;
}

const products: Product[] = [
  {id: 1, name: 'Wobbly Ladder', price: 19.99, description: "This is a wobbly ladder."},
  {id: 2, name: 'Slippery Boots', price: 19.99, description: "This is a pair of slippery boots."},
  {id: 3, name: 'Conductive Gloves', price: 19.99, description: "This is a pair of conductive gloves."},
  {id: 4, name: 'Open Toed Shoes', price: 10.00, description: "This is a pair of open toed shoes."},
  {id: 5, name: 'Neurotoxins', price: 100.00, description: "A bottle of neurotoxins."}
];
const isAdmin: boolean[] = [false];

//router.post('/user', createUser)
//router.delete('/user/:userID', deleteUser)
//router.get('/user/:userID', getUser)
//router.get('/users', getUsers)
//router.put('/user/:userID', updateUser)

router.post('/shop', addProduct)
router.delete('/shop/:id', deleteProduct)
router.get('/shop/:id', getProduct)
router.get('/shop', getProducts)
//router.put('/shop/:id', updateProduct)

function genId(PRODUCT: Product[]): number {
  return PRODUCT.length > 0 ? Math.max(...PRODUCT.map(product => product.id)) + 1 : 11;
}

async function addProduct(request: Request, response: Response, next: NextFunction){
  const product = request.body as Product
  product.id = genId(products)
  console.log("Adding Product. . .")
  products.push(product)
  response.status(201).json(product)
}

async function deleteProduct(request: Request, response: Response, next: NextFunction){
  const productID = parseInt(request.params.id)
  const productIndex = products.findIndex(product => product.id == productID)
  console.log(request)
  if (productIndex > -1) {
    products.splice(productIndex, 1)

    response.status(200).send()
  } else {
    response.status(404).send()
  }
}
async function getProduct(request: Request, response: Response, next: NextFunction){
  const productID = parseInt(request.params.id)
  const product: Product = products.find(product => product.id == productID)

  if (product) {
    response.status(200).json(product)
  } else {
    response.status(404).send()
  }
}
async function getProducts(request: Request, response: Response, next: NextFunction){
  response.status(200).json(products)
}

/** List of HTTP response status codes https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#information_responses */
/*
async function createUser(request: Request, response: Response, next: NextFunction) {
  const user = request.body as User
  const randomID = parseInt(crypto.randomUUID())

  user.id = randomID

  users.push(user)

  response.status(201).json(user)
}

async function deleteUser(request: Request, response: Response, next: NextFunction) {
  const userID = parseInt(request.params.userID)
  const userIndex = users.findIndex(user => user.id == userID)

  if (userIndex > -1) {
    users.splice(userIndex, 1)

    response.status(200).send()
  } else {
    response.status(404).send()
  }
}

async function getUser(request: Request, response: Response, next: NextFunction) {
  const userID = parseInt(request.params.userID)
  const user: User = users.find(user => user.id == userID)

  if (user) {
    response.status(200).json(user)
  } else {
    response.status(404).send()
  }
}

async function getUsers(request: Request, response: Response, next: NextFunction) {
  response.status(200).json(users)
}

async function updateUser(request: Request, response: Response, next: NextFunction) {
  const userID = parseInt(request.params.userID)
  const userIndex = users.findIndex(user => user.id == userID)
  const user = request.body as User

  if (userIndex > -1) {
    users[userIndex] = user

    response.status(200).send()
  } else {
    response.status(404).send()
  }
}
*/