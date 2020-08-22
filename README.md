# NODE.JS SERVER FOR USER REGISTRATION AND LOGIN WITH POSTGRES DATABASE

This is a node.js backedn server for registering users and hence can therefore be intergrated in any web or mobile application that requires users to be authenticated

It also uses the JWT Library to provide users with a token on registering or when logging in

## NODE.JS BACKEND SETUP

### INSTALLATIONS

To run the server first you need to the following programs installed on your machine

1. **Node.js**
2. **postresql**

If the following programs are missing kindly visit the links below, download and install them.

1. [Node js](https://nodejs.org/en/)
2. [PostgreSQL](https://postgresql.org/download/)

### STARTING THE SERVER

If you have the all installations ready, run the following commands in your editor

1. **npm install** to install the packages required by the server
2. **npm run dev** to start your server on the machine

### SETTING UP YOUR DATABASE

In your terminal run the following commands to set up the database

1. **psql -U postgres** to connect to your postgresql database
2. Open the file \*_database.sql_ and follow the instructions on creating your database
3. Type **\c databasename** to switch to your database
4. Now back in the **databse.sql** file, follow te instruction on creating the **table for users**
5. In your server folder add the **.env** file and provide your postgress setup as required in the file **db.js** and also add the **secret** in the **.env** file still for the JWT Token e.g. in your **.env file** add **secret = jswt87T** and the database setups.

### TESTING THE SERVER

Install **postman** to test if your server is working properly by routing the given files e.g for **login** in postman type **http"//localhost:8000/auth/login** and provide the required details for login. The method is a **POST** request as required by the server in the file.

### HAPPY CODING :)

Now you can use your setup in the front end part.

Happy coding :)
