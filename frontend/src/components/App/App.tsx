import styles from "./App.module.css"
import Header from "../Header/Header";
import Main from "../Main/Main"
import Footer from "../Footer/Footer"
function App() {
 
  return (
   <div className={styles.header}>
  <Header/>
  <Main/>
  <Footer/>
</div>
  );
}

export default App                                            