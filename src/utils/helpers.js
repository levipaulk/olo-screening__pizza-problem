export const compileOrders = (orders) => {
  const pizzaTally = {};
  // O(n)
  orders.map((order) => {
    const orderStr = order.toppings.toString();
    orderStr in pizzaTally
      ? pizzaTally[orderStr]++
      : (pizzaTally[orderStr] = 1);
  });
  // O(logn)
  const pizzaArr = Object.keys(pizzaTally).map((toppings) => {
    return { toppings, count: pizzaTally[toppings] };
  });
  return pizzaArr;
};

export const sortPizzas = (pizzas) => {
  if (pizzas.length <= 1) {
    return pizzas;
  }
  const middle = Math.floor(pizzas.length / 2);
  const left = pizzas.slice(0, middle);
  const right = pizzas.slice(middle);
  // O(nlogn)
  return merge(sortPizzas(left), sortPizzas(right));
};

const merge = (left, right) => {
  let resultArr = [],
    leftIndex = 0,
    rightIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex].count > right[rightIndex].count) {
      resultArr.push(left[leftIndex]);
      leftIndex++;
    } else {
      resultArr.push(right[rightIndex]);
      rightIndex++;
    }
  }
  return resultArr
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
};
