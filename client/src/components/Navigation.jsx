import React from "react";
import "../App.css";
import "../css/Navigation.css";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <h1>Laptop Hub</h1>
        </li>
      </ul>

      <ul>
        <li>
          <a href="/" role="button">
            Customize
          </a>
        </li>
        <li>
          <a href="/customlaptops" role="button">
            View Laptops
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
