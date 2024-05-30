# real-time bidding platform


## Overview
The Real-Time Bidding Platform API is a robust and scalable solution built using Node.js, Express, Socket.io, and a SQL database (such as PostgreSQL or MySQL). This API provides comprehensive support for real-time bidding functionality, advanced CRUD operations, user authentication, role-based access control (RBAC), and real-time notifications.

# Key Features:

1. Real-Time Bidding: The API facilitates real-time bidding functionality, allowing advertisers to bid on ad placements dynamically.
2. Advanced CRUD Operations: The API supports Create, Read, Update, and Delete operations for various entities such as users, advertisements, bids, and campaigns.
3. User Authentication: Secure user authentication mechanisms are implemented to ensure that only authorized users can access the system.
4. Role-Based Access Control (RBAC): Role-based access control is integrated to manage user permissions and restrict access to certain functionalities based on user roles.
5. Real-Time Communication: Socket.io is utilized for real-time bid updates and notifications, enabling instant communication between the server and clients.
6. Scalability: The API is designed to be scalable, allowing it to handle a large number of concurrent bids and users efficiently.
7. Database Integration: Seamless integration with a SQL database (PostgreSQL or MySQL) ensures reliable storage and retrieval of data.


## Getting Started
Follow these steps to set up and test the project:


### Prerequisites
- NODE.js installed on your system
- XAMPP installed on your system
- Postman installed on your system

### Installation
1. Clone the repository.
2. Set up XAMPP and ensure the Apache and MySQL services are running.
3. Create the database using phpmyadmin/mySQL and replace the database name in '.env' file 

### Usage
1. Start the XAMPP server.
2. Navigate to the project directory and start the backend server.
3. Use Postman to send requests to the backend endpoints for testing.
   - Base URL: `http://localhost:port/` [replace `port` with the appropriate port number]
   
### Database
- Database Name: `backendInterTask` (example) 

## API Endpoints
### Users:
- `POST /users/register`: Register a new user.
- `POST /users/login`: Authenticate a user and return a token.
- `GET /users/profile`: Get the profile of the logged-in user.

### Items:
- `GET /items`: Retrieve all auction items (with pagination).
- `GET /items/:id`: Retrieve a single auction item by ID.
- `POST /items`: Create a new auction item. (Authenticated users, image upload)
- `PUT /items/:id`: Update an auction item by ID. (Authenticated users, only item owners or admins)
- `DELETE /items/:id`: Delete an auction item by ID. (Authenticated users, only item owners or admins)

### Bids:
- `GET /items/:itemId/bids`: Retrieve all bids for a specific item.
- `POST /items/:itemId/bids`: Place a new bid on a specific item. (Authenticated users)

### Notifications:
- `GET /notifications`: Retrieve notifications for the logged-in user.
- `POST /notifications/mark-read`: Mark notifications as read.


