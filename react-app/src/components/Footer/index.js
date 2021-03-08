import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
        <div className="logo-div">
          <a>Nick Menon</a>
          <a
            id="linkedinlogo"
            href="https://www.linkedin.com/in/nickmenon/"
            target="_blank"
          >
            <i class="fab fa-linkedin fa-3x"></i>
          </a>
          <a
            id="githublogo"
            href="https://github.com/nikhilmenon2"
            target="_blank"
          >
            <i class="fab fa-github fa-3x"></i>
          </a>
          <a id="angellogo" href="https://angel.co/u/nickmenon" target="_blank">
            <i class="fab fa-angellist fa-3x"></i>
          </a>
        </div>
        <div className="logo-div">
          <a>Jacob Premo</a>
          <a
            id="linkedinlogo"
            href="https://www.linkedin.com/in/jacob-premo/"
            target="_blank"
          >
            <i class="fab fa-linkedin fa-3x"></i>
          </a>
          <a id="githublogo" href="https://github.com/jpremo" target="_blank">
            <i class="fab fa-github fa-3x"></i>
          </a>
          <a
            id="angellogo"
            href="https://angel.co/u/jacob-premo"
            target="_blank"
          >
            <i class="fab fa-angellist fa-3x"></i>
          </a>
        </div>
        <div className="logo-div">
          <a>Chris Read</a>
          <a
            id="linkedinlogo"
            href="https://www.linkedin.com/in/rcreadii/"
            target="_blank"
          >
            <i class="fab fa-linkedin fa-3x"></i>
          </a>
          <a id="githublogo" href="https://github.com/rcreadii" target="_blank">
            <i class="fab fa-github fa-3x"></i>
          </a>
          <a id="angellogo" href="https://angel.co/u/rcreadii" target="_blank">
            <i class="fab fa-angellist fa-3x"></i>
          </a>
        </div>
        <div className="logo-div">
          <a>Erick Bravo</a>
          <a
            id="linkedinlogo"
            href="https://www.linkedin.com/in/erick-bravo-448234203/"
            target="_blank"
          >
            <i class="fab fa-linkedin fa-3x"></i>
          </a>
          <a
            id="githublogo"
            href="https://github.com/Erick-Bravo"
            target="_blank"
          >
            <i class="fab fa-github fa-3x"></i>
          </a>
          <a
            id="angellogo"
            href="https://angel.co/u/erick-bravo"
            target="_blank"
          >
            <i class="fab fa-angellist fa-3x"></i>
          </a>
        </div>
    </div>
  );
}

export default Footer;
