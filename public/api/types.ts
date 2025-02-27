

export type Users = {
    id: string;
    name: string;
    username: string;
    password: string;
    email: string;
}   

// export interface Notes {
//     id: string;
//     userId: string;
//     heading: string;
//     tags: string[];
//     lastEdited: string;
//     text: string;
// }

export interface Notes {
   id?: string;
   userId?: string;
   heading: string;       
   tags: string[];       
   lastEdited?: string;
   text: string;
}