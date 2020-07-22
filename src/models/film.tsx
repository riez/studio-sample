export interface FilmModel {
    id: string;
    title: string;
    description: string;
    vehicle_class: string;
    length: string;
    producer: string;
    release_date: string;
    films: Array<string>;
    url: string;
}