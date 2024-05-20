import styles from "../styles/spinner.module.css";

const demensionSize = 15;
const borderSize = 2;

export default function Spinner({size = 1}) {
  
  const dynamicSizeSpinnerStyles = {
    width: (demensionSize * size) + "px",
    height: (demensionSize * size) + "px",
    borderWidth: (borderSize * size) + "px",
  }
  
  return <span className={styles.loader} style = {dynamicSizeSpinnerStyles}></span>
}