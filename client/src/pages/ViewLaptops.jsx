import React, { useEffect, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

const ViewLaptops = () => {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const response = await fetch("/api/laptops");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLaptops(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLaptops();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this laptop?"
    );
    if (confirmed) {
      try {
        const response = await fetch(`/api/laptops/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete the laptop");
        }
        // Update the laptops list by filtering out the deleted laptop
        setLaptops((prevLaptops) =>
          prevLaptops.filter((laptop) => laptop.id !== id)
        );
      } catch (err) {
        alert(err.message);
      }
    }
  };

  if (loading) {
    return <div>Loading laptops...</div>;
  }

  if (error) {
    return <div>Error fetching laptops: {error}</div>;
  }

  return (
    <div className="laptop-list">
      <h2>Available Laptops</h2>
      <div className="laptop-container">
        {laptops.map((laptop) => (
          <div className="laptop-card" key={laptop.id}>
            <Link to={`/customize/${laptop.id}`}>
              <h3>{laptop.name}</h3>
              <p>
                <strong>Price:</strong> ${laptop.base_price}
              </p>
              <p>
                <strong>Features:</strong> {laptop.features.join(", ")}
              </p>
            </Link>
            <div className="laptop-actions">
              <Link to={`/edit/${laptop.id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(laptop.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewLaptops;
