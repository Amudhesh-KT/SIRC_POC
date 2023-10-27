import { useEffect, useState } from "react";
import Home from "../src/Components/Home/Home";

const index = ({ data }) => {
  const [state, setState] = useState(data);

  const [currentItem, setCurrentItem] = useState(data[0]);
  const [search, setSearch] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([
    "PR",
    "PO",
    "PL",
    "BT",
  ]);

  const [selectedPriority, setSelectedPriority] = useState([
    "Critical",
    "High",
    "Low",
  ]);

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
      state={state
        .filter((e) =>
          selectedCheckboxes.includes(e.id.split(" ")[0].toLocaleUpperCase())
        )
        .filter((e) => selectedPriority.includes(e.priority))
        .filter((e) =>
          e.id.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )}
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
