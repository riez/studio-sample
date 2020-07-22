export interface FilmModel {
    id: string;
    name: string;
    description: string;
    vehicle_class: string;
    length: string;
    pilot: string;
    films: Array<string>;
    url: string;
}