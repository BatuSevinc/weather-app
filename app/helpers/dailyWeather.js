 const filterDailyWeather = (dailyForecast, numberOfDays) => {
  const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const daysForecasts = {};
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + numberOfDays);

  dailyForecast.list.forEach((forecast) => {
    const forecastDate = new Date(forecast.dt * 1000);
    const dayName = dayNames[forecastDate.getDay()];
    const isWithinDays = forecastDate >= today && forecastDate <= futureDate;

    if (isWithinDays) {
      if (!daysForecasts[dayName]) {
        daysForecasts[dayName] = [];
      }
      daysForecasts[dayName].push(forecast);
    }
  });

  return daysForecasts;
};

export default filterDailyWeather