# ConRad (Concept Randomizer)

ConRad is a web application that generates a unique combination of concepts from pre-defined categories for each group. When a user enters their group number, the application randomly selects four concepts—one from each category—that have not been used within that group until it is reset.

## Features

- **Predefined Concept Pools:**  
  Each category contains a fixed set of concepts used for every round.

- **Unique Combinations:**  
  When you enter your group number, four concepts (one from each category) are generated without repeating any concept within the same group.

- **Enter Key Support:**  
  You can press Enter or click the button to confirm your group number.

- **Visual Effects:**  
  A sweep effect with mild distortion is displayed for 2 seconds while the concepts are generated.

- **Copy Functionality:**  
  Easily copy your unique concept list to the clipboard with one click.

## Technologies

- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Backend:** Node.js, Express
- **Storage:** JSON file for data persistence (suitable for small projects)
- **Deployment:** Render (or alternative hosting platforms)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/turbomacka/ConRad.git
cd ConRad
2. Setup the Backend
Navigate to the backend folder:

bash
Kopiera
cd backend
Install dependencies:

bash
Kopiera
npm install
Create a file named data.json in the backend folder with the following content:

json
Kopiera
{
  "groups": {}
}
Start the backend server:

bash
Kopiera
node server.js
The server should now be running on port 3000.

3. Setup the Frontend
Navigate to the frontend folder:

bash
Kopiera
cd ../frontend
You can test the frontend by opening index.html directly in your browser, or run a simple local server. For example, using Python:

bash
Kopiera
python -m http.server 5500
Open your browser and go to:

arduino
Kopiera
http://localhost:5500
Usage
Enter Your Group Number:
Input your group number in the provided text field.

Generate Concepts:
Press Enter or click the "Hämta Begrepp" button.

Visual Effect:
A sweep effect with distortion will play for 2 seconds while the concepts are generated.

View Your Unique Concepts:
After the effect, your unique list of four concepts will be displayed.

Copy the List:
Click the "Kopiera begreppen" button to copy the list to your clipboard.

Deployment
Deploying to Render
Backend Deployment:

Create a new Web Service on Render.
Link your GitHub repository containing the backend code.
Set the build command (e.g., npm install) and start command (node server.js).
Render will automatically set the appropriate environment variables (e.g., PORT).
Frontend Deployment:

You can deploy the frontend as a Static Site on Render by pointing to your frontend folder.
Alternatively, integrate the frontend into the backend service if desired.
License
This project is licensed under the MIT License.

Acknowledgements
Thanks to all the open-source contributors and libraries that made this project possible.

bash
Kopiera

Kopiera och klistra in denna text i din README.md-fil. Därefter kan du göra en commit och pusha ändringarna till ditt GitHub-repository. 

Om du har fler frågor eller behöver ytterligare hjälp med deployment eller annat, säg till!