function getPercent(a, b) {
  return b === 0 ? 0 : Math.round((a / b) * 100);
}

function getTotal(obj) {
  const incomingSum = obj.incoming.success + obj.incoming.fail;

  obj.total = {
    incoming: incomingSum,
    percents: getPercent(obj.incoming.not_waste, incomingSum)
  };
}

function getSumToCity(city, user) {
  for (let key in city.incoming) {
    city.incoming[key] += +user.incoming[key];
  }
  for (let key in city.outgoing) {
    city.outgoing[key] += +user.outgoing[key];
  }
}


export default (cities) => {
  cities.forEach(city => {
    city.incoming = {
      fail: 0,
      not_waste: 0,
      success: 0,
      waste_fail: 0,
      waste_success: 0,
    };
    city.outgoing = {
      fail: 0,
      success: 0
    };

    city.users.forEach(user => {
      getTotal(user);
      getSumToCity(city, user);
    });

    getTotal(city);
  });
  return cities;
}