import React, { useState, useEffect } from "react";
import axios from "axios";
import { compileOrders, sortPizzas } from "../../utils/helpers";

import "./App.css";

function App() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    try {
      axios.get("/pizzas.json").then((response) => {
        const pizzaArr = compileOrders(response.data);
        const sortedPizzaArr = sortPizzas(pizzaArr);
        console.log("sortedPizzaArr", sortedPizzaArr);
        setPizzas(sortedPizzaArr);
      });
    } catch (error) {
      console.log("Could not fetch pizzas,", error);
      return [];
    }
  }, []);

  const displayTopPizzas = () => {
    if (pizzas.length > 0 && typeof pizzas[0].toppings === "string") {
      const topPizzas = [];
      for (let i = 0; i < 20 && i < pizzas.length; i++) {
        console.log(i);
        const { toppings, count } = pizzas[i];
        topPizzas.push(
          <tr className="top-pizzas-table__body__pizza">
            <td className="top-pizzas-table__body__pizza__rank">#{[i + 1]}</td>
            <td className="top-pizzas-table__body__pizza__toppings">
              {toppings.replace(/,/g, ", ")}
            </td>
            <td className="top-pizzas-table__body__pizza__count">{count}</td>
          </tr>
        );
      }
      return topPizzas;
    }
  };

  return (
    <div className="App">
      {/* <h1>Top 20 Pizza Toppings</h1> */}
      <table className="top-pizzas-table">
        <thead className="top-pizzas-table__head">
          <tr>
            <th colspan="3" className="top-pizzas-table__head__title">
              Top 20 Pizza Toppings
            </th>
          </tr>
          <tr>
            <th className="top-pizzas-table__head__rank">Rank</th>
            <th className="top-pizzas-table__head__toppings">Toppings</th>
            <th className="top-pizzas-table__head__count">Count</th>
          </tr>
        </thead>
        <tbody className="top-pizzas-table__body">{displayTopPizzas()}</tbody>
      </table>
    </div>
  );
}

export default App;
