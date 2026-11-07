# CareerTree 🌳

**A comprehensive career development platform that visualizes learning progress, tracks competitive programming achievements, and provides trend-based insights for career growth.**

---

## 📋 Overview

CareerTree is a full-stack web application designed to help developers manage their career development journey. It combines learning path tracking, competitive programming profile aggregation, and trending technology insights into one unified platform. Track your progress on various learning maps, showcase your coding achievements from LeetCode and Codeforces, and stay updated with what's trending in tech.

---

## ✨ Key Features

- **Learning Path Management**: Track progress across C, C++/DSA, and full-stack Web Development roadmaps with granular topic completion tracking
- **Roadmap Lessons**: Browse 20 Web Development lessons and an expanded C++/DSA path, with lesson explanations and practice prompts.
- **Competitive Programming Integration**: Link and display your LeetCode and Codeforces profiles
- **Progress Visualization**: Interactive heatmaps showing your learning activity and consistency
- **Trend Analytics**: Cached Google Trends data with a daily scheduled refresh for selected technologies
- **User Authentication**: JWT sessions, bcrypt password hashing, and email OTP verification
- **Password Recovery**: OTP-verified password reset
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
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT sessions
- **Nodemailer** - Email OTP delivery
- **node-cron** - Scheduled Trends refresh
- **SerpAPI** 2.2.1 - Google Trends API

### Development
- **ESLint** 9.32.0 - Code linting
- **Concurrently** 9.2.1 - Run multiple commands

---

## 📦 Installation

### Prerequisites
- Node.js (v22 or higher)
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

Copy `.env.example` to `.env` (`Copy-Item .env.example .env` in PowerShell) and configure MySQL, Gmail SMTP, and server secrets. Set `EMAIL_USER` to the app's sender Gmail account and `EMAIL_PASS` to its Google App Password; users only provide their own email addresses. To create a Gmail App Password, enable 2-Step Verification on the sender account, then create an App Password in the Google Account security settings.

Generate separate random values of at least 32 characters for `JWT_SECRET` and `OTP_SECRET`. Keep all credentials server-side and never commit `.env`.

On Windows PowerShell, generate each secret with:
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Run it twice and put the two different values in `.env`.

Example `.env` values:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=careertree

JWT_SECRET=long_random_server_secret
OTP_SECRET=different_long_random_server_secret
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_google_app_password
FRONTEND_ORIGIN=http://localhost:5173
SERPAPI_KEY=your_serpapi_key
```

4. **Set up the database**

Create the required tables:
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NULL,
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

For an existing database, back it up and run [`migrations/001_auth_and_trends_cache.sql`](./migrations/001_auth_and_trends_cache.sql) before starting the updated backend. Existing Firebase users must sign up again and verify the same email address; their progress and profile rows are preserved, and the verified registration replaces the old password value with a bcrypt hash.

Run the same migration after creating the tables above for a fresh database; it creates the OTP challenge and Trends cache tables required by the server.

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
- `POST /auth/signup` - Hash a password and send an email verification OTP
- `POST /auth/verify-signup` - Verify the OTP, create/update the account, and return a JWT
- `POST /auth/login` - Verify the password and return a JWT
- `GET /auth/me` - Validate the bearer JWT and return the current user
- `POST /auth/forgot-password` - Send a reset OTP when the account exists
- `POST /auth/reset-password` - Verify reset OTP and store a new bcrypt password hash
- Protected endpoints require `Authorization: Bearer <JWT>`.

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
- `POST /run` - Compile and execute C code (JWT required; bounded compiler worker)

---

## 📖 Usage Examples

### Get User Progress
```javascript
authFetch('http://localhost:5000/user_progress/steps', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
})
.then(res => res.json())
.then(data => console.log(data));
```

### Update Learning Progress
```javascript
authFetch('http://localhost:5000/user_progress/update', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    map: 'JavaScript Fundamentals',
    topic: 'Arrays',
    completed: 1
  })
})
```

These authenticated endpoints require the app's JWT. In the React app, use the `authFetch` helper from `src/api.js` instead of calling `fetch` directly.

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

## 🔐 Security Notes

- Passwords are stored as bcrypt hashes. OTPs are HMAC-hashed, expire after five minutes, and allow at most five verification attempts. Authentication routes are rate-limited.
- JWTs expire after 12 hours. Keep `JWT_SECRET`, `OTP_SECRET`, and SMTP credentials server-side.
- The GCC route uses unique temporary workspaces, per-process compile/runtime timeouts, process-tree termination, output caps, a concurrency limit, and rate limiting. Programs still run as child processes on the host: this is **not a security sandbox** and should not be exposed as a public code-execution service.
- Configure `FRONTEND_ORIGIN` to the exact trusted frontend origin and use HTTPS in production.
- The Trends cache is stored in MySQL. Cached results expire after 24 hours; scheduled keywords refresh daily at 00:00 UTC.
- Trends API requests are rate-limited; scheduled refreshes cover JavaScript, Python, C++, React, and AI.
- Related Trends topics are filtered to remove common generic, date, and location noise and prioritize topics matching the search or classified by Google as technical.

---

## 🐛 Troubleshooting

### Database Connection Failed
- Verify MySQL is running
- Check `.env` credentials
- Ensure database exists

### Authentication or OTP Email Not Working
- Confirm `JWT_SECRET`, `OTP_SECRET`, `EMAIL_USER`, and `EMAIL_PASS` are set in the root `.env`.
- Use a Gmail App Password and confirm MySQL is running with the migration applied.
- Restart the backend after editing `.env` and check its terminal for SMTP or database errors.

### C Compilation Errors
- Ensure GCC is installed and available on the server's `PATH`.
- The host-process runner is not an operating-system sandbox.
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
