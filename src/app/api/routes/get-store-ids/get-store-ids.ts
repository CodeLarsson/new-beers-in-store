import { Request, Response } from 'express';

export default async function getStoreIds(_: Request, res: Response) {
  const storeIds: Record<string, string> = { Asecs: '0601', Atollen: '0602' };

  res.status(200).json({ storeIds });
}
