import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'
function Map() {
    const [searcParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const lat = searcParams.get('lat')
    const lng = searcParams.get('lng')
  return (
    <div className={styles.mapContainer} onClick={() => navigate('form')}>
        <h1>Map</h1>
        <h1>Position: {lat}, {lng}</h1>
    </div>
  )
}

export default Map