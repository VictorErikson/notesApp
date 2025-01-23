

export type Users = {
    id: number;
    name: string;
    username: string;
    password: string;
    email: string;
}   

export type Notes = {
    noteId: number;
    userId: number;
    heading: string;
    tags: string[];
    lastEdited: string;
    text: string;
}