import { coffeeOptions } from "../utils";
import { use, useState } from "react";
import Auth from "./Auth";
import Modal from "./Modal";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
function CoffeeForm(props) {
  const { isAuthenticated } = props;
  const { globalData, setGlobalData, globalUser } = useAuth();
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [showCoffeeTypes, setShowCoffeeTypes] = useState(false);
  const [coffeeCost, setCoffeeCost] = useState(0);
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [showModal, setShowModal] = useState(false);
  async function handleSubmitForm() {
    if (!selectedCoffee) {
      setShowModal(true);
      return;
    }
    const newGlobalData = { ...(globalData || {}) };
    const nowTime = Date.now();
    const timeToSubtract = hour * 60 * 60 * 1000 + min * 60 * 1000;
    const timestamp = nowTime - timeToSubtract;
    const newData = {
      name: selectedCoffee,
      cost: coffeeCost,
    };
    newGlobalData[timestamp] = newData;
    setGlobalData(newGlobalData);
    const userRef = doc(db, "users", globalUser.uid);
    const res = await setDoc(
      userRef,
      {
        [timestamp]: newData,
      },
      { merge: true }
    );
    setSelectedCoffee(null);
    setCoffeeCost(0);
    setHour(0);
    setMin(0);
  }

  return (
    <>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <Auth setShowModal={setShowModal}></Auth>
        </Modal>
      )}
      <div className="section-header">
        <i className="fa-solid fa-moon"></i>
        <h2>Start tracking today</h2>
      </div>
      <h4>Select coffee type</h4>
      <div className="coffee-grid">
        {coffeeOptions.slice(0, 5).map((option, optionIndex) => {
          return (
            <button
              onClick={() => {
                setSelectedCoffee(option.name);
                setShowCoffeeTypes(false);
              }}
              className={
                "button-card " +
                (option.name === selectedCoffee ? "coffee-button-selected" : "")
              }
              key={optionIndex}
            >
              <h4>{option.name}</h4>
              <p>{option.caffeine} mg</p>
            </button>
          );
        })}
        <button
          onClick={() => {
            setShowCoffeeTypes(true);
          }}
          className={
            "button-card " +
            (showCoffeeTypes === true ? "coffee-button-selected" : "")
          }
        >
          <h4>Other</h4>
        </button>
      </div>

      {showCoffeeTypes && (
        <select
          onChange={(e) => {
            setSelectedCoffee(e.target.value);
          }}
          name="coffee-list"
          id="coffee-list"
        >
          <option value={null}>Select type</option>
          {coffeeOptions.map((option, optionIndex) => {
            return (
              <option value={option.name} key={optionIndex}>
                {option.name} ({option.caffeine}) mg
              </option>
            );
          })}
        </select>
      )}
      <h4>Add the cost ($)</h4>
      <input
        className="w-full"
        type="number"
        placeholder="4.50"
        value={coffeeCost === 0 ? "" : coffeeCost}
        onChange={(e) => {
          setCoffeeCost(e.target.value);
        }}
      />
      <h4>Time since consumtion</h4>
      <div className="time-entry">
        <div>
          <h6>Hours</h6>
          <select
            onChange={(e) => {
              setHour(e.target.value);
            }}
            id="hours-select"
          >
            {[
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19,
              20, 21, 22, 23, 24,
            ].map((hour, hoursIndex) => {
              return (
                <option key={hoursIndex} value={hour === 0 ? "" : hour}>
                  {hour}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <h6>Mins</h6>
          <select
            onChange={(e) => {
              setMin(e.target.value);
            }}
            id="mins-select"
          >
            {[0, 5, 10, 15, 30, 45].map((min, minIndex) => {
              return (
                <option key={minIndex} value={min === 0 ? "" : min}>
                  {min}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <button onClick={handleSubmitForm}>
        <p>Add the entry</p>
      </button>
    </>
  );
}

export default CoffeeForm;
