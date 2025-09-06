📘 Library Management System
A full-stack web application that allows users to browse a digital book catalog, become paid members, and borrow books. Admins manage books, users, payments, and borrowing workflows. The system includes secure authentication, file uploads, and automated email alerts for due dates and membership expiry.
👥 User Roles
🧑‍🎓 Student (Member)
Browse book catalog without login

Register and log in to borrow books

Upload payment proof (screenshot + bank transaction ID)

Borrow and return books (after payment approval)

Receive email alerts:

Membership expiry

Due date reminders (3 days before)

Overdue notifications

Reset forgotten password via email



🛡️ Admin (Librarian)

Add, update, and delete books

View all users and borrowing history

Approve or reject membership payments

Block/unblock users

Approve or reject return requests

Access dashboards with key metrics:

Total books

Active users

Borrowed books

Payments overview

🔐 Authentication & Security
JWT-based authentication

Password hashing with bcrypt

Role-based access control via middleware

Input validation using express-validator

Secure file uploads with multer + Cloudinary

Email notifications via Nodemailer

📚 Book Management
Add/update/delete books (admin only)

View catalog (open to all)

Search by title, author, category, or ISBN

Borrowing limited to 3 books per member

Overdue books flagged automatically

💳 Membership & Payment Workflow
Student Side
Can browse books without signing up

To borrow books: must register and pay membership fee

Upload screenshot of payment + transaction ID

Wait for admin approval

Admin Side
View all payment requests

Review uploaded screenshot and reference

Approve → activates membership

Reject → borrowing blocked

Optional: set membership expiry date

📬 Email Notifications
Membership expiry reminders

Due date alerts (3 days before)

Overdue notices

Password reset links
🧰 Tech Stack
Backend

Node.js + Express.js

MongoDB + Mongoose

JWT Authentication

bcrypt – Password hashing

Express Validator – Input validation

Multer + Cloudinary – File upload & storage

Nodemailer – Email notifications

Frontend

React.js

Axios – API communication

TailwindCSS / Shadcn UI (if used) – Styling

⚙️ Setup Instructions
1. git clone
https://github.com/MaryaTawfik/library-management-system.git
2. Backend Setup
cd backend
npm install

*Create a .env file:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

*run backend
npm run dev
3. Frontend Setup
cd ../frontend
npm install
npm start

👨‍💻 Developer Group – Neculer Bombs
This project was proudly built by Neculer Bombs, a team of five passionate developers dedicated to building scalable, secure, and user-friendly systems.
Marya Tawfik     https://github.com/MaryaTawfik
Fetha Awel       https://github.com/Fatiha-A
Hanan Nuru       https://github.com/hanannur
Fenet sif Al-din https://github.com/fenet-s
jerusalem Girma  https://github.com/laviee143

📧 Contact Email: neculerbombs.dev@gmail.com
Feel free to reach out for collaboration, feedback, or questions. We’re always excited to connect with fellow developers and contributors!






