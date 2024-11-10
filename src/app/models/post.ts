import { Interactions } from "./interactions";

export class Post {
    idPost!:string;
    content!:string;
    photo!:string
    datePost! : string;
    interactions!: Interactions[];
    
}