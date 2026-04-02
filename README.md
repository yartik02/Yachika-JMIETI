![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen)
![License](https://img.shields.io/badge/License-MIT-yellow)

# Yachika@JMIETI : Smart Grievance Redressal System
## Project Overview
Yachika@JMIETI is an enterprise-grade, smart complaint management system designed for students at JMIETI. The system digitizes and streamlines how students raise issues related to academics, infrastructure, or hostel facilities, ensuring complete transparency, optional anonymity, and strict accountability.

Built with a secure 3-tier Role-Based Access Control (RBAC) architecture, the platform provides dedicated interfaces for Students, Admins, and SuperAdmins, ensuring complaints are routed, resolved, and escalated efficiently. <br>

<h2>Live Demo</h2>
<p>
  Frontend: https://yachikaatjmieti.onrender.com  
Backend API: https://yachika-jmieti.onrender.com</p>

<h2>Key Features</h2>
<b>1. 3-Tier Role-Based Access Control (RBAC)</b><br>
Secure, distinct workflows for three user types:<br>
- Students: Submit & track complaints, rate resolutions and manage appeal.<br>
- Admins: Review, update status, resolve departmental issues also can report complaints to Super Admin .<br>
- SuperAdmins: Oversee the entire platform, manage escalated SLA breaches, and handle Student suspensions.<br>
<br>

<b>2. Automated SLA Enforcement & Escalation (Cron Jobs)</b><br>
- Powered by background Node.js cron jobs, the system enforces strict Service Level Agreements (SLAs).<br>
- If an Admin fails to resolve or reject a complaint within 7 days, the system automatically flags it as "Unresolved" and escalates it directly to the SuperAdmin dashboard.<br>

<b>3. Advanced Account Moderation & Appeal System</b><br>
- SuperAdmins have the authority to issue temporary (time-bound) or permanent account suspensions for misuse of the platform.<br>
- Suspended students are locked out of the main app but are granted access to a dedicated, secure Appeals Portal where they can submit an explanation.<br>
- SuperAdmins review these appeals via a custom UI to either approve (and instantly restore access) or permanently reject them.<br>

<b>4. High-Performance Admin & SuperAdmin Dashboards</b><br>
- Built using React useMemo and useCallback to ensure zero-latency client-side searching, multi-parameter filtering, and seamless pagination.<br>
- Includes one-click bulk Excel Data Exports for reporting and record-keeping.<br>
- Real-time analytics dashboards to monitor platform health and complaint resolution rates.<br>

<b>5. "Break-Glass" Anonymous Submissions & Abuse Prevention</b><br>
Students can opt for complete cryptographic anonymity using a simple checkbox while submitting sensitive complaints, shielding their identity entirely from departmental Admins. However, to prevent platform spam, the system includes a "break-glass" mechanism: Admins can manually report abusive/fake complaints to the SuperAdmin, who is then granted visibility into the submitter's identity to issue penalties.<br>

<b>6. Dynamic Tracking & Notifications</b><br>
- Students can monitor the progress of their complaints through clear lifecycle stages: Pending → In Progress → Resolved → Rejected.<br>
- Database-driven notifications alert students instantly when an Admin updates their complaint status or provides rejection reasoning.<br>
- To prevent database bloat and maintain query speed, the system employs an automated background purge that deletes notifications older than 30 days, while also giving students manual "Clear All" UI controls.<br>

<b>7. Rating & Feedback</b><br>
As the complaint of the student resolves, they will receive a Rating and feedback form that they are requested to fill according to their satisfaction of the resolution.<br>

<b>8. Secure OTP Email Verification</b><br>
To maintain platform integrity, students must verify their identity using a time-sensitive OTP sent to their registered email address before an account is provisioned.<br>

<h2>Technology Stack</h2>
Developed entirely on the MERN Stack with a focus on modern performance and security standards:<br>
- <b>Frontend:</b> React.js, Bootstrap (for responsive UI)<br>
- <b>Backend:</b> Node.js, Express.js<br>
- <b>Database:</b> MongoDB (using Mongoose for schema modeling)<br>
- <b>Automation:</b> Node-Cron (for background SLA tasks and temporary ban expirations)<br>
- <b>Authentication:</b> JWT (JSON Web Tokens)<br>
- <b>Encryption of Passwords:</b> Bcrypt <br>

<h2>System Flow</h2>
Client (React) → REST API (Express) → Auth/Suspension Middleware → Node.js Controllers → MongoDB<br>

<h2>Important Note</h2>
<h3>⚠️ Backend Hosting</h3>
<p>The backend of this project is hosted on Render's free tier.
Due to this, the server may enter sleep mode after inactivity. When the server wakes up, the **first API request may take 30–60 seconds** due to a cold start.
After the server becomes active, the APIs respond normally.</p>

<h2>Screenshots</h2>
## Home:<br>
<img width=60% alt="image" src="https://github.com/user-attachments/assets/6e48c366-fd73-4b0d-8529-7839ad7e2476" /><br>
##Student Dashboard:<br>
<img width=40% alt="image" src="https://github.com/user-attachments/assets/aef84e80-19da-412a-b6a9-b3ec48aeb905" />
<img width=40% alt="image" src="https://github.com/user-attachments/assets/af2b7bee-c154-468c-99bb-dcc465de9ec2" /><br>
<img width=40% alt="image" src="https://github.com/user-attachments/assets/c47f8bb6-25b4-4da5-975a-c74a4511fd64" />
<img width=40% alt="image" src="https://github.com/user-attachments/assets/ea4bbac1-4f18-479a-ae95-4d67bea15540" /><br>
## Admin Dashboard:<br>
<img width=40% alt="image" src="https://github.com/user-attachments/assets/634d52b2-7a0f-47a7-a281-6f69225bf969" />
<img width=40% alt="image" src="https://github.com/user-attachments/assets/bb948c7d-65a1-4471-8d9d-2746dc282ae7" /><br>
<img width=40% alt="image" src="https://github.com/user-attachments/assets/ccd53f14-b1cb-45ca-bf52-b4c5cc75eec3" />
<img width=40% alt="image" src="https://github.com/user-attachments/assets/5d7efd0c-d12c-4d55-a6f9-b7ac490c21ee" /><br>
## Signup:<br>
<img width=40% alt="image" src="https://github.com/user-attachments/assets/fd7780a1-a36f-4bd7-95dc-b97e5923bd28" />
<img width=40% alt="image" src="https://github.com/user-attachments/assets/5df9f3aa-c1ef-4a59-9bfb-e9e0e9072b94" /><br>
## Login:<br>
<img width=60% alt="image" src="https://github.com/user-attachments/assets/abfc78e9-0f19-4350-86f7-42118b310b92" /><br>


<h2>Future Enhancements</h2>
- Auto-assign complaints to respective departments<br>
- Notification system using SMS/Email<br>
- AI-based issue categorization<br>
- Mobile App (React Native)<br>

<h2>License</h2>
This project is licensed under the MIT License.<br>

<h2>Developed By</h2>
<b>Yartik</b><br>
B.Tech CSE | JMIETI<br>
Passionate about using technology to solve real problems and build meaningful systems.<br>
