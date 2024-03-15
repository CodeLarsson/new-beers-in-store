import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';
import { getNewProductsForStore, getStoreIds } from './api';

export const app: Express = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (_: Request, res: Response) => {
  res.sendFile('./index.html');
});

app.get('/api/get-store-ids', getStoreIds);
app.post('/api/get-new-products-for-store', getNewProductsForStore);
