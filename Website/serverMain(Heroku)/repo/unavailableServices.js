//checks if service is still available. Return false if service is unavailable.
const checkTime = (time, date, data) => {
  const arr = data[date];
  if (arr[0] == 0 || time == 0) {
    return false;
  } else {
    return arr[0] <= time && time <= arr[1];
  }
}

const unavailableServices = (time, date, busServices) => {
  let unavailable_service = [];
  busServices.forEach(service => {
    if (!checkTime(time, date, service)) {
      const unavailable = service["service_name"];
      unavailable_service.push(unavailable);
      busServices = busServices.filter(elem => elem["service_name"] !== unavailable);
    }
  });
  return unavailable_service;
}

module.exports = unavailableServices;
//console.log(unavailableServices(1700, 'term-sun/ph'));