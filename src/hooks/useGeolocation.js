import { useState } from "react";
export function useGeolocation({ defaultPosition = { lat: 0, lng: 0 } }) {
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPostion] = useState(defaultPosition)
    const [error, setError] = useState(false)

    function getPosition() {
        
        if(!navigator.geolocation) return  setError('Geolocation is not supported') 

        setIsLoading(true);
        navigator.geolocation.getCurrentPosition((postion) => {
            setPostion({
                lat: postion.coords.latitude,
                lng: postion.coords.longitude
            });
            setIsLoading(false);
        }, 
        (error) => {
            setError(error.message);
            setIsLoading(false);
        });                                          
    }


    return {isLoading, position, error, getPosition}
}
