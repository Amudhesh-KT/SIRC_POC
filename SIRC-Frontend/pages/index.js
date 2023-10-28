import { useEffect, useState } from "react";
import Home from "../src/Components/Home/Home";

const index = ({ data }) => {
  const [state, setState] = useState(data);

  const [currentItem, setCurrentItem] = useState(data[0]);
  const [search, setSearch] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const [selectedPriority, setSelectedPriority] = useState([]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (selectedCheckboxes.includes(value)) {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((item) => item !== value)
      );
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, value]);
    }
  };
  const handlePriorityChange = (event) => {
    const value = event.target.value;
    if (selectedPriority.includes(value)) {
      setSelectedPriority(selectedPriority.filter((item) => item !== value));
    } else {
      setSelectedPriority([...selectedPriority, value]);
    }
  };

  const handleCancelChip = (value) => {
    setSelectedCheckboxes(selectedCheckboxes.filter((item) => item !== value));
  };

  const handleRequest = (id, status, comment) => {
    console.log(id, status, comment);
    setState([...state].filter((e) => e.id !== id));
  };

  return (
    <Home
      state={
        selectedCheckboxes.length === 0 && selectedPriority.length === 0 // No filters selected
          ? state
          : selectedCheckboxes.length === 0 // Only selectedPriority is non-empty
          ? state.filter((e) => selectedPriority.includes(e.priority))
          : selectedPriority.length === 0 // Only selectedCheckboxes is non-empty
          ? state.filter((e) =>
              selectedCheckboxes.includes(e.id.split(" ")[0].toUpperCase())
            )
          : // Both selectedCheckboxes and selectedPriority have values
            state
              .filter((e) =>
                selectedCheckboxes.includes(e.id.split(" ")[0].toUpperCase())
              )
              .filter((e) => selectedPriority.includes(e.priority))
      }
      currentItem={currentItem}
      setCurrentItem={setCurrentItem}
      setSearch={setSearch}
      selectedCheckboxes={selectedCheckboxes}
      handleCheckboxChange={handleCheckboxChange}
      handleCancelChip={handleCancelChip}
      selectedPriority={selectedPriority}
      handlePriorityChange={handlePriorityChange}
      handleRequest={handleRequest}
    />
  );
};

export default index;

export const getServerSideProps = async () => {
  const response = await fetch(`http://127.0.0.1:8000/overall_data`);
  const data = await response.json();

  console.log(data.length);
  return {
    props: {
      data,
    },
  };
};
