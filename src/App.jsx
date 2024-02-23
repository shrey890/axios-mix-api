import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
const App = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("American");
  const [selectCat, setSelectCat] = useState("");
  const countries = [
    "American",
    "Indian",
    "Canadian",
    "british",
    "Mexican",
    "Jamaican",
    "Chinese",
    "Japanese",
    "Russian",
    "French",
    "Spanish",
    "Polish",
  ];
  const categories = [
    "Beef",
    "Breakfast",
    "Vegan",
    "Vegetarian",
    "Starter",
    "Side ",
    "Pork",
    "Goat",
    "Seafood",
    "Chicken",
    "Dessert" 
  ];
  const mealsApi = async () => {
    try {
      let apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedOption}`;
      const params = {};
      if (selectedOption  !== "" &&  selectCat !== "") {
        params["a"] = selectedOption;
        params["c"] = selectCat;
      }
      const response = await axios.get(apiUrl, { params });
      setMeals(response.data.meals);
      setLoading(false);
      console.log(response.data.meals);
    } catch (error) {
      setIsError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    mealsApi();
  }, [selectedOption, selectCat]);
  // ! Handle Search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  // ! filter meals
  const filteredMeals = meals
    ? meals.filter((meal) =>
        meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  const selectHandler = (e) => {
    setSelectedOption(e.target.value);
    setLoading(true);
  };
  const handleCatChange = (e) => {
    setSelectCat(e.target.value);
  };
  return (
    <>
      <h1>{selectedOption}</h1>
      <input
        onChange={handleSearchChange}
        value={searchQuery}
        type="search"
        placeholder="search..."
      />
      <select name="" id="" onChange={selectHandler} value={selectedOption}>
        {/* <option value="">All Country</option> */}
        {countries.map((country) => (
          <option value={country} key={country}>
            {country}
          </option>
        ))}
      </select>
      <select name="" id="" onChange={handleCatChange} value={selectCat}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      {isError !== "" && <h2>Error - {isError}</h2>}
      <div className="grid">
        {loading ? (
          <div className="loader"></div>
        ) : filteredMeals.length === 0 ? (
          <h2>No Meals Found</h2>
        ) : (
          filteredMeals.map(({ idMeal, strMeal, strMealThumb }) => (
            <div className="card" key={idMeal}>
              <h4>{strMeal}</h4>
              <img className="meals-img" src={strMealThumb} alt={strMeal} />
            </div>
          ))
        )}
      </div>
    </>
  );
};
export default App;
