# 🌸 Petal Notes — Full Stack Notes Management App  

A simple yet powerful note-taking solution built to streamline everyday note management with an intuitive interface and practical features.  

---  

## 📌 1. Project Overview  

**Petal Notes** is a full-stack web application that allows users to create, manage, organize, and store their personal notes efficiently. The application provides a clean and modern interface combined with a robust backend system supporting features like soft delete (trash), pinning, categorization, and search. It is built using a server-rendered architecture with a strong focus on clean code, scalability, and real-world backend practices.  

---  

## 🎯 2. Objectives  

- Build a real-world full-stack application from scratch  
- Practice backend architecture using Node.js and Express  
- Implement CRUD operations with MongoDB  
- Apply soft delete (trash system) and permanent deletion  
- Implement pin/unpin functionality with sorting logic  
- Build category-based filtering system  
- Implement search functionality  
- Learn session-based authentication  
- Apply centralized error handling  
- Prepare a deployment-ready project  

---  

## 🚀 3. Features  

### 🎨 Frontend Features  

#### 🧩 UI & Layout  
- Clean and modern user interface  
- Fully responsive design (mobile + desktop)  
- Sidebar navigation with sections and collections  
- Dynamic greeting messages on dashboard  

#### 📝 Notes Display  
- Grid-based note layout  
- Each note includes:  
  - Title  
  - Description preview  
  - Category tag  
  - Last updated date  
- Hover-based action buttons (Edit, Delete, Pin)  

#### 📂 Category Filtering  
- Separate pages for:  
  - Work  
  - Personal  
  - Ideas  
- Displays only relevant notes based on category  

#### 📌 Pin System (UI)  
- Pinned notes visually marked  
- Pinned notes appear at the top  
- Toggle pin/unpin functionality  
- Dedicated Pinned page for important notes  

#### 🗑️ Trash System (UI)  
- Dedicated Trash page  
- Shows soft-deleted notes  
- Options:  
  - Restore note  
  - Permanently delete note  

#### 🔍 Search Feature (UI)  
- Search bar in dashboard  
- Filters notes dynamically  
- Shows "No results found" state  

#### ⚠️ Error Handling (UI) 
- Inline error messages  
- User-friendly feedback  
- Form data preserved on error  

---  

### ⚙️ Backend Features  

#### 🔐 Authentication System  
- User registration and login  
- Password hashing using bcrypt  
- Session-based authentication  
- Protected routes using middleware  

#### 🧠 Notes Management (CRUD)  
- Create notes  
- Read notes (dashboard + filters)  
- Update notes  
- Soft delete notes  
- Permanently delete notes  

#### 🗑️ Soft Delete System  
- Uses `isTrashed` flag  
- Notes moved to trash instead of deletion  
- Trash page for managing deleted notes  
- Restore functionality implemented  

#### 📌 Pinning Logic  
- Toggle pin/unpin  
- Sorting logic:  
  - Pinned notes first  
  - Then latest created notes  

#### 📂 Category Filtering  
- Query-based filtering  
- Efficient MongoDB queries  
- Separate routes for each category  

#### 🔍 Search Functionality  
- Search by title and description  
- Case-insensitive search using RegEx  
- Integrated with dashboard route  

#### 🔁 Dynamic Redirect System  
- Redirects user back to the same page after actions  
- Uses `redirectTo` query parameter  

#### ⚠️ Centralized Error Handling  
- Custom `AppError` class  
- Global error handling middleware  
- Handles validation errors, database errors, and custom errors  
- Context-aware rendering using request metadata  

---

## 🛠️ 4. Tech Stack  

### 🎨 Frontend  
- HTML5  
- CSS3  
- EJS (Embedded JavaScript Templates)  
- JavaScript (Vanilla)  

### ⚙️ Backend  
- Node.js  
- Express.js  

### 🗄️ Database  
- MongoDB Atlas (Cloud Database)  
- Mongoose (ODM)  

### 🔐 Authentication / Tools  
- express-session  
- bcrypt  
- dotenv  
- Git & GitHub  

---  

## 📁 5. Project Structure  

```  
project-root/  
│
├── controllers/        # Business logic  
├── models/             # Database schemas  
├── routes/             # Application routes  
├── middleware/         # Auth & error middleware  
├── public/             # Static assets  
│   ├── styles/  
│   ├── scripts/  
│   └── images/  
├── views/              # EJS templates  
│   ├── auth/  
│   └── notes/  
├── utils/              # Utilities (AppError etc.)  
├── .env  
├── app.js  
└── package.json  
```  

---  

## ⚙️ 6. Installation / Setup  

```bash  
git clone <your-repo-link>  
cd project-folder  
npm install  
```  

---  

## ▶️ 7. Running the Project  

```bash  
npm start  
```  

App runs on:  

```  
http://localhost:3000  
```  

---

## 🔗 8. Application Routes  

### 🧾 Notes Routes  

| Method | Endpoint      | Description           |  
|--------|---------------|-----------------------|  
| GET    | /dashboard    | Show all notes        |  
| GET    | /new          | Show create note form |  
| POST   | /             | Create note           |  
| GET    | /:id/edit     | Show edit form        |  
| POST   | /:id          | Update note           |  
| POST   | /:id/trash    | Move to trash         |  
| POST   | /:id/delete   | Permanent delete      |  
| POST   | /:id/restore  | Restore note          |  
| POST   | /:id/pin      | Toggle pin            |  

### 📂 Filter Routes  

| Method | Endpoint      | Description    |  
|--------|---------------|----------------|  
| GET    | /work         | Work notes     |  
| GET    | /personal     | Personal notes |  
| GET    | /ideas        | Ideas notes    |  
| GET    | /pinned-notes | Pinned notes   |  
| GET    | /trash-page   | Trash page     |  

### 🔐 Auth Routes  

| Method | Endpoint   | Description        |  
|--------|---------   |--------------------|  
| GET    | /register  | Show register page |  
| POST   | /register  | Register user      |  
| GET    | /login     | Show login page    |  
| POST   | /login     | Login user         |  
| GET    | /logout    | Logout user        |  

---  

## 🔒 9. Security Considerations  

- Passwords hashed using bcrypt  
- Session-based authentication  
- Protected routes using middleware  
- Environment variables used for sensitive data  
- MongoDB secured with credentials  
- Input validation and sanitization  
- No sensitive data exposed to frontend  

---  

## 🔮 10. Future Improvements  

- Pagination for notes  
- Rich text editor  
- Tagging system  
- Note sharing feature  
- REST API version  
- Improved search (fuzzy search / indexing)  
- User profile management  

---  

## 👨‍💻 11. Author / Contact  

**Developer:** Syed Muhammad Abbas  

- 📧 Email: abbas63891@gmail.com  
- 💼 LinkedIn: https://linkedin.com/in/syed-muhammad-abbas-07831437b  
- 🐙 GitHub: https://github.com/MdAbbas762  

> Feel free to reach out for collaboration, feedback, or opportunities.  

---  