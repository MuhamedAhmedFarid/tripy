import CityItem from './CityItem'
import styles from './CountriesList.module.css'
import Spinner from './Spinner'
import Message from './Message'
import CountryItem from './CountryItem'
const CountriesList = ({ isLoading, cities }) => {
    if (isLoading) {
        return <Spinner />
    }
    if(cities.length === 0) {
        return <Message message="Add your first city by clicking on the map"/>
    }
    const countires = cities.reduce((arr, city) => {
        if(!arr.map((el) => el.country).includes(city.country)) {
            return [...arr, { country: city.country, emoji: city.emoji }];
        } else {
            return arr;
        }
    }, []);
    return (
        <div className={styles.countryList}>
            {countires?.map((country) => <CountryItem key={country.id} country={country} />)}
        </div>
    )
}

export default CountriesList