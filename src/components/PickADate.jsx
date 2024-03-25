import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";

export default function PickADate() {
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [seniors, setSeniors] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handleAdultsIncrement = () => {
    setAdults(adults + 1);
  };
  const handleAdultsDecrement = () => {
    setAdults(adults - 1);
    if (adults <= 0) {
      setAdults(0);
    }
  };

  const handleChildrenIncrement = () => {
    setChildren(children + 1);
  };
  const handleChildrenDecrement = () => {
    setChildren(children - 1);
    if (children <= 0) {
      setChildren(0);
    }
  };

  const handleSeniorsIncrement = () => {
    setSeniors(seniors + 1);
  };
  const handleSeniorsDecrement = () => {
    setSeniors(seniors - 1);
    if (seniors <= 0) {
      setSeniors(0);
    }
  };

  const GetDay = new Date().toLocaleDateString("en-UK", {
    day: "numeric",
  });
  const GetMonthYear = new Date(currentYear, currentMonth).toLocaleDateString(
    "en-UK",
    {
      month: "long",
      year: "numeric",
    }
  );

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysArray = Array.from(
    { length: getDaysInMonth(currentMonth, currentYear) },
    (_, index) => index + 1
  );

  const DaySelected = (e) => {
    setSelectedDay(e.target.textContent);
  };

  const Submit = () => {
    let message = `You have selected ${selectedDay} ${GetMonthYear} to visit the zoo.`;
    if (adults > 0 || children > 0 || seniors > 0) {
      message += ` You have selected ${
        adults === 0 ? "" : adults + " adult(s)"
      }${adults > 0 && (children > 0 || seniors > 0) ? " and " : ""}${
        children === 0 ? "" : children + " kid(s)"
      }${children > 0 && seniors > 0 ? " and " : ""}${
        seniors === 0 ? "" : seniors + " senior(s)"
      } to visit the zoo.`;
    }
    message += " Enjoy your day!";
    alert(message);
  };

  const handlePreviousMonth = () => {
    if (
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
    ) {
      return; // Do nothing if current month and year is the same as the current month and year
    }
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      } else {
        return prevMonth - 1;
      }
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      } else {
        return prevMonth + 1;
      }
    });
  };

  const isDateDisabled = (day) => {
    const today = new Date();
    const selectedDate = new Date(currentYear, currentMonth, day);
    return selectedDate < today;
  };

  return (
    <Container>
      <CalenderContainer>
        <CalenderCardContainer>
          <Title>
            <button
              onClick={handlePreviousMonth}
              disabled={
                currentMonth === new Date().getMonth() &&
                currentYear === new Date().getFullYear()
              }
            >
              {"<"}
            </button>
            {GetMonthYear}
            <button onClick={handleNextMonth}>{">"}</button>
          </Title>
          <CalenderDays>
            {daysArray.map((day) => (
              <Days
                key={day}
                onClick={DaySelected}
                disabled={isDateDisabled(day)}
                selected={selectedDay === day}
                disabledOpacity={0.5}
                disabledCursor="not-allowed"
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
              Book a day for {selectedDay} {GetMonthYear} to visit the zoo
            </p>
            <PersonTypeContainer>
              <PersonTypeCardContainer>
                <PersonTypeStyledText>Adult</PersonTypeStyledText>
                <PersonTypeButton onClick={handleAdultsDecrement}>
                  -
                </PersonTypeButton>
                <span>{adults}</span>
                <PersonTypeButton onClick={handleAdultsIncrement}>
                  +
                </PersonTypeButton>
              </PersonTypeCardContainer>
              <PersonTypeCardContainer>
                <PersonTypeStyledText>Children</PersonTypeStyledText>
                <PersonTypeButton onClick={handleChildrenDecrement}>
                  -
                </PersonTypeButton>
                <span>{children}</span>
                <PersonTypeButton onClick={handleChildrenIncrement}>
                  +
                </PersonTypeButton>
              </PersonTypeCardContainer>
              <PersonTypeCardContainer>
                <PersonTypeStyledText>Seniors</PersonTypeStyledText>
                <PersonTypeButton onClick={handleSeniorsDecrement}>
                  -
                </PersonTypeButton>
                <span>{seniors}</span>
                <PersonTypeButton onClick={handleSeniorsIncrement}>
                  +
                </PersonTypeButton>
              </PersonTypeCardContainer>
              <Button onClick={Submit} text="Submit" />
            </PersonTypeContainer>
          </>
        ) : (
          <>
            <p>Please select a day to visit the zoo</p>
          </>
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
  width: 400px;
  max-height: 250px;
`;

const Days = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  transition: 0.3s ease;
  opacity: ${(props) => (props.disabled ? props.disabledOpacity : 1)};
  cursor: ${(props) => (props.disabled ? props.disabledCursor : "pointer")};
  background: green;
  border-radius: 5px;
  color: #fff;
  width: 40px;
  height: 40px;
  border: none;
  &:hover {
    background: #00bf33;
    color: #fff;
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

const Title = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 1.5rem;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #000;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
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
