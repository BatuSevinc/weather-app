const getSunRise = (unixTimestamp) => {
  if (unixTimestamp) {
    const sunrise = new Date(unixTimestamp * 1000);
    const formattedSunrise = sunrise.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
    return formattedSunrise;
  } else {
    return '';
  }
};

const getSunSet = (unixTimestamp) => {
  if (unixTimestamp) {
    const sunrise = new Date(unixTimestamp * 1000);
    const formattedSunrise = sunrise.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
    return formattedSunrise;
  } else {
    return '';
  }
};

export {getSunRise,getSunSet};
