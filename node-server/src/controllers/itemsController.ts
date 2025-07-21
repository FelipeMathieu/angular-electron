import { Request, Response, NextFunction } from 'express';
import { fetchItems } from '../services/itemServices';

export const getItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const searchText = req.query['searchText'] || '';

    const results = await fetchItems(searchText as string);

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};
