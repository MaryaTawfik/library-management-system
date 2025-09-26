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

React.js – component-based UI

React Router DOM – routing & navigation

Jotai – state management (auth, blogs, etc.)

Tailwind CSS – utility-first styling

shadcn/ui – ready-to-use UI components

react-icons – icons (IoMdHome, FaUserCircle, etc.)
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
npm run dev

📸 UI Preview
<img width="1602" height="1022" alt="image" src="https://github.com/user-attachments/assets/47808709-78ef-41ea-9aee-533b36fb90f4" />

<img width="1594" height="1028" alt="image" src="https://github.com/user-attachments/assets/e1f54f29-3e8f-4d3d-b132-3294ee21bbbb" />

<img width="1598" height="933" alt="image" src="https://github.com/user-attachments/assets/872a994d-b570-428e-a1d9-bffede7cf2f5" />

<img width="1232" height="970" alt="image" src="https://github.com/user-attachments/assets/c06e62ee-37b7-4578-ba94-e02e332eee95" />


<img width="1592" height="887" alt="image" src="https://github.com/user-attachments/assets/6b555675-ecb6-48b6-98dd-f005aabfc2d2" />

<img width="1009" height="1078" alt="image" src="https://github.com/user-attachments/assets/0dca2708-4263-4308-9e2f-765025ca1708" />

👨‍💻 Developer Group – Neculer Bombs
This project was proudly built by Neculer Bombs, a team of five passionate developers dedicated to building scalable, secure, and user-friendly systems.

Marya Tawfik     https://github.com/MaryaTawfik
Fetha Awel       https://github.com/Fatiha-A
Hanan Nuru       https://github.com/hanannur
Fenet seifudin https://github.com/fenet-s
jerusalem Girma  https://github.com/laviee143

📧 Contact Email: neculerbombs.dev@gmail.com
Feel free to reach out for collaboration, feedback, or questions. We’re always excited to connect with fellow developers and contributors!






