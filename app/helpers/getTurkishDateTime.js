export const getTurkishDateTime = () => {
  const currentDate = new Date();

  const daysOfWeek = [
    'Pazar',
    'Pazartesi',
    'Salı',
    'Çarşamba',
    'Perşembe',
    'Cuma',
    'Cumartesi',
  ];

  const day = daysOfWeek[currentDate.getDay()];
  const time = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;

  return `${day}, ${time}`;
};