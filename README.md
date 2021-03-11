# OpenBar

Open Bar is a collaboratively developed clone of Open Table focused on the niche of reserving bar seats. Users are able to create a bar, write reviews, search for bars, and make reservations for a party size of their choosing. Open Bar was built using a Flask / Postgres / SQLAlchemy backend along with a React/Redux frontend. Mapping functionality was incorporated using the Google Maps API.

More information can be found on this project at it's [Wiki](https://github.com/jpremo/open_bar/wiki)

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/jpremo/open_bar">
    <img src="images/logo2.png" alt="Logo" width="195" height="195">
  </a>

  <h3 align="center">OpenBar</h3>

  <p align="center">
    Reserve Seats At Your Favorite Bar
    <br />
    <a href="https://github.com/jpremo/open_bar"><strong>Explore the docs »</strong></a>
    <br />
    <br />

  </p>
</p>

<!-- TABLE OF CONTENTS -->

  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
     <a href="#live-link">Live Link To Project</a>
    </li>
    <li>
     <a href="#demonstration">Demonstration of Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
  
<br>
<br>

<!-- ABOUT THE PROJECT -->

## About The Project

A full stack application that draws inspiration from OpenTable.com

<br><br/>

## Live Link

Live Link For This Project Can Be Found [Here](http://openbarweb.herokuapp.com/)

<br><br/>

## Demonstration

![Demonstration](images/example.gif)

<br><br/>

## Built With

<br>
<br>

**Python**
<br>
<br>

<p align="left">
  <a href="https://www.python.org/">
    <img src="images/python.svg" alt="Python" width="200" height="100">
  </a>
<br>
<br>

**AWS (Amazon Web Services)**
<br>
<br>

<p align="left">
  <a href="https://aws.amazon.com/">
    <img src="images/AWSLogo.png" alt="Python" width="80" height="80">
  </a>
<br>
<br>
  
  
**SQLAlchemy**
<br>
<br>
<p align="left">
  <a href="https://www.sqlalchemy.org/">
    <img src="images/sqlalchemy.jpg" alt="SQlAclehemy" width="379" height="80">
  </a>
<br>
<br>
  
  
**Javascript** 
<br>
<br>
<p align="left">
  <a href="https://www.javascript.com/">
    <img src="images/javascript.svg" alt="Javascript" width="80" height="80">
  </a>
<br>
<br>
  
  
**Flask**
<br>
<br>
<p align="left">
  <a href="https://flask.palletsprojects.com/en/1.1.x/">
    <img src="images/flask.svg" alt="Flask" width="80" height="80">
  </a>
<br>
<br>
  
  
**PostGresSQL**
<br>
<br>
    <a href="https://www.postgresql.org/">
    <img src="images/postgresql.svg" alt="Postgres" width="80" height="80">
  </a>
<br> 
<br>

**React**
<br>
<br>
<a href="https://reactjs.org/">
<img src="images/react.svg" alt="React" width="80" height="80">
</a>
<br>  
<br>

**Redux**
<br>
<br>
<a href="https://redux.js.org/">
<img src="images/redux.svg" alt="Redux" width="80" height="80">
</a>
<br>

<p/>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```bash
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```bash
   git clone https://github.com/jpremo/open_bar
   ```
2. Install NPM packages in /reactapp folder
   ```bash
   npm install
   ```
3. Install Pipenv Dependencies in root folder
   ```bash
     pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
   ```
4. Create a **.env** file based on the example with proper settings for your
   development environment

5. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

6. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

---

_IMPORTANT!_
If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
You can do this by running:

```bash
pipenv lock -r > requirements.txt
```

_ALSO IMPORTANT!_
psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.

---

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Authors: Nick Menon, Jacob Premo, Chris Read, Erick Bravo

Project Link: [GitHub Project Link](https://github.com/jpremo/open_bar)
