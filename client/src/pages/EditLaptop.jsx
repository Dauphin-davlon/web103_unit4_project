// import React, { useEffect, useState } from "react";
// import "../App.css";
// import { useParams } from "react-router-dom";

// const EditLaptop = () => {
//   const { id: laptopId } = useParams();
//   const [featureGroups, setFeatureGroups] = useState([]);
//   const [selectedFeatures, setSelectedFeatures] = useState(new Set());
//   const [featureOptions, setFeatureOptions] = useState([]);
//   const [laptopName, setLaptopName] = useState(""); // Initialize laptopName state
//   const [basePrice, setBasePrice] = useState(1000);
//   const [currentPrice, setCurrentPrice] = useState(basePrice);

//   // Fetch feature group data and laptop data when the component mounts
//   useEffect(() => {
//     const fetchFeatureGroups = async () => {
//       try {
//         const response = await fetch("/api/feature-groups");
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setFeatureGroups(data);
//       } catch (err) {
//         console.error("Error fetching feature groups:", err);
//       }
//     };

//     const fetchLaptopData = async () => {
//       try {
//         const response = await fetch(`/api/laptops/${laptopId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch laptop data");
//         }
//         const laptopData = await response.json();
//         setLaptopName(laptopData.name);
//         setSelectedFeatures(
//           new Set(laptopData.features.map((feature) => feature.id))
//         ); // Store IDs of the features
//         setBasePrice(Number(laptopData.base_price)); // Set the base price from the fetched data
//         setCurrentPrice(Number(laptopData.base_price)); // Initialize current price as base price
//       } catch (err) {
//         console.error("Error fetching laptop data:", err);
//       }
//     };

//     fetchFeatureGroups();
//     fetchLaptopData();
//   }, [laptopId]);

//   const handleFeatureGroupClick = async (groupId) => {
//     try {
//       const response = await fetch(`/api/feature-data/group/${groupId}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch feature options");
//       }
//       const options = await response.json();
//       setFeatureOptions(options); // Update feature options when a group is clicked
//     } catch (err) {
//       console.error("Error fetching feature options:", err);
//     }
//   };

//   const handleFeatureChange = (id, additionalCost) => {
//     const updatedFeatures = new Set(selectedFeatures);
//     let newPrice = currentPrice;

//     if (updatedFeatures.has(id)) {
//       updatedFeatures.delete(id);
//       newPrice -= additionalCost; // Remove the cost when unselected
//     } else {
//       updatedFeatures.add(id);
//       newPrice += additionalCost; // Add the cost when selected
//     }

//     setSelectedFeatures(updatedFeatures);
//     setCurrentPrice(newPrice); // Update the price
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const laptopData = {
//       name: laptopName,
//       price: currentPrice, // Ensure you're sending the current price here
//       features: Array.from(selectedFeatures), // Use Array.from to convert Set to Array
//     };

//     try {
//       const response = await fetch(`/api/laptops/${laptopId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(laptopData), // Send the laptopData as JSON
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Laptop updated with ID:", laptopId);
//         // Handle successful update (e.g., redirect or show a message)
//       } else {
//         console.error("Error updating laptop:", response.statusText);
//       }
//     } catch (err) {
//       console.error("Error updating laptop:", err);
//     }
//   };

//   return (
//     <div className="edit-laptop">
//       <h1>Edit Your Laptop</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="edit-laptop-options">
//           <label>
//             <input
//               type="text"
//               value={laptopName}
//               onChange={(e) => setLaptopName(e.target.value)}
//               placeholder="My Laptop"
//               required
//             />
//           </label>

//           <h2>Feature Groups</h2>
//           <div className="feature-groups">
//             {featureGroups.map((featureGroup) => (
//               <div
//                 key={featureGroup.id}
//                 className="feature-group-link"
//                 onClick={() => handleFeatureGroupClick(featureGroup.id)}
//               >
//                 {featureGroup.name}
//               </div>
//             ))}
//           </div>

//           <h2>Available Features</h2>
//           <div className="feature-options flex-container">
//             {featureOptions.map((option) => (
//               <label
//                 key={option.id}
//                 className={`feature-option ${
//                   selectedFeatures.has(option.id) ? "selected" : ""
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   checked={selectedFeatures.has(option.id)}
//                   onChange={() =>
//                     handleFeatureChange(
//                       option.id,
//                       Number(option.additional_cost)
//                     )
//                   }
//                 />
//                 {option.name} (+${Number(option.additional_cost).toFixed(2)})
//               </label>
//             ))}
//           </div>

//           <div className="current-price">
//             <h2>Current Price: ${currentPrice.toFixed(2)}</h2>{" "}
//             {/* Ensure price is displayed as a fixed decimal */}
//           </div>

//           <div className="edit-laptop-name">
//             <input
//               type="submit"
//               className="edit-laptop-button"
//               value="Update"
//             />
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditLaptop;

import React, { useEffect, useState } from "react";
import "../App.css";
import { useParams } from "react-router-dom";

const EditLaptop = () => {
  const { id: laptopId } = useParams();
  const [featureGroups, setFeatureGroups] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState({}); // Changed to object
  const [featureOptions, setFeatureOptions] = useState([]);
  const [laptopName, setLaptopName] = useState(""); // Initialize laptopName state
  const [basePrice, setBasePrice] = useState(1000);
  const [currentPrice, setCurrentPrice] = useState(basePrice);

  // Fetch feature group data and laptop data when the component mounts
  useEffect(() => {
    const fetchFeatureGroups = async () => {
      try {
        const response = await fetch("/api/feature-groups");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFeatureGroups(data);
      } catch (err) {
        console.error("Error fetching feature groups:", err);
      }
    };

    const fetchLaptopData = async () => {
      try {
        const response = await fetch(`/api/laptops/${laptopId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch laptop data");
        }
        const laptopData = await response.json();
        setLaptopName(laptopData.name);
        const initialSelectedFeatures = {};
        laptopData.features.forEach((feature) => {
          initialSelectedFeatures[feature.groupId] = feature.id;
        });
        setSelectedFeatures(initialSelectedFeatures); // Set initial selected features as object
        setBasePrice(Number(laptopData.base_price)); // Set the base price from the fetched data
        setCurrentPrice(Number(laptopData.base_price)); // Initialize current price as base price
      } catch (err) {
        console.error("Error fetching laptop data:", err);
      }
    };

    fetchFeatureGroups();
    fetchLaptopData();
  }, [laptopId]);

  const handleFeatureGroupClick = async (groupId) => {
    try {
      const response = await fetch(`/api/feature-data/group/${groupId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch feature options");
      }
      const options = await response.json();
      setFeatureOptions(options); // Update feature options when a group is clicked
      console.log(featureOptions);
    } catch (err) {
      console.error("Error fetching feature options:", err);
    }
  };

  const handleFeatureChange = (groupId, featureId, additionalCost) => {
    const updatedFeatures = { ...selectedFeatures };
    let newPrice = currentPrice;

    // If a feature is already selected in this group, subtract its cost from the price
    if (updatedFeatures[groupId]) {
      const previousFeature = featureOptions.find(
        (option) => option.id === updatedFeatures[groupId]
      );
      newPrice -= previousFeature ? previousFeature.additional_cost : 0;
    }

    // Set the new selected feature for this group
    updatedFeatures[groupId] = featureId;
    newPrice += additionalCost; // Add the cost of the newly selected feature

    setSelectedFeatures(updatedFeatures);
    setCurrentPrice(newPrice); // Update the price
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const laptopData = {
      name: laptopName,
      price: currentPrice, // Ensure you're sending the current price here
      features: Object.values(selectedFeatures), // Send selected features as an array of IDs
    };

    try {
      const response = await fetch(`/api/laptops/${laptopId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(laptopData), // Send the laptopData as JSON
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Laptop updated with ID:", laptopId);
        // Handle successful update (e.g., redirect or show a message)
      } else {
        console.error("Error updating laptop:", response.statusText);
      }
    } catch (err) {
      console.error("Error updating laptop:", err);
    }
  };

  return (
    <div className="edit-laptop">
      <h1>Edit Your Laptop</h1>
      <form onSubmit={handleSubmit}>
        <div className="edit-laptop-options">
          <label>
            <input
              type="text"
              value={laptopName}
              onChange={(e) => setLaptopName(e.target.value)}
              placeholder="My Laptop"
              required
            />
          </label>

          <h2>Feature Groups</h2>
          <div className="feature-groups">
            {featureGroups.map((featureGroup) => (
              <div
                key={featureGroup.id}
                className="feature-group-link"
                onClick={() => handleFeatureGroupClick(featureGroup.id)}
              >
                {featureGroup.name}
              </div>
            ))}
          </div>

          <h2>Available Features</h2>
          <div className="feature-options flex-container">
            {featureOptions.map((option) => (
              <label
                key={option.id}
                className={`feature-option ${
                  selectedFeatures[option.feature_group_id] === option.id
                    ? "selected"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name={`group-${option.feature_group_id}`} // Ensures only one option per group
                  checked={selectedFeatures[option.groupId] === option.id}
                  onChange={() =>
                    handleFeatureChange(
                      option.feature_group_id,
                      option.id,
                      Number(option.additional_cost)
                    )
                  }
                />
                {option.name} (+${Number(option.additional_cost).toFixed(2)})
              </label>
            ))}
          </div>

          <div className="current-price">
            <h2>Current Price: ${currentPrice.toFixed(2)}</h2>{" "}
            {/* Ensure price is displayed as a fixed decimal */}
          </div>

          <div className="edit-laptop-name">
            <input
              type="submit"
              className="edit-laptop-button"
              value="Update"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditLaptop;
