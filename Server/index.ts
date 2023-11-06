import * as express from 'express';
import * as cors from 'cors';
import { userRouter } from './routes/users';
import { join } from 'path';
import { productRouter } from './routes/products';

const app = express();


const usersPath = join(
  __dirname,
  'uploads',
  'users',
);

const productsPath = join(
  __dirname,
  'uploads',
  'products',
);

app.use(express.json())
app.use(cors());

app.use('/users', userRouter);
app.use('/user/image', express.static(usersPath));
app.use('/products', productRouter)
app.use('/product/image', express.static(productsPath))

app.listen(3300, () => console.log("servidor rodando na porta 3300"));