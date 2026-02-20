# Kartik's Portfolio

## 📋 Short Description

A modern, full-stack portfolio website showcasing Kartik Patil's projects, skills, and professional work. Features a responsive frontend with smooth animations and an Express.js backend with user authentication, project management, and file upload capabilities using Cloudinary.

---

## 📚 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Project Overview

**Kartik's Portfolio** is a comprehensive personal portfolio website built with modern web technologies. It provides a complete platform to showcase professional work, including:

- **Personal branding** with custom styling and animations
- **Project showcase** with detailed project information
- **Contact functionality** for visitor inquiries
- **Admin panel** for managing portfolio content
- **Backend API** for managing projects and user authentication
- **Cloud storage integration** for image uploads

The project follows a **full-stack architecture** with a separated frontend (HTML/CSS/JavaScript) and backend (Node.js/Express).

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom styling with animations
- **JavaScript (ES6+)** - Interactive functionality
- **Bootstrap 5** - Responsive grid and components
- **Font Awesome 7** - Icon library
- **Google Fonts** - Custom typography

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Multer** - File upload handling
- **Cloudinary** - Cloud-based image storage
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variables management

### Development Tools
- **Nodemon** - Auto-restart server during development

---

## 📁 Project Structure

```
Kartik-s-Portfolio2/
├── frontend/                 # Frontend application
│   ├── index.html           # Home page
│   ├── about.html           # About page
│   ├── project.html         # Projects showcase page
│   ├── contact.html         # Contact page
│   ├── admin.html           # Admin panel
│   ├── k's.css              # Main stylesheet
│   ├── k's.js               # Main JavaScript logic
│   ├── script.js            # Additional scripts
│   ├── about.css            # About page styles
│   ├── css/
│   │   └── style.css        # Additional styles
│   └── img/                 # Image assets
│
├── backend/                  # Backend application
│   ├── server.js            # Express server setup
│   ├── package.json         # Backend dependencies
│   ├── nodemon.json         # Nodemon configuration
│   └── uploads/             # Local file uploads directory
│
├── package.json             # Root package configuration
└── README.md               # Project documentation

```

---

## ✨ Features

### Frontend Features
✅ **Responsive Design** - Mobile-first approach, works on all devices  
✅ **Smooth Animations** - Custom cursor, loading screens, page transitions  
✅ **Navigation** - Intuitive navbar with links to all sections  
✅ **Home Page** - Hero section with introduction  
✅ **About Page** - Professional background and skills  
✅ **Projects Showcase** - Detailed project listings and descriptions  
✅ **Contact Page** - Contact form for visitor inquiries  
✅ **Admin Panel** - Manage portfolio content (if authenticated)  

### Backend Features
✅ **RESTful API** - Clean endpoint structure  
✅ **Database Integration** - MongoDB with Mongoose ORM  
✅ **File Upload** - Multer integration for file uploads  
✅ **Cloud Storage** - Cloudinary integration for image hosting  
✅ **CORS Support** - Cross-origin requests enabled  
✅ **Environment Configuration** - Secure config management with dotenv  
✅ **Error Handling** - Comprehensive error responses  

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas cluster)
- **Cloudinary account** (for image uploads)

### Step 1: Clone the Repository
```bash
git clone https://github.com/kartikpatil124/Kartik-s-Portfolio2.git
cd Kartik-s-Portfolio2
```

### Step 2: Install Root Dependencies
```bash
npm install
```

### Step 3: Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Step 4: Install Backend Dependencies
```bash
cd ../backend
npm install
```

### Step 5: Configure Environment Variables
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```

### Step 6: Start the Backend Server
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5000`

### Step 7: Serve the Frontend
You can use any static server:
```bash
# Using Python
python -m http.server 8000

# Or using Node.js http-server
npx http-server frontend/
```
Access the frontend at `http://localhost:8000` (or the specified port)

---

## 📖 Usage

### Accessing the Portfolio
1. Open your browser and navigate to the frontend URL
2. Browse through sections using the navigation bar:
   - **Home** - Main landing page
   - **About** - Learn about Kartik
   - **Projects** - View portfolio projects
   - **Contact** - Send a message

### Admin Panel
1. Navigate to `admin.html`
2. Authenticate with credentials
3. Manage projects and content
4. Upload images through the admin interface

---

## ⚙️ Configuration

### Backend Configuration (`.env`)
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `CLOUDINARY_NAME` | Cloudinary cloud name | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `your-api-key` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `your-api-secret` |
| `NODE_ENV` | Environment mode | `development` or `production` |

### Nodemon Configuration
Edit `backend/nodemon.json` to customize auto-restart behavior during development.

---

## 🔌 API Endpoints

### Projects
- `GET /api/projects` - Fetch all projects
- `GET /api/projects/:id` - Fetch specific project
- `POST /api/projects` - Create new project (Admin)
- `PUT /api/projects/:id` - Update project (Admin)
- `DELETE /api/projects/:id` - Delete project (Admin)

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/register` - User registration

### File Upload
- `POST /api/upload` - Upload file to Cloudinary

### Contact
- `POST /api/contact` - Submit contact form

*Note: Refer to backend API documentation for detailed request/response formats.*

---

## 📄 File Structure Details

### Frontend Files
- **index.html** - Home page with hero section and featured content
- **about.html** - Professional background, skills, and experience
- **project.html** - Portfolio of completed projects
- **contact.html** - Contact form and information
- **admin.html** - Administrative panel for content management
- **k's.css** - Primary stylesheet with custom designs
- **k's.js** - Main JavaScript with interactive features
- **script.js** - Additional utility scripts
- **about.css** - Specific styles for about page

### Backend Files
- **server.js** - Main Express server with all routes and middleware
- **package.json** - Backend dependencies and scripts
- **nodemon.json** - Development server auto-reload configuration
- **uploads/** - Directory for storing uploaded files temporarily

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the MIT License. See the LICENSE file for more information.

---

## 📞 Contact & Support

For questions, issues, or suggestions:
- **Email** - Contact through the portfolio contact page
- **GitHub** - [GitHub Repository](https://github.com/kartikpatil124/Kartik-s-Portfolio2)
- **Portfolio** - Visit the live portfolio website

---

## 🙏 Acknowledgments

- Bootstrap 5 for responsive framework
- Font Awesome for icons
- Google Fonts for typography
- Cloudinary for cloud image storage
- MongoDB for database solutions

---

**Happy coding! 🎉**

*Last Updated: February 2026*
