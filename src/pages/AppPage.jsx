import Map from "../components/Map"
import Sidebar from "../components/Sidebar"
import User from "../components/User"
import styles from './AppLayout.module.css'
export const AppPage = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <User />
      <Map />
    </div>
  )
}
export default AppPage