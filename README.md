![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen)
![License](https://img.shields.io/badge/License-MIT-yellow)

# Yachika@JMIETI : Smart Grievance Redressal System
## Project Overview
Yachika@JMIETI is a smart complaint management system designed for students and faculty at JMIETI. The system streamlines how students can raise issues related to academics, infrastructure, or hostel facilities, while ensuring transparency, anonymity (where required), and accountability.
It is a web-based platform that allows students to submit complaints digitally, track their status in real-time, and receive updates. Admin have his own dashboards to manage, respond, and resolve complaints efficiently. <br>

<h2>Live Demo</h2>
<p>
  Frontend: https://yachikaatjmieti.onrender.com  
Backend API: https://yachika-jmieti.onrender.com</p>

<h2>Key Features</h2>
<b>1. Centralized Complaint System</b><br>
Students can submit all types of complaints — academic, faculty, hostel, infrastructure, or campus-related — through one platform.
Everything goes directly to the Admin for review.<br><br>

<b>2. Anonymous Submission</b><br>
Students can choose to hide their identity using a simple checkbox while submitting a complaint.
If selected, their details remain fully anonymous, including from the Admin.<br>

<b>3. Admin Assignment Workflow</b><br>
-The Admin receives all complaints and is responsible for:<br>
- Reviewing issues<br>
- Assigning them to the correct department<br>
- This keeps the process simple and centralized.<br>

<b>4. Complaint Tracking for Students</b><br>
Students can monitor the progress of their complaint through clear status steps:<br>
- Pending<br>
- In Progress<br>
- Resolved<br>
- Rejected <br>

<b>5. Powerful Admin Dashboard</b><br>
The Admin can:<br>
- View all complaints<br>
- Filter by category or status<br>
- Update progress<br>
- Export as Excel<br>
- Analytics Dashboard<br>
- Maintain anonymity when selected<br>
- if Rejects, sends the reason to the student as notification <br>

<b>6. Notifications</b><br>
Students will receive notifications when admin changes the status of the complaint to any of the status.<br>

<b>7. Rating & Feedback</b><br>
As the complaint of the student resolves, they will receive a Rating and feedback form that they are requested to fill according to their satisfaction of the resolution.<br>

<b>8. Email Verification</b><br>
During signup, students must verify their email using an OTP. An OTP is sent to the student's registered email address. The account is created only after successful OTP verification.<br>

<h2>Technology Stack</h2>
This project is built using the MERN Stack:<br>
- <b>Frontend:</b> React.js, Bootstrap (for responsive UI)<br>
- <b>Backend:</b> Node.js, Express.js<br>
- <b>Database:</b> MongoDB (using Mongoose for schema modeling)<br>
- <b>Authentication:</b> JWT (JSON Web Tokens)<br>
- <b>Encryption of Passwords:</b> Bcrypt <br>

<h2>System Flow</h2>
User → React Frontend → REST API → Node.js/Express Server → MongoDB Database<br>

<h2>Important Note</h2>
<h3>⚠️ Backend Hosting</h3>
<p>The backend of this project is hosted on Render's free tier.
Due to this, the server may enter sleep mode after inactivity. When the server wakes up, the **first API request may take 30–60 seconds** due to a cold start.
After the server becomes active, the APIs respond normally.</p>

<h2>Screenshots</h2>
### Home:
<img width="494" height="268" alt="image" src="https://github.com/user-attachments/assets/6e48c366-fd73-4b0d-8529-7839ad7e2476" />
###Student Dashboard:
<img width="451" height="255" alt="image" src="https://github.com/user-attachments/assets/aef84e80-19da-412a-b6a9-b3ec48aeb905" />
<img width="450" height="254" alt="image" src="https://github.com/user-attachments/assets/af2b7bee-c154-468c-99bb-dcc465de9ec2" />
<img width="442" height="251" alt="image" src="https://github.com/user-attachments/assets/c47f8bb6-25b4-4da5-975a-c74a4511fd64" />
<img width="450" height="256" alt="image" src="https://github.com/user-attachments/assets/ea4bbac1-4f18-479a-ae95-4d67bea15540" />
### Admin Dashboard:
<img width="457" height="257" alt="image" src="https://github.com/user-attachments/assets/634d52b2-7a0f-47a7-a281-6f69225bf969" />
<img width="631" height="359" alt="image" src="https://github.com/user-attachments/assets/bb948c7d-65a1-4471-8d9d-2746dc282ae7" />
<img width="623" height="354" alt="image" src="https://github.com/user-attachments/assets/ccd53f14-b1cb-45ca-bf52-b4c5cc75eec3" />
<img width="604" height="343" alt="image" src="https://github.com/user-attachments/assets/5d7efd0c-d12c-4d55-a6f9-b7ac490c21ee" />
### Signup:
<img width="457" height="257" alt="image" src="https://github.com/user-attachments/assets/fd7780a1-a36f-4bd7-95dc-b97e5923bd28" />
###OTP Verification:
<img width="1366" height="648" alt="image" src="https://github.com/user-attachments/assets/5df9f3aa-c1ef-4a59-9bfb-e9e0e9072b94" />
### Login:
<img width="465" height="263" alt="image" src="https://github.com/user-attachments/assets/abfc78e9-0f19-4350-86f7-42118b310b92" />


<h2>Future Enhancements</h2>
- Auto-assign complaints to respective departments<br>
- Notification system using SMS/Email<br>
- AI-based issue categorization<br>
- Mobile App (React Native)<br>
- SuperAdmin: who will be able to see the anonymous details aswell, to make it free from spammers and abusive compliants.<br>

<h2>License</h2>
This project is licensed under the MIT License.<br>
<h2>Developed By</h2>
<b>Yartik</b><br>
B.Tech CSE | JMIETI<br>
Passionate about using technology to solve real student problems and build meaningful systems.<br>
