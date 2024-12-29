import CityItem from './CityItem'
import styles from './CityList.module.css'
import Spinner from './Spinner'
import Message from './Message'
import { useCities } from '../contexts/CitiesContext'
const CityList = () => {
    const {cities, isLoading} = useCities()
  
    if (isLoading) {
        return <Spinner />
    }
    if(!cities || cities.length === 0) {
        return <Message message="Add your first city by clicking on the map"/>
    }
    return (
        <div className={styles.cityList}>
            {cities?.map((city) => <CityItem key={city.id} city={city} />)}
        </div>
    )
}

export default CityList