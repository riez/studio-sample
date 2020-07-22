import superagent from 'superagent';
import { Request, Response } from 'express';
import { API_URI } from '../../config';

export default async (req: Request, res: Response) => {
    try {
        const {query: {limit}} = req;
        const response = await superagent.get(`${API_URI}/people?limit=${limit}`);
        res.json(response.body);
    } catch (error) {
        throw Error(error);   
    }
}
  