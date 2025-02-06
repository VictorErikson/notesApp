# 📝 NotesApp

A simple and fast note-taking app built with **React, TypeScript, and Vite**. Notes are stored in **local storage** by default, but you can enable full backend functionality with `json-server` (optional).

## 🚀 Features

- 📌 **Create, edit, and delete notes**
- 🔍 **Search and filter notes**
- 💾 **Data persistence using local storage**
- 🔄 **Fast and responsive UI with React & Vite**
- 🛠️ **Optional backend for full CRUD operations**

## 📦 Installation

### 1️⃣ Clone the repository

```sh
git clone https://github.com/VictorErikson/notesApp.git
cd notesApp
```

### 2️⃣ Install dependencies

```sh
npm install
```

### 3️⃣ Start the development server

```sh
npm run dev
```

The app should now be running at `http://localhost:5173/` (or another port if 5173 is occupied).

---

## 🔥 Optional: Enable Full Backend Functionality

If you want to **store notes in a backend instead of local storage**, you can use `json-server`.

### 1️⃣ Install `json-server`

```sh
npm install -g json-server
```

### 2️⃣ Create & start the backend

Go to notesApp\public\api\data and Run the following command to start a local backend that stores notes in `db.json`:

```sh
json-server --watch db.json --port 5000
```

This will start a mock backend with the following endpoints:

- Notes API: `http://localhost:5000/notes`
- Users API: `http://localhost:5000/users`

### 3️⃣ Update API URL in your code

Modify your API calls in the project to use `http://localhost:5000/notes` or `http://localhost:5000/users` instead of local storage.

---

## 🛠️ Build & Deployment

To build the project for production:

```sh
npm run build
```

To preview the production build:

```sh
npm run preview
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo, submit pull requests, or report issues.

---

## 📜 License

This project is licensed under the **MIT License**.

Happy coding! 🚀
