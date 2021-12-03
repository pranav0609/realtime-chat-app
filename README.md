# realtime-chat-app


KJ SOMAIYA COLLEGE OF ENGINEERING



Realtime Chat Application called AllChat built using the MERN stack as part of MERN mini project for Third year. This app allows users to register and start chatting with their friends in a group. Videos, images support is provided and a feedback page is also provided for the users.


# How to run: 


1) Clone the repo
2) Enter your db variables in a file called dev.js and paste that file in server_side -> cofigurations
3) In terminal enter the following commands one by one
    
    
    cd client_side
    
    
    npm install
    
    
    cd ..
    
    
    npm install
    
    
    npm run dev
    
    
4) Go to localhost:3000


# Dependencies used: 
1) Client side:

  {
  
    "@ant-design/icons": "^4.7.0",
    
    "@testing-library/jest-dom": "^5.14.1",
    
    "@testing-library/react": "^11.2.7",
    
    "@testing-library/user-event": "^12.8.3",
    
    "antd": "^4.16.13",
    
    "antd-demo": "^0.1.0",
    
    "axios": "^0.23.0",
    
    "materialize-css": "^1.0.0-rc.2",
    
    "mdb-react-ui-kit": "^2.0.0",
    
    "moment": "^2.29.1",
    
    "react": "^17.0.2",
    
    "react-dom": "^17.0.2",
    
    "react-dropzone": "^11.4.2",
    
    "react-redux": "^7.2.5",
    
    "react-router-dom": "^5.3.0",
    
    "react-scripts": "4.0.3",
    
    "redux": "^4.1.1",
    
    "redux-promise": "^0.6.0",
    
    "redux-thunk": "^2.3.0",
    
    "socket.io-client": "^4.3.2",
    
    "web-vitals": "^1.1.2"
    
  }
  
2) Server side:

  {
  
    "bcrypt": "^5.0.1",
    
    "body-parser": "^1.18.3",
    
    "concurrently": "^6.3.0",
    
    "cookie-parser": "^1.4.3",
    
    "express": "^4.17.1",
    
    "jsonwebtoken": "^8.5.1",
    
    "mongoose": "^6.0.11",
    
    "multer": "^1.4.3",
    
    "nodemon": "^2.0.13",
    
    "react-redux": "^7.2.5",
    
    "redux": "^4.1.1",
    
    "redux-promise": "^0.6.0",
    
    "redux-thunk": "^2.3.0",
    
    "socket.io": "^4.3.1"
    
  }

# Technologies, libraries and tools used

React js for frontend 

    React-router-dom
    
    Axios
    
    redux
    

Node.js for backend

    Express server with Mongoose
    

MongoDB as the database


Socket.io used for realtime communications.

Authentication using jwt.


Postman for testing the API


VS Code for the editor


Chrome browser for testing frontend





# Functionalities included in the project (currently):
1) Login/Register
2) Realtime messaging
3) Realtime transfer of uploaded documents eg. videos, images etc
4) Video streaming

# Screenshots

![image](https://user-images.githubusercontent.com/66993183/142037471-f473eb6e-56df-4f99-be48-93f68b61a974.png)
![image](https://user-images.githubusercontent.com/66993183/142037536-de7b4de4-cd1b-47af-bf56-888d9670a643.png)
![image](https://user-images.githubusercontent.com/66993183/142037602-c8f86cd2-9130-4e7b-bddc-9ad08087dbaa.png)

# Contributors: 

Pranav Patki - 1911038 (pranav0609), Raj Rathod - 1911043 (ArerehRaj), Divyam Patani - 1911035 (divyampatani)

# Further plans:
1) Integrate video calling into the platform using WebRTC
2) Anonymous chat features like Omegle.
