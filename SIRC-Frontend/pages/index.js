import { useEffect, useLayoutEffect, useState } from "react";
import Home from "../src/Components/Home/Home";
import { useRouter } from "next/router";

const index = ({ data }) => {
  let router = useRouter();
  useLayoutEffect(() => {
    if (!localStorage.getItem("sirc")) {
      router.push("/login");
    }
  }, []);
  const [state, setState] = useState(data);
  const [list, setList] = useState(data);

  const [currentItem, setCurrentItem] = useState({});
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

  const handleRequest = async (id, status, comment) => {
    console.log(id, status, comment);

    const response = await fetch(`http://localhost:8000/Approve_reject`, {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({
        Request_id: id,
        Status: status,
        comment: comment,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    setState([...state].filter((e) => e.id !== id));
    setList([...state].filter((e) => e.id !== id));
  };

  return (
    <Home
      state={
        selectedCheckboxes.length === 0 && selectedPriority.length === 0 // No filters selected
          ? state
          : selectedCheckboxes.length === 0 // Only selectedPriority is non-empty
          ? state
              .filter((e) => selectedPriority.includes(e.priority))
              .filter((e) =>
                e.id.toLocaleLowerCase().includes(search.toLocaleLowerCase())
              )
          : selectedPriority.length === 0 // Only selectedCheckboxes is non-empty
          ? state
              .filter((e) =>
                selectedCheckboxes.includes(e.id.split(" ")[0].toUpperCase())
              )
              .filter((e) =>
                e.id.toLocaleLowerCase().includes(search.toLocaleLowerCase())
              )
          : // Both selectedCheckboxes and selectedPriority have values
            state
              .filter((e) =>
                selectedCheckboxes.includes(e.id.split(" ")[0].toUpperCase())
              )
              .filter((e) => selectedPriority.includes(e.priority))
              .filter((e) =>
                e.id.toLocaleLowerCase().includes(search.toLocaleLowerCase())
              )
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
      list={list}
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
