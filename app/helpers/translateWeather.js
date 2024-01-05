const translateWeather = (englishWeather) => {
  const translations = {
    'Clear': 'Açık',
    'Snow': 'Kar Yağışlı',
    "Clouds": "Bulutlu",
    "Mist": "Sisli",
    "Rain": "Yağmurlu",
    "Atmosphere": "Atmosferik",
    "Drizzle" : "Çiseli Yağmur",
    "Thunderstorm": "Gök Gürültülü Sağanak" 
  };

  return translations[englishWeather] || englishWeather;
};
export  {translateWeather}