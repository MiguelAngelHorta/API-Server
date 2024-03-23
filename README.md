# API-Server
 This code sets up a RESTful API using Express in Node.js for managing security controls, including functionalities to add, update, and delete controls, with data stored in memory and presented in a web interface with Bootstrap.

## Setup Instructions

### Prerequisites

- Node.js installed on your machine
 -  https://nodejs.org/en/download
- download express body parser
 - npm install express body-parser cors 
- Postman installed for testing APIs (optional)
 - https://web.postman.co/home

### Steps to Run the App

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/MiguelAngelHorta/Security-Controls-Inventory.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Security-Controls-Inventory
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the Express server:

    ```bash
    node index.js
    ```

5. The server will start running at `http://localhost:3000`. You can now access the front-end by opening `index.html` in your browser.

## Testing the APIs with Postman

### Fetch All Controls

- **Method:** GET
- **Endpoint:** http://localhost:3000/controls
- **Description:** Retrieve all controls from the server.

### Add a New Control

- **Method:** POST
- **Endpoint:** http://localhost:3000/controls
- **Body:** JSON object with the following properties:
  - `mainID` (string): Main Control ID
  - `mainDescription` (string): Main Control Description
  - `domain` (string): Security Domain
  - `scope` (string): Scope
- **Description:** Add a new control to the inventory.

### Update a Control

- **Method:** PUT
- **Endpoint:** http://localhost:3000/controls/:id (Replace `:id` with the ID of the control you want to update)
- **Body:** JSON object with the following properties:
  - `mainDescription` (string): Updated Main Control Description
  - `domain` (string): Updated Security Domain
  - `scope` (string): Updated Scope
- **Description:** Update an existing control in the inventory.

### Delete a Control

- **Method:** DELETE
- **Endpoint:** http://localhost:3000/controls/:id (Replace `:id` with the ID of the control you want to delete)
- **Description:** Delete an existing control from the inventory.

## Summary of JavaScript Functions

- **fetchControls():** Fetches all controls from the server and populates the table.
- **AddData():** Adds a new control to the server and updates the table.
- **updateData(id):** Fetches data of a specific control for editing.
- **updateControl(id):** Updates the data of a specific control on the server and in the table.
- **deleteControl(id):** Deletes a specific control from the server and updates the table.



## Git commits from Visual Studio to Github
- go to folder with files
 - $cd foldername
- Initialize git
 - $git init
- add files
 - $git add .
- commit changes
 - $git commit -m 'message'
- verify remote URL (if not already done)
 - $git remote -v
- Pull Changes from remote repo to synchronize local with Github (if applicable)
 - $git pull --rebase origin main
-Resolve diverged branches (if applicable)
 - $git config pull.ff only
- Pull changes from the remote repository again
 - $git pull --rebase origin main
- push changes
 - $git push -u origin main

 

