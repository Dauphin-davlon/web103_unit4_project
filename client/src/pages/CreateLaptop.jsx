// import React, { useEffect, useState } from "react";
// import "../App.css";

// const CreateLaptop = () => {
//   const [laptopName, setLaptopName] = useState("");
//   const [featureGroups, setFeatureGroups] = useState([]);
//   const [selectedFeatures, setSelectedFeatures] = useState(new Set());
//   const [featureOptions, setFeatureOptions] = useState([]);
//   const [basePrice, setBasePrice] = useState(1000); // Set a default base price
//   const [currentPrice, setCurrentPrice] = useState(basePrice); // Initialize current price

//   // Fetch feature group data from the backend
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

//     fetchFeatureGroups();
//   }, []);

//   const handleFeatureGroupClick = async (groupId) => {
//     try {
//       const response = await fetch(`/api/feature-data/group/${groupId}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch feature options");
//       }
//       const options = await response.json();
//       setFeatureOptions(options); // Display feature options when a group is clicked
//     } catch (err) {
//       console.error("Error fetching feature options:", err);
//     }
//   };

//   const handleFeatureChange = (id, additionalCost) => {
//     const updatedFeatures = new Set(selectedFeatures);
//     let newPrice = currentPrice;

//     console.log(typeof newPrice);
//     console.log(typeof additionalCost);

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
//       laptopName,
//       selectedFeatures: Array.from(selectedFeatures),
//       currentPrice,
//     };

//     try {
//       const response = await fetch("/api/laptops", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(laptopData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Laptop created with ID:", data.laptopId);
//         // You may want to reset the form or update the state here
//       } else {
//         console.error("Error creating laptop:", response.statusText);
//       }
//     } catch (err) {
//       console.error("Error creating laptop:", err);
//     }
//   };

//   return (
//     <div className="create-laptop">
//       <h1>Create Your Customizable Laptop</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="create-laptop-options">
//           <label>
//             <input
//               type="text"
//               value={laptopName}
//               onChange={(e) => setLaptopName(e.target.value)}
//               placeholder="My New Laptop"
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

//           {/* Display the feature options in a flexbox */}
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
//             <h2>Current Price: ${currentPrice}</h2>
//           </div>

//           <div className="create-laptop-name">
//             <input
//               type="submit"
//               className="create-laptop-button"
//               value="Create"
//             />
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateLaptop;

import React, { useEffect, useState } from "react";
import "../App.css";

const CreateLaptop = () => {
  const [laptopName, setLaptopName] = useState("");
  const [featureGroups, setFeatureGroups] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState({}); // Store features by group
  const [featureOptions, setFeatureOptions] = useState([]);
  const [basePrice, setBasePrice] = useState(1000); // Set a default base price
  const [currentPrice, setCurrentPrice] = useState(basePrice); // Initialize current price
  const [currentGroupId, setCurrentGroupId] = useState(null); // Track the currently selected group

  // Fetch feature group data from the backend
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

    fetchFeatureGroups();
  }, []);

  const handleFeatureGroupClick = async (groupId) => {
    try {
      setCurrentGroupId(groupId); // Track the current group
      const response = await fetch(`/api/feature-data/group/${groupId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch feature options");
      }
      const options = await response.json();
      setFeatureOptions(options); // Display feature options when a group is clicked
    } catch (err) {
      console.error("Error fetching feature options:", err);
    }
  };

  const handleFeatureChange = (groupId, featureId, additionalCost) => {
    let newSelectedFeatures = { ...selectedFeatures };
    let newPrice = currentPrice;

    console.log(newSelectedFeatures);

    // If a feature is already selected in this group, remove its cost
    if (newSelectedFeatures[groupId]) {
      const previouslySelectedFeature = featureOptions.find(
        (option) => option.id === newSelectedFeatures[groupId]
      );
      if (previouslySelectedFeature) {
        newPrice -= Number(previouslySelectedFeature.additional_cost);
      }
    }

    // If the same feature is being selected again, deselect it
    if (newSelectedFeatures[groupId] === featureId) {
      delete newSelectedFeatures[groupId]; // Remove the feature from the selected list
    } else {
      // Otherwise, update the selected feature for the group and add the new cost
      newSelectedFeatures[groupId] = featureId;
      newPrice += Number(additionalCost);
    }

    setSelectedFeatures(newSelectedFeatures);
    setCurrentPrice(newPrice); // Update the price
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const laptopData = {
      laptopName,
      selectedFeatures: Object.values(selectedFeatures), // Only the selected feature IDs
      currentPrice,
    };

    console.log(selectedFeatures);

    try {
      const response = await fetch("/api/laptops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(laptopData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Laptop created with ID:", data.laptopId);
        // You may want to reset the form or update the state here
      } else {
        console.error("Error creating laptop:", response.statusText);
      }
    } catch (err) {
      console.error("Error creating laptop:", err);
    }
  };

  return (
    <div className="create-laptop">
      <h1>Create Your Customizable Laptop</h1>
      <form onSubmit={handleSubmit}>
        <div className="create-laptop-options">
          <label>
            <input
              type="text"
              value={laptopName}
              onChange={(e) => setLaptopName(e.target.value)}
              placeholder="My New Laptop"
              required
            />
          </label>

          <h2>Feature Groups</h2>
          <div className="feature-groups">
            {featureGroups.map((featureGroup) => (
              <div
                key={featureGroup.id}
                className={`feature-group-link ${
                  currentGroupId === featureGroup.id ? "active" : ""
                }`}
                onClick={() => handleFeatureGroupClick(featureGroup.id)}
              >
                {featureGroup.name}
              </div>
            ))}
          </div>

          {/* Display the feature options in a flexbox */}
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
                  type="checkbox"
                  checked={
                    selectedFeatures[option.feature_group_id] === option.id
                  }
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
            <h2>Current Price: ${currentPrice}</h2>
          </div>

          <div className="create-laptop-name">
            <input
              type="submit"
              className="create-laptop-button"
              value="Create"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateLaptop;
