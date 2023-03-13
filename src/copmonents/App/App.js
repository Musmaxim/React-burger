import React, { useState, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { dataApi } from "../../utils/data";
import styles from "./App.module.css";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(dataApi);
        if (res.ok) {
          const { data } = await res.json();
          setData(data);
        } else {
          throw new Error(`Ошибка ${res.status}`);
        }
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
      {data && 
        (<>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
        </>
        )
      }
      </main>
    </div>
  );
}

export default App;
