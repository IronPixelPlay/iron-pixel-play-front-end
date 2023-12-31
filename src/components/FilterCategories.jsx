import React, { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import FilterButton from "./FilterButton";

function FilterCategories(props) {
  let games = props.gamesList;
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredGames, setFilteredGames] = useState(games);

  let categories = [
    "Action-Adventure",
    "Shooter",
    "Fighting",
    "Quiz&Trivia",
    "Strategy",
    "Sports&Racing",
    "Puzzle",
    "Other",
  ];

  const handleFilterButtonClick = (selectedCategory) => {
    if (selectedFilters.includes(selectedCategory)) {
      let filters = selectedFilters.filter((category) => category !== selectedCategory);
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]);
    }
  };

  useEffect(() => {
    filterGames();
  }, [selectedFilters]);

  const filterGames = () => {
    if (selectedFilters.length > 0) {
      let filteredGames = selectedFilters.map((selectedCategory) => {
        let selection = games.filter(
          (game) => game.category === selectedCategory
        );
        return selection;
      });
      setFilteredGames(filteredGames.flat());
    } else {
      setFilteredGames([...games]);
    }
  };

  const reset = () => {
    const selectedCategories = document.querySelectorAll('.active')
    selectedCategories.forEach((selectedCategory)=>{
      selectedCategory.classList.remove('active')
      setFilteredGames(games)
      setSelectedFilters([])
    })
  };


  return (
    <div>
      <Row className="align-items-center">
        {categories.map((category, idx) => (
          <div key={`filters-${idx}`} className="col" xs="auto">
            <FilterButton
              filterCategories={handleFilterButtonClick}
              category={category}
            />
          </div>
        ))}
      </Row>
      <div className="mt-2">
        <Button className="danger" onClick={reset}>
          Reset
        </Button>
      </div>

      <div>
        <Row>
          {filteredGames &&
            filteredGames.map((game, idx) => (
              <div key={`game-${idx}`} className="col-md-3">
                <GameCard {...game} />
              </div>
            ))}
        </Row>
      </div>
    </div>
  );
}

export default FilterCategories;
