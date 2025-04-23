import styles from "./styles.module.css";

import { Volunteer } from "@/components/Volunteer/Volunteer";
import { VOLUNTEERS } from "@/data/volunteers";

const PartnersDashboard = () => {
  return (
    <ul className={styles.volunteers}>
      {VOLUNTEERS.map((volunteer) => (
        <li>
          <Volunteer volunteer={volunteer} />
        </li>
      ))}
    </ul>
  );
};

export default PartnersDashboard;
