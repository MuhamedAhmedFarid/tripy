import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

const CitiesContext = createContext();
export const URL = 'http://localhost:3001';


function CitiesProvider({ children }) {
    const [cities, setCities] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [cityData, setCityData] = useState([])
    useEffect(() => {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch {
                console.log('Error fetching data');
            } finally {
                setIsLoading(false);
            }
        }

        fetchCities();
    }, []);

    async function getCity(id) {
                try {
                    setIsLoading(true);
                    const res = await fetch(`${URL}/cities/${id}`);
                    const data = await res.json();
                    setCityData(data);
                } catch {
                    console.log('Error fetching data');
                } finally {
                    setIsLoading(false);
                }
            };
        return (
            <CitiesContext.Provider value={{ cities, isLoading, cityData, getCity }}>
                {children}
            </CitiesContext.Provider>
        );
    }



function useCities() {
    const context = useContext(CitiesContext);
    if (!context) {
        return new Error('useCities must be used within a CitiesProvider');
    }
    return context
}



// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };