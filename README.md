# Project Structure 
    api-backend/
    │── app.js          # Entry point
    │── models/            # Mongoose models(UserTask)
    │── routes/            # API routes
    │── controllers/       # Route handlers
    │── middleware/        # Auth middleware
    │── utils/
    │── config/            # Database connection
    │── .env               # Environment variables
    │── package.json
    task-manage-frontend/
    │── public/
    │── src/
    │   │── api/
    │   │── components/
    │   │── App.js
    │   │── index.js
    │── package.json
    │── README.md

    README.md
    
 # Task Manager API (Backend)

## Setup
1. Go to backend folder:
    cd api-backend
    
2. Install dependencies:
   npm install

3. Setup environment variables and Create a .env     file inside api-backend folder:

    PORT=5000
    MONGO_URI=mongodb://localhost:27017/taskmanager 
    # Use MongoDB Atlas, replace mongodb://localhost:27017/taskmanager with your Atlas URI.
    JWT_SECRET=mysecretkey

4. Start server
    node app.js

# Backend runs at: http://localhost:5000

 # Endpoints
    # Auth

        POST /api/auth/signup → Register new user

        POST /api/auth/login → Login existing user

    #Tasks

        GET /api/tasks → Fetch all tasks 

        POST /api/tasks → Create new task

        PUT /api/tasks/:id → Update a task

        DELETE /api/tasks/:id → Delete a task

# Testing the API

    Use Postman / Thunder Client:

        1. Signup → POST http://localhost:5000/api/auth/signup

            Body(JSON):
                {
                    "name": "John Doe",
                    "email": "john@example.com",
                    "password": "123456"
                }

            Response:
                {
                    "message": "User registered successfully",
                    "token": "jwt_token_here"
                }


        2. Login -> POST http://localhost:5000/api/auth/login

        3.Create Task -> POST http://localhost:5000/api/tasks

            Headers:
                Copy token ie generated in login or signup response → Add to Authorization Header as Bearer <token>

            Body(JSON):
                {
                    "title": "Finish Project",
                    "description": "Complete the backend API",
                    "status": "Pending",
                    "dueDate": "2025-08-29"
                }

        4. Get User Tasks -> GET http://localhost:5000/api/tasks

                Headers:
                Copy token ie generated in login or signup response → Add to Authorization Header as Bearer <token>

            Body(JSON):
                {
                    "title": "Finish Project",
                    "description": "Complete the backend API",
                    "status": "Pending",
                    "dueDate": "2025-09-29"
                }
        5. Update Task -> PUT http://localhost:5000/api/tasks/:id

        6. Delete Task -> DELETE http://localhost:5000/api/tasks/:id

# ------------------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>

## TASK Manager Frontend(Frontend)

1. Go to Frontend Folder:
        cd task-manager-frontend

2. Install dependencies:
        npm install
    
3. Start
        npm start

# Frontend runs at: http://localhost:3000

#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ADMIN AND USER DETAILS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
(ALREADY CREATED)

1) Admin Details : 
    mail : example@gmail.com
    pass : Example@123

2) User1 Details:
   mail : react@gmail.com
   pass : React@123
   
3) User1 Details:
   mail : demo@gmail.com
   pass : Demo@123


