import React, { useEffect, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row"

import { PacmanLoader } from "react-spinners";
import FilterCategories from "../components/FilterCategories"


function GameListPage() {
  const [games, setGames] = useState(null);

  const getAllGames = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/games`)
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllGames();
  }, []);

  const renderList = () => {
    if (games === null) {
      return (
        <div className="loader-container">
          <PacmanLoader
            color="#05ffe9"
            size={100}
          />
        </div>
      );
    }

    return (
      <Row>
        <FilterCategories gamesList={games} />
      </Row>
    );
  };

  return (
    <div style={{ marginTop: "20px" }}>
      {renderList()}
    </div>
  );
}

export default GameListPage;