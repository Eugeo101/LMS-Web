# Learning Management System (LMS) 🌐📚  

A robust and scalable Learning Management System (LMS) designed to streamline educational workflows. The LMS provides essential features to manage learning resources, user roles, and course content effectively.  

## 🚀 Live Demo  
Check out the deployed LMS on Heroku: [LMS Live](https://swlms.herokuapp.com/)  

---

## 🛠️ Technologies Used  

- **Frontend:**  
  - **Angular (MEAN Stack)** for an interactive and responsive user interface.  

- **Backend:**  
  - **Node.js** with **Express.js** for building a scalable and efficient server.  

- **Database:**  
  - **MongoDB (NoSQL)** for flexible and high-performance data storage.  

- **Deployment:**  
  - Hosted on **Heroku** for seamless access and scalability.  

---

## 🔍 Features  

1. **User Management:**  
   - Admin roles for managing users and courses.  
   - Student roles for accessing course materials and resources.  

2. **Course Management:**  
   - Add, update, and delete courses.  
   - Organize learning materials by topic or module.  

3. **Interactive Dashboard:**  
   - Display key insights and analytics for students and instructors.  

4. **Seamless Authentication:**  
   - Secure login and user authentication with role-based access control.  

5. **Responsive Design:**  
   - Optimized for desktops, tablets, and mobile devices.  

---

## 🛠️ Installation Instructions  

1. **Clone the repository:**  
   ```bash
   git clone [https://github.com/Eugeo101/LMS-Web]
   cd lms
   ```
2. **Install dependencies:**
   ```bash
    npm install
   ```
3. **Set up MongoDB:**
Install MongoDB locally or use a cloud service like MongoDB Atlas.
Update the config.js file with your MongoDB connection URI.

4. **Run the application:**
   ```bash
     npm start
   ```
5. **Access the application:**
   Open your browser and navigate to [https://swlms.herokuapp.com/]
---
# 🚀 Deployment
This application is deployed on Heroku for live usage. For deploying it yourself:

1. **Ensure you have a Heroku account and the Heroku CLI installed.**
2. **Log in to Heroku**
   ```bash
     heroku login
   ```
3. **Create a new Heroku app:**
   ```bash
     heroku create your-app-name
   ```
4. **Deploy the application:**
   ```bash
     git push heroku main
   ```
5. **Set up MongoDB URI in Heroku environment variables:**
   ```bash
     heroku config:set MONGO_URI=your-mongodb-uri
   ```
---
# 📈 Future Enhancements
Integration with third-party learning APIs to expand resource availability.
Advanced analytics dashboard for course performance tracking.
Gamification elements to increase engagement, such as badges and leaderboards.
