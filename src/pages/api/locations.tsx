import superagent from 'superagent';
import { Request, Response } from 'express';
import { API_URI } from '../../config';
import { serialize } from '../../utils';

export default async (req: Request, res: Response) => {
    try {
        const {query} = req;
        const response = await superagent.get(`${API_URI}/locations?limit=${serialize(query)}`);
        console.log(response.body)
        res.json(response.body);
    } catch (error) {
        throw Error(error);   
    }
}
  