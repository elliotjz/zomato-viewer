const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getOpeningHours = (timings, date) => {
  const dayIndex = date.getDay();
  const timingsArray = timings.split('),');
  let todaysEntry = [];
  if (timingsArray.length === 1) {
    todaysEntry = timingsArray;
  } else {
    for (let i = 0; todaysEntry.length === 0 && i < 7; i++) {
      todaysEntry = timingsArray.filter((option) => (
        option.includes(days[(dayIndex + i) % 7])
      ));
    }
  }
  const openingTimes = todaysEntry[0].split(' (')[0];
  return openingTimes;
};

const isOpenNow = (openingHours, date) => {
  const to24Hour = (time) => (time.includes('AM') || time.includes('Noon')
    ? parseInt(time.split(' ')[0], 10)
    : parseInt(time.split(' '), 10) + 12);

  if (openingHours === 'Closed') return false;
  const currentHour = date.getHours();

  const matches = openingHours.split(', ').filter((hours) => {
    // Compare hours
    const timesArr = hours.split(' to ');
    const openingHour = to24Hour(timesArr[0].trim());
    const closingHour = to24Hour(timesArr[1].trim());

    if (currentHour > openingHour && currentHour < closingHour) {
      return true;
    }

    if (currentHour === openingHour) {
      // Compare minutes
      const openingSplit = timesArr[0].split(':');
      if (openingSplit.length <= 1) return true;
      const openingMinute = parseInt(openingSplit[1], 10);
      return date.getMinutes() >= openingMinute;
    }

    if (currentHour === closingHour) {
      // Compare minutes
      const openingSplit = timesArr[0].split(':');
      if (openingSplit.length <= 1) return false;
      const openingMinute = parseInt(openingSplit[1], 10);
      return date.getMinutes() <= openingMinute;
    }

    return false;
  });

  return matches.length > 0;
};

export { getOpeningHours, isOpenNow };
