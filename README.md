# Quora-Like Q&A Platform – Backend

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/rays-code/QA_Platform.git
cd QA_Platform
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Environment Variables
Create a `.env` file in the root directory and add:

```env
PORT=3000
DB_URI=mongodb://localhost:27017/your_db_name
JWT_KEY=your_jwt_secret_key
```

### 4️⃣ Start the Server
First, navigate to the `src` directory:
```bash
cd src
```

Then run the server using either:

```bash
node server.js
```

or (if using nodemon):

```bash
nodemon server.js
```

Server will run at:
```
http://localhost:3000
```
