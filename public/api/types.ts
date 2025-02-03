

export type Users = {
    id: string;
    name: string;
    username: string;
    password: string;
    email: string;
}   

export type Notes = {
    id: string;
    userId: string;
    heading: string;
    tags: string[];
    lastEdited: string;
    text: string;
}