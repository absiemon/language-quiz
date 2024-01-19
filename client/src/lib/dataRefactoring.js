//This Function is for refactoring data coming from api. Apis is not providing data in correct format that we required for graph.
export function dataRefactoring(days, data) {
  let newData = [];
  const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // For 1 day data we are showing hourly data hence refacotring data accordingly.
  if (days === 1) {
    for (let i = 0; i < data?.length; i += 12) {
      const date = new Date(data[i][0]);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const timeStr = `${hours}:${minutes}`;
      const fullDate = getFullDateAndTime(data[i][0], months)

      newData.push({
        date: timeStr,
        fullDate,
        price: parseFloat(data[i][1].toFixed(2)),
      });
    }

    return newData;
  }
  // For 7 day or one week and 30 days or one month data we are showing daily data hence refacotring data accordingly.

  if (days === 7 || days === 30) {
    for (let i = 0; i < data?.length; i += 24) {
      const date = new Date(data[i][0]);
      const day = date.getDate();
      const month = date.getMonth();
      const dateStr = `${months[month]} ${day}`;
      const fullDate = getFullDateAndTime(data[i][0], months)

      newData.push({
        date: dateStr,
        fullDate,
        price: parseFloat(data[i][1].toFixed(2)),
      });
    }
    return newData;
  }

    // For 365 day or one year data we are showing monthly data hence refacotring data accordingly.
  if (days === 365) {
    for (let i = 0; i < data?.length; i += 30) {
      const date = new Date(data[i][0]);
      const month = date.getMonth();
      const dateStr = `${months[month]}`;
      const fullDate = getFullDateAndTime(data[i][0], months)

      newData.push({
        date: dateStr,
        fullDate,
        price: parseFloat(data[i][1].toFixed(2)),
      });
    }
    return newData;
  }
}

function getFullDateAndTime(myDate, months) {
  const date = new Date(myDate); 

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const dateStr = `${months[month]} ${day} ${year} ${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return dateStr;
}
