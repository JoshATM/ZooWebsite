import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function PickADate() {
  const [selectedDay, setSelectedDay] = useState(null);
  const GetDay = new Date().toLocaleDateString("en-UK", {
    day: "numeric",
  });
  const GetMonthYear = new Date().toLocaleDateString("en-UK", {
    month: "long",
    year: "numeric",
  });

  const daysArray = Array.from({ length: 31 }, (_, index) => index + 1);

  const DaySelected = (e) => {
    setSelectedDay(e.target.textContent);
  };

  return (
    <>
      <CalenderContainer>
        <CalenderCardContainer>
          <Title>
            <button>{"<"}</button>
            {GetMonthYear}
            <button>{">"}</button>
          </Title>
          <CalenderDays>
            {daysArray.map((day) => (
              <Days
                key={day}
                onClick={DaySelected}
                disabled={day < GetDay}
                selected={selectedDay === day}
                disabledOpacity={0.5}
                disabledCursor="not-allowed"
              >
                {day}
              </Days>
            ))}
          </CalenderDays>
        </CalenderCardContainer>
        <StyledTextContainer>
          {selectedDay != null ? (
            <p>
              Book a day for {selectedDay} {GetMonthYear} to visit the zoo
            </p>
          ) : (
            <p>Please select a day to visit the zoo</p>
          )}
        </StyledTextContainer>
      </CalenderContainer>
    </>
  );
}

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
  max-height: 400px;
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
    background: #00681c;
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
`;

const StyledTextContainer = styled.div`
  display: flex;
  text-align: center;
  margin-top: 1rem;

  p {
    font-size: 1.5rem;
    margin: 0;
    padding: 0;
  }
`;
