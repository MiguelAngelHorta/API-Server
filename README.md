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
    npm install express body-parser cors 
    ```

4. Start the Express server:

    ```bash
    node appAPI.js
    ```

5. The server will start running at `http://localhost:3000`. The JSON data in the inventory table can be viewed @ 'http://localhost:3000/controls' in the browser.

![iScreen Shoter - 20240323121144041](https://github.com/MiguelAngelHorta/API-Server/assets/106134627/1ff8b694-f6f0-46b2-87da-a7ef987a8949)

![iScreen Shoter - Google Chrome - 240323145703](https://github.com/MiguelAngelHorta/API-Server/assets/106134627/2e63de71-1646-45d4-9f68-6ce6bc8bce1d)

6. Interact with the frontend by opening folder in Visual Studio and opening the 'indexAPI.html' file through

![iScreen Shoter - 20240323145504663](https://github.com/MiguelAngelHorta/API-Server/assets/106134627/6340e750-606b-4cbf-b428-7338a9393863)


## Testing the APIs with Postman
![iScreen Shoter - 20240323121615435](https://github.com/MiguelAngelHorta/API-Server/assets/106134627/6806f9aa-1979-4121-8d4e-b29a6876b91c)


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

 

