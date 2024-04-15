import React, { useState } from "react";
import styled from "styled-components";

import Otter from "../../assets/images/Otter.jpg";
import Penguin from "../../assets/images/Penguin.jpg";
import Zebra from "../../assets/images/Zebra.jpg";
import PolarBear from "../../assets/images/PolarBear.jpg";
import Tiger from "../../assets/images/Tiger.jpg";
import Giraffe from "../../assets/images/Giraffe.jpg";
import Elephant from "../../assets/images/Elephant.jpg";

const materials = [
  {
    image: `${Otter}`,
    name: "Otter",
    description: "A small aquatic mammal",
    diet: "Carnivore",
    habitat: "River",
    location: "North America",
    weight: "10-30 lbs",
    height: "1-4 ft",
    lifespan: "10-15 years",
    status: "Endangered",
    category: "animal",
  },
  {
    image: `${Penguin}`,
    name: "Penguin",
    description: "A small aquatic bird",
    diet: "Carnivore",
    habitat: "Cold climate",
    location: "Antarctica",
    weight: "2-90 lbs",
    height: "1-4 ft",
    lifespan: "6-25 years",
    status: "Least concern",
    category: "animal",
  },
  {
    image: `${Zebra}`,
    name: "Zebra",
    description: "A large land mammal",
    diet: "Herbivore",
    habitat: "Savannah",
    location: "Africa",
    weight: "440-990 lbs",
    height: "3-5 ft",
    lifespan: "25 years",
    status: "Least concern",
    category: "animal",
  },
  {
    image: `${PolarBear}`,
    name: "Polar Bear",
    description: "A large aquatic mammal",
    diet: "Carnivore",
    habitat: "Arctic",
    location: "Arctic Circle",
    weight: "900-1,600 lbs",
    height: "6-10 ft",
    lifespan: "25-30 years",
    status: "Vulnerable",
    category: "animal",
  },
  {
    image: `${Tiger}`,
    name: "Tiger",
    description: "A large land mammal",
    diet: "Carnivore",
    habitat: "Jungle",
    location: "Asia",
    weight: "220-660 lbs",
    height: "3-4 ft",
    lifespan: "10-15 years",
    status: "Endangered",
    category: "animal",
  },
  {
    image: `${Giraffe}`,
    name: "Giraffe",
    description: "A large land mammal",
    diet: "Herbivore",
    habitat: "Savannah",
    location: "Africa",
    weight: "1,500-2,800 lbs",
    height: "14-18 ft",
    lifespan: "25 years",
    status: "Vulnerable",
    category: "animal",
  },
  {
    image: `${Elephant}`,
    name: "Elephant",
    description: "A large land mammal",
    diet: "Herbivore",
    habitat: "Jungle",
    location: "Africa",
    weight: "4,400-12,000 lbs",
    height: "8-13 ft",
    lifespan: "60-70 years",
    status: "Endangered",
    category: "animal",
  },
];

export default function Materials() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMaterials = materials.filter((material) => {
    return (
      material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.diet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.habitat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.weight.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.height.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.lifespan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // If for some reason the image is not available then a placeholder image can be used
  // It is a bit slow but it should prevent the website from returning an error
  // Free to use (Section 5): https://unsplash.com/terms
  filteredMaterials.forEach((material) => {
    if (material.image === undefined) {
      material.image = `https://source.unsplash.com/200x200/?${material.name}`;
    }
  });

  return (
    <StyledDiv>
      <StyledTitle>Find out more about our animals!</StyledTitle>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      ></input>
      <button>Search</button>

      {filteredMaterials.map((material, index) => (
        <>
          <MaterialLayout key={index}>
            <StyledImage src={material.image} alt={material.name} />
            <StyledText>
              <StyledMainText>Name: {material.name}</StyledMainText>
              <StyledMainText>
                Description: {material.description}
              </StyledMainText>
              <StyledMainText>Diet: {material.diet}</StyledMainText>
              <StyledMainText>Habitat: {material.habitat}</StyledMainText>
              <StyledMainText>Location: {material.location}</StyledMainText>
              <StyledMainText>Weight: {material.weight}</StyledMainText>
              <StyledMainText>Height: {material.height}</StyledMainText>
              <StyledMainText>Lifespan: {material.lifespan}</StyledMainText>
              <StyledMainText>Status: {material.status}</StyledMainText>
              <StyledMainText>Category: {material.category}</StyledMainText>
            </StyledText>
          </MaterialLayout>
          <br />
          <br />
        </>
      ))}
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  padding: 50px;
`;

const MaterialLayout = styled.div`
  display: flex;
  border: 5px solid green;
  border-radius: 25px;
  align-items: center;
  justify-content: space-evenly;
  padding: 40px;
  background-color: #cfffcf;
`;

const StyledText = styled.p`
  font-size: 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-left: 50px;
  padding-right: 20px;
`;

const StyledImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 50px;
`;

const StyledMainText = styled.div``;

const StyledTitle = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  text-transform: capitalize;
`;
