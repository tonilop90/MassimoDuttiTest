import { Interface } from 'readline';
import { IShip } from './ship';

export interface IShipsResponse {
    count: number,
    next: string,
    previous: string,
    results: Array<IShip>
}