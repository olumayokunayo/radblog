import React from "react";

const CheckboxInput = ({ selectedItems, setSelectedItems }) => {
  const allItems = [
    { id: 1, name: "Programming" },
    { id: 2, name: "Marketing" },
    { id: 3, name: "Culture" },
    { id: 4, name: "Sports" },
    { id: 5, name: "Writing" },
    { id: 6, name: "Education" },
  ];

  const handleCheckboxChange = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((id) => id !== itemId)
      );
    } else {
      if (selectedItems.length < 3) {
        setSelectedItems((prevSelectedItems) => [...prevSelectedItems, itemId]);
      }
    }
  };

  return (
    <div>
      <div style={{ maxHeight: "100px", overflowY: "auto" }}>
        {allItems.map((item) => (
          <div
            key={item.id}
            style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
          >
            <input
              style={{ height: "1.4rem", width: "2rem" }}
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => handleCheckboxChange(item.id)}
            />
            <label style={{ fontSize: "1.3rem" }}>{item.name}</label>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={selectedItems
          .map((itemId) => allItems.find((item) => item.id === itemId).name)
          .join("   ")}
        readOnly
        style={{
          textTransform: "uppercase",
          marginTop: "8px",
          width: "90%",
          fontSize: "1.2rem",
          height: "1rem",
          outline: "none",
          border: "3px solid green",
          borderRadius: "10px",
          fontWeight: 500,
          padding: "1rem 0.5rem",
        }}
      />
    </div>
  );
};

export default CheckboxInput;
