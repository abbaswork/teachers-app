# teachers-app

Teachers app is an ongoing closed source side project, providing a teacher oriented task managment software, free to use and accessible [here](https://teachers-toolkit.herokuapp.com/)

## Stack

The app was created using a Node (Express) + React Stack and a PSQL Relational Database. It uses a REST API for communication between server and clients and an ORM (Sequalize) for communication between the database and the backend. Along with several middleware such as dotenv + passport for secure authentication and securely storing secrets and more.

More information about the skeleton can be found in my open source repo found [here](https://github.com/abbaswork/react-express-template)

## Setup
create an .env file with the following env variables:
DATABASE_URL=postgres://pwprzdtncccjib:3262522edff8bb1d44b5d2429911d9899d9b6ca257f3531d8ec3026a745a3293@ec2-54-166-114-48.compute-1.amazonaws.com:5432/dd99neihpde664

inside of client create:
1) .env.local:
REACT_APP_SERVER_URL=http://localhost:5000

2) .env
REACT_APP_SERVER_URL=https://teachers-toolkit.herokuapp.com