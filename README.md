# CareerTree 🌳

**A comprehensive career development platform that visualizes learning progress, tracks competitive programming achievements, and provides trend-based insights for career growth.**

---

## 📋 Overview

CareerTree is a full-stack web application designed to help developers manage their career development journey. It combines learning path tracking, competitive programming profile aggregation, and trending technology insights into one unified platform. Track your progress on various learning maps, showcase your coding achievements from LeetCode and Codeforces, and stay updated with what's trending in tech.

---

## ✨ Key Features

- **Learning Path Management**: Track progress across multiple learning maps with granular topic completion tracking
- **Competitive Programming Integration**: Link and display your LeetCode and Codeforces profiles
- **Progress Visualization**: Interactive heatmaps showing your learning activity and consistency
- **Trend Analytics**: Real-time Google Trends data to identify emerging technologies and topics
- **User Authentication**: Secure signup/login with email OTP verification
- **Password Recovery**: OTP-based password reset functionality
- **C Code Compilation**: In-browser C code compilation and execution
- **Responsive UI**: Built with React and modern web technologies

---

## 🛠️ Tech Stack

### Frontend
- **React** 19.1.1 - UI library
- **Vite** 7.1.0 - Build tool and dev server
- **React Router DOM** 7.8.0 - Client-side routing
- **Recharts** 3.3.0 - Data visualization
- **React Calendar Heatmap** 1.10.0 - Heatmap visualization
- **React Markdown** 10.1.0 - Markdown rendering
- **React Syntax Highlighter** 15.6.1 - Code highlighting

### Backend
- **Express** 5.1.0 - Web framework
- **Node.js** - Runtime environment
- **MySQL2** 3.15.3 - Database driver
- **Nodemailer** 7.0.9 - Email service
- **Bcrypt** 6.0.0 - Password hashing
- **Firebase** 12.4.0 - Backend services
- **SerpAPI** 2.2.1 - Google Trends API

### Development
- **ESLint** 9.32.0 - Code linting
- **Concurrently** 9.2.1 - Run multiple commands

---

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MySQL database
- `.env` file with required environment variables

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/sarvanshjalwani/CareerTree.git
cd CareerTree
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:
```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=careertree

# Email Service
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# API Keys
SERPAPI_KEY=your_serpapi_key
```

4. **Set up the database**

Create the required tables:
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  codeforces_handle VARCHAR(255),
  leetcode_username VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_progress (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  map_name VARCHAR(255) NOT NULL,
  topic_name VARCHAR(255) NOT NULL,
  completed TINYINT DEFAULT 0,
  completed_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE KEY unique_progress (user_id, map_name, topic_name)
);
```

---

## 🚀 Running the Application

### Development Mode

Run both frontend (Vite dev server) and backend (Express server) concurrently:

```bash
npm run all
```

Or run them separately:

**Frontend (Vite dev server)**
```bash
npm run dev
```
Runs on `http://localhost:5173`

**Backend (Express server)**
```bash
npm run serve
```
Runs on `http://localhost:5000`

### Production Build

```bash
npm run build
npm run preview
```

---

## 📚 API Endpoints

### Authentication
- `POST /signup` - Register with email and password
- `POST /login` - Login with email and password
- `POST /verify-otp` - Verify OTP for signup
- `POST /forgot-password` - Request password reset OTP
- `POST /verify-reset-otp` - Verify reset OTP
- `POST /reset-password` - Update password

### User Profile
- `POST /user/handles` - Get LeetCode and Codeforces handles
- `POST /user/update_handles` - Update coding platform handles

### Progress Tracking
- `POST /user_progress/status` - Get completion status for a topic
- `POST /user_progress/update` - Update topic completion
- `POST /user_progress/steps` - Get overall progress by map

### Trends & Insights
- `GET /api/timeline/:keyword` - Get trending timeline data
- `GET /api/related-topics/:keyword` - Get related topics from trends
- `GET /api/trends/:keyword` - Get combined trends data

### Tools
- `POST /run` - Compile and execute C code

---

## 📖 Usage Examples

### Get User Progress
```javascript
fetch('http://localhost:5000/user_progress/steps', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userId: 1 })
})
.then(res => res.json())
.then(data => console.log(data));
```

### Update Learning Progress
```javascript
fetch('http://localhost:5000/user_progress/update', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 1,
    map: 'JavaScript Fundamentals',
    topic: 'Arrays',
    completed: 1
  })
})
```

### Fetch Trends Data
```javascript
fetch('http://localhost:5000/api/trends/React')
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 📁 Project Structure

```
CareerTree/
├── src/                      # React components and pages
├── public/                   # Static assets
├── server.js                 # Express server & API routes
├── heatserver.js             # Heatmap-related routes
├── vite.config.js            # Vite configuration
├── eslint.config.js          # ESLint configuration
├── package.json              # Dependencies & scripts
└── README.md                 # This file
```

---

## 🔐 Security Considerations

- Passwords should be hashed using bcrypt before storage
- OTP tokens expire after 5 minutes
- Use environment variables for sensitive data
- Enable CORS only for trusted origins in production
- Implement rate limiting on authentication endpoints
- Use HTTPS in production

---

## 🐛 Troubleshooting

### Database Connection Failed
- Verify MySQL is running
- Check `.env` credentials
- Ensure database exists

### Email Not Sending
- Verify Gmail app password in `.env`
- Enable "Less secure app access" or use app-specific passwords
- Check internet connection

### C Compilation Errors
- Ensure GCC is installed on the system
- Check code syntax
- Review compiler output for details

---

## 📝 Scripts

```json
{
  "dev": "vite",                     // Start dev server
  "build": "vite build",             // Build for production
  "lint": "eslint .",                // Run ESLint
  "preview": "vite preview",         // Preview production build
  "serve": "node server.js",         // Start Express server
  "all": "concurrently ..."          // Run dev + serve together
}
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👤 Author

**Sarvansh Jalwani**
- GitHub: [@sarvanshjalwani](https://github.com/sarvanshjalwani)

---

## 🙏 Acknowledgments

- Google Trends API via SerpAPI
- LeetCode and Codeforces for competitive programming data
- React and Vite communities for excellent tools

---

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Happy coding and keep growing your career tree! 🌱**
