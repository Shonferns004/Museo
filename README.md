# Museo

Museo is a web-based museum management system with two separate applications:

- **Admin**: For museum administrators to manage monuments, exhibits, and users.  
- **Client**: For public users to explore museum data.

---

## 🚀 Features

### Admin
- User authentication and context management
- Dashboard for managing monuments and exhibits
- Add, edit, and delete monument records
- Tailored admin interface with navigation and layout components

### Client
- Public-facing interface
- User authentication
- Explore monuments and exhibits
- Clean and responsive UI

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://reactjs.org/) with [Vite](https://vitejs.dev/)  
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)  
- **State & Context**: React Context API  
- **Build Tools**: PostCSS, ESLint  

---

## ⚙️ Installation & Setup

- Clone the repository and navigate to the root folder:

```
git clone https://github.com/your-username/Museo.git
cd Museo-main
```
- Setup Admin App
```
cd admin
npm install
npm run dev
```
- Setup Client App
```
cd client
npm install
npm run dev
```
- Setup Model 
```
cd model
pip install -r requirements.txt

```
---

## 🧑‍💻 Development Notes

- Make sure Node.js (>= 16) is installed.

- Both apps are independent — you can run them separately.

- Tailwind configs and ESLint are preconfigured.

---

## 🔮 Future Development

- Planned improvements and features for upcoming releases:

- Backend Integration: Connect both Admin and Client apps to a secure backend API (Node.js/Express, Django, etc.).

- Database Support: Store monument and user data in a relational (PostgreSQL/MySQL) or NoSQL (MongoDB) database.

- Authentication Enhancements: Role-based access control (admins, curators, general users).

- Search & Filters: Allow users to search monuments by name, category, or location.

- Image & Media Management: Upload and manage photos/videos for exhibits.

- Responsive Improvements: Optimize layouts for mobile and tablet users.

- Multi-language Support: Add i18n for a broader audience.

- Testing & CI/CD: Unit and integration tests with Jest/React Testing Library, plus GitHub Actions for automated builds.

- Deployment: Host both apps on services like Vercel, Netlify, or Docker containers for production use.
