const fetchData = async <T,>(url: string): Promise<T> => {
  try {
    const response: Response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return Promise.reject(error);
  }
};

export default fetchData;

// import { useEffect, useState } from "react";

// const fetchUsers = async () => {
//     const response = await fetch("/src/api/data.json"); // Fetch local JSON
//     return await response.json();
// };

// const Users = () => {
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         fetchUsers().then(setUsers).catch(console.error);
//     }, []);

//     return (
//         <div>
//             <h1>Users</h1>
//             {users.map(user => (
//                 <div key={user.id}>
//                     <h2>{user.name}</h2>
//                     <p>{user.email}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Users;
