import styled from "styled-components";

export default function Button(props) {
  return (
    <ButtonContainer disabled={props.isDisabled} onClick={props.onClick}>
      {props.text}
    </ButtonContainer>
  );
}

const ButtonContainer = styled.button`
  background: green;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  transition: 0.3s ease;
  &:hover {
    background: #00bf33;
  }
`;
