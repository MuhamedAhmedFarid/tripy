import { createContext, useContext, useEffect, useReducer, useState } from "react";
import PropTypes from "prop-types";

const CitiesContext = createContext();
export const URL = "http://localhost:3001";
const initilaState = {
  cities: [],
  isLoading: false,
  cityData: [],
}
function citiesReducer(state, action) {
  switch (action.type) {
    case "GET_CITIES": {
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
      };
    } case "GET_CITY": {
      return {
        ...state,
        cityData: action.payload,
        isLoading: false,
      };
    } case "CREATE_CITY": {
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        cityData: action.payload,
      };
    } case "DELETE_CITY": {
      return {
        ...state,
        cities: state.cities.filter(city => city.id !== action.payload),
        isLoading: false,
        cityData: [],
      };
    } case "IS_LOADING": {
      return {
        ...state,
        isLoading: true,
      };
    } default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
function CitiesProvider({ children }) {
  // const [cities, setCities] = useState();
  // const [isLoading, setIsLoading] = useState(false);
  // const [cityData, setCityData] = useState([]);
  const [{cities, isLoading, cityData}, dispatch] = useReducer(citiesReducer, initilaState); 
  useEffect(() => {
    async function fetchCities() {
      dispatch({type: 'IS_LOADING'})

      try {
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();
        dispatch({type: 'GET_CITIES', payload: data})
      } catch {
        console.log("Error fetching data");
      } 
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    dispatch({type: 'IS_LOADING'})
    try {
      const res = await fetch(`${URL}/cities/${id}`);
      const data = await res.json();
      // setCityData(data);
      dispatch({type: 'GET_CITY', payload: data})
    } catch {
      console.log("Error fetching data");
    }
  }
  async function createCity(newCity) {
    dispatch({type: 'IS_LOADING'})
    try {
      const res = await fetch(`${URL}/cities/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      const data = await res.json();
      dispatch({type: 'CREATE_CITY', payload: data})
    } catch {
      console.log("Error fetching data");
    }
  }

  async function deleteCity(id) {
    dispatch({type: 'IS_LOADING'})
    try {
      const res = await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      dispatch({type: 'DELETE_CITY', payload: id})
    } catch {
      console.log("Error deleting city");
    }
  }
  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, cityData, getCity, createCity, deleteCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context) {
    return new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}


export { CitiesProvider, useCities };
