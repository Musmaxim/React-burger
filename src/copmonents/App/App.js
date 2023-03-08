import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { data } from '../../utils/data';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>    
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data}/>
      </main>
    </div>
    
  );
}

export default App;
