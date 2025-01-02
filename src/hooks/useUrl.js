import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
      const [searcParams, setSearchParams] = useSearchParams();
      const lat = searcParams.get("lat");
      const lng = searcParams.get("lng");
      return [ lat, lng ];
}