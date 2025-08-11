
# Change-Makers (Volunteer Duty Platform)

<img width="1920" height="907" alt="Screenshot (296)" src="https://github.com/user-attachments/assets/41289416-8748-45b9-b795-abc4fb4968dc" />

A full-stack volunteer management platform built using the **MERN** (MongoDB, Express.js, React.js, Node.js) stack.
This project enables organizations to post volunteer opportunities and manage applicants, while volunteers can browse duties, apply, and donate to support causes.

---

## Features

* User authentication (JWT-based login and registration)
* Role-based access control (Volunteer, Organization, Admin)
* Post and manage volunteer duties for organizations
* Browse, search, and filter duties for volunteers
* Application tracking system
* Integrated **bKash payment gateway** for donations
* Responsive UI design
* Days-ago indicator for duties

---

## Tech Stack

**Frontend:** React.js, Tailwind CSS, Redux Toolkit, Lucide Icons
**Backend:** Node.js, Express.js
**Database:** MongoDB
**Authentication:** JWT (JSON Web Token)
**Payment Integration:** bKash API

---

## Installation & Setup

### Prerequisites

* Node.js installed
* MongoDB installed and running
* bKash developer account (for payment integration)

---

### Steps to Run Locally

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/volunteer-duty-platform.git
cd volunteer-duty-platform
```

#### 2️⃣ Install Dependencies

**Backend dependencies:**

```bash
cd backend
npm install
```

**Frontend dependencies:**

```bash
cd ../frontend
npm install
```

#### 3️⃣ Set Up Environment Variables

Create a `.env` file in the **backend** directory and add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
BKASH_API_KEY=your_bkash_api_key
BKASH_API_SECRET=your_bkash_api_secret
PORT=4000
```

---

#### 4️⃣ Run the Application

**Start the backend server:**

```bash
cd backend
npm run dev
```

**Start the frontend server:**

```bash
cd ../frontend
npm start
```

---

#### 5️⃣ Open the Application

Visit:

```
http://localhost:3000
```

---

## Folder Structure

```
volunteer-duty-platform/
│── backend/       # Express.js backend
│── frontend/      # React.js frontend
│── README.md      # Project documentation
│── .gitignore     # Git ignore file
│── package.json   # Backend package.json
```

---

## Bkash Integration through coding
https://github.com/samiha-mahin/bkash_payment_gateway.git

---

## Contributing

Feel free to fork this repository and submit pull requests for improvements and fixes.

---

## License

This project is licensed under the **MIT License**.

---


## License

This project is licensed under the **MIT License**.



---

## Contact

For any queries or contributions, please raise an issue on GitHub or contact the project owner.

---

