import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";

export default function PickADate() {
  // Declare Variables
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [seniors, setSeniors] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const prevMonth = currentMonth;

  // Increment function
  const handleIncrement = (setter) => {
    setter((prevValue) => prevValue + 1); // Increment by 1
  };

  // Decrement function
  const handleDecrement = (setter) => {
    setter((prevValue) => Math.max(prevValue - 1, 0)); // Decrement by 1 and if previus value is 0 or less, return 0
  };

  // Previous Month function
  const handlePreviousMonth = () => {
    if (
      currentMonth === new Date().getMonth() && // If current month is the same as the current month
      currentYear === new Date().getFullYear() // If current year is the same as the current year
    ) {
      return; // Return nothing / null
    }
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1)); // If previous month is 0 / Jan, return 11 / Dec
    setCurrentYear((prevYear) => (prevMonth === 0 ? prevYear - 1 : prevYear)); // If previous month e.g. 2024, return previous year e.g. 2023
  };

  // Next Month function
  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1)); // If previous month is 11 / Dec, return 0 / Jan
    setCurrentYear((prevYear) => (prevMonth === 11 ? prevYear + 1 : prevYear)); // If previous month e.g. 2023, return next year e.g. 2024
  };

  // Disable any days before today
  const isDateDisabled = (day) => {
    const today = new Date(); // Get today's date
    const selectedDate = new Date(currentYear, currentMonth, day); // Get selected date
    return selectedDate < today; // Return true if selected date is before today which will disable the day button
  };

  // Select a day function
  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  // Create an array of days in the specific month
  const daysArray = Array.from(
    { length: new Date(currentYear, currentMonth + 1, 0).getDate() },
    (_, index) => index + 1
  );

  const handleSubmit = () => {};

  return (
    <Container>
      <CalenderContainer>
        <CalenderCardContainer>
          <Title>
            {/* Previous Month Button */}
            <MonthPicker
              onClick={handlePreviousMonth}
              disabled={
                currentMonth === new Date().getMonth() &&
                currentYear === new Date().getFullYear()
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                {/* Add fill and disable the cursor if they try and go back further then the current month (as you can't book a ticket in the past) */}
                <path
                  d="M10 20A10 10 0 1 0 0 10a10 10 0 0 0 10 10zm1.289-15.7 1.422 1.4-4.3 4.344 4.289 4.245-1.4 1.422-5.714-5.648"
                  fill={
                    currentMonth === new Date().getMonth() &&
                    currentYear === new Date().getFullYear()
                      ? "#ccc"
                      : "white"
                  }
                  cursor={
                    currentMonth === new Date().getMonth() &&
                    currentYear === new Date().getFullYear()
                      ? "not-allowed"
                      : "pointer"
                  }
                />
              </svg>
            </MonthPicker>
            {/* Title */}
            {new Date(currentYear, currentMonth).toLocaleDateString("en-UK", {
              month: "long",
              year: "numeric",
            })}
            {/* Next Month Button */}
            <MonthPicker onClick={handleNextMonth}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <path
                  d="M10 20A10 10 0 1 0 0 10a10 10 0 0 0 10 10zM8.711 4.3l5.7 5.766L8.7 15.711l-1.4-1.422 4.289-4.242-4.3-4.347"
                  fill="white"
                />
              </svg>
            </MonthPicker>
          </Title>
          <CalenderDays>
            {/* Button for the days on Calendar */}
            {daysArray.map((day) => (
              <Days
                key={day}
                onClick={() => handleDaySelect(day)}
                disabled={isDateDisabled(day)}
                selected={selectedDay === day}
              >
                {day}
              </Days>
            ))}
          </CalenderDays>
        </CalenderCardContainer>
      </CalenderContainer>
      <StyledTextContainer>
        {selectedDay != null ? (
          <>
            <p>
              Book a day for {selectedDay}{" "}
              {new Date(currentYear, currentMonth).toLocaleDateString("en-UK", {
                month: "long",
                year: "numeric",
              })}{" "}
              to visit the zoo
            </p>
            <PersonTypeContainer>
              <PersonTypeCardContainer>
                <PersonTypeStyledText>Adult</PersonTypeStyledText>
                <PersonTypeButton onClick={() => handleDecrement(setAdults)}>
                  -
                </PersonTypeButton>
                <span>{adults}</span>
                <PersonTypeButton onClick={() => handleIncrement(setAdults)}>
                  +
                </PersonTypeButton>
              </PersonTypeCardContainer>
              <PersonTypeCardContainer>
                <PersonTypeStyledText>Children</PersonTypeStyledText>
                <PersonTypeButton onClick={() => handleDecrement(setChildren)}>
                  -
                </PersonTypeButton>
                <span>{children}</span>
                <PersonTypeButton onClick={() => handleIncrement(setChildren)}>
                  +
                </PersonTypeButton>
              </PersonTypeCardContainer>
              <PersonTypeCardContainer>
                <PersonTypeStyledText>Seniors</PersonTypeStyledText>
                <PersonTypeButton onClick={() => handleDecrement(setSeniors)}>
                  -
                </PersonTypeButton>
                <span>{seniors}</span>
                <PersonTypeButton onClick={() => handleIncrement(setSeniors)}>
                  +
                </PersonTypeButton>
              </PersonTypeCardContainer>
              <Button onClick={handleSubmit} text="Submit" />
            </PersonTypeContainer>
          </>
        ) : (
          <p>Please select a day to visit the zoo</p>
        )}
      </StyledTextContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin-top: 2rem;
`;

const CalenderContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const CalenderCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 1rem;
  padding: 1rem;
  text-align: center;
  width: 600px;
  max-height: 600px;
`;

const Days = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  transition: 0.3s ease;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  background: ${(props) => (props.selected ? "green" : "#fff")};
  border-radius: 5px;
  color: ${(props) => (props.selected ? "#fff" : "#000")};
  width: 70px;
  height: 70px;
  border: none;
  &:hover {
    background: ${(props) => (props.disabled ? "#fff" : "#00bf33")};
    color: ${(props) => (props.disabled ? "#000" : "#fff")};
  }
`;

const CalenderDays = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 1rem;
  width: 100%;
  align-content: center;
  gap: 10px;
`;

const MonthPicker = styled.button`
  background: #00bf33;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  transition: 0.3s ease;
  &:hover {
    background: #00681c;
  }
`;

const Title = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 1.5rem;
  width: 100%;
  text-align: center;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  color: #fff;
  background: #00bf33;
  border-radius: 5px;
  padding: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledTextContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  margin-top: 1rem;
  width: 100%;
  p {
    font-size: 1.5rem;
    margin: 0;
    padding: 0;
  }
`;

const PersonTypeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const PersonTypeCardContainer = styled.div`
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 1rem;
  padding: 1rem;
  text-align: center;
  width: 200px;
  height: 100px;
`;

const PersonTypeButton = styled.button`
  background: #22ff00;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  transition: 0.3s ease;
  &:hover {
    background: #00681c;
  }
`;

const PersonTypeStyledText = styled.p`
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
`;
