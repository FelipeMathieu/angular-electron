import axios from 'axios';
import { IImdbResult } from '../models/imdbResult.interface';
import config from '../config/config';

const { apiUrl } = config;

export const fetchItems = async (searchText: string): Promise<IImdbResult> => {
  if (!URL) {
    throw new Error('Something went wrong with the request URL');
  }

  return axios
    .get<IImdbResult>(`${apiUrl}/search?q=${searchText}`, {
      method: 'GET',
    })
    .then((response) => response.data);
};
