// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrl";
import Message from "./Message";
import Spinner from './Spinner'
import DatePicker from "react-datepicker";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false);
  const [geolocationError, setGeolocationError] = useState('')
  const [emoji, setEmoji] = useState('')
  const {createCity, isLoading} = useCities()
  useEffect(() => {
    if (!lat && !lng) return;
    async function getCityDity() {
      try {
        setIsLoadingGeolocation(true);
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if(!data.countryCode) throw new Error("That doesn't seem to be a city. Click somewhere else")
        setCityName(data.city || data.locality || '')
        setCountry(data.countryName)
        setEmoji(convertToEmoji(data.countryCode))
        
      } catch (err) {
        setGeolocationError(err.message)
      }finally {
        setIsLoadingGeolocation(false)
      }
    }
    getCityDity()
  },[lat, lng]);
  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
   const newCity = {
    cityName,
    country,
    emoji,
    date,
    notes,
    position: { lat, lng },
   }
   
   await createCity(newCity)
   navigate('/app/cities')
   
  }
  if(isLoadingGeolocation) return <Spinner />
  if(!lat, !lng) return <Message message="Start by clicking somewhere on the map" />
  if(geolocationError) return <Message message={geolocationError}/>
  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker id="date" onChange={date => setDate(date)} selected={date} dateFormat='dd/MM/yyyy'/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>
      <div className={styles.row}></div>
      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <Button type='back' onClick={(e) =>{ 
          e.preventDefault()
          navigate(-1)
          }}>&larr; Back</Button>
      </div>
    </form>
  );
}

export default Form;
