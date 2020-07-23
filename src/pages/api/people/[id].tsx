import superagent from 'superagent';
import { Request, Response } from 'express';
import { API_URI } from '../../../config';

export default async (req: Request, res: Response) => {
    try {
        const {query: {id}} = req;
        const response = await superagent.get(`${API_URI}/people/${id}`);
        res.json(response.body);
    } catch (error) {
        throw Error(error);
    }
}
  