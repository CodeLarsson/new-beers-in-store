import { Request, Response } from 'express';
import { BolagetAPIClient } from '../../../../api-client/bolaget-api-client';

export default async function getNewProductsForStore(
  req: Request,
  res: Response,
) {
  const { storeId, page } = req.body;
  const client = new BolagetAPIClient();

  try {
    const apiResponse = await client.getProducts(storeId, page);

    res
      .status(200)
      .json({ products: apiResponse.products, meta: apiResponse.metadata });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }

    res.status(500).json({ error: 'Something went wrong' });
  }
}
