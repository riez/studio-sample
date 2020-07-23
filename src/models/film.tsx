export interface FilmModel {
    id: string;
    title: string;
    description: string;
    vehicle_class: string;
    length: string;
    producer: string;
    director: string;
    release_date: string;
    rt_score: string;
    films: Array<string>;
    url: string;
}