const str = "Thu Jun 10 2021 05:04:08 GMT+0800 (Singapore Standard Time)";

const getDate = (str) => {
  if (str === null) {
    return null;
  } else {
    const map = {
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
      Sun: 0,
    };

    const month = {
      Jan: 1,
      Feb: 2,
      Mar: 3,
      Apr: 4,
      May: 5,
      Jun: 6,
      Jul: 7,
      Aug: 8,
      Sep: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12,
    };
    let result = [];
    result.push(
      parseInt(str.substring(16, 18)) * 100 + parseInt(str.substring(19, 21))
    );
    result.push(map[str.substring(0, 3)]);
    result.push(parseInt(str.substring(4).substring(4, 6)));
    result.push(month[str.substring(4, 7)]);
    result.push(parseInt(str.substring(11, 15)));
    //[time, day, date, month, year] format
    return result;
  }
};

console.log(getDate(str))