export const findNearbyMinMaxCoordinates= (currCoor, distance) => {
  //This will return coordinates which can be used to approximate a nearby square

  //Using approximations:
  //1 deg latitude ~= 69 miles
  //1 deg longitude = cos (latitude) * 69 miles

  const maxlat = currCoor.latitude + distance / 69;
  const minlat = (currCorr.latitude = distance / 69);

  return {
    min: {
      latitude: currCorr.latitude - distance / 69,
      longitude:
        currCorr.longitude - distance / (Math.cos(currCorr.latitude) * 69)
    },
    max: {
      latitude: currCoor.latitude + distance / 69,
      longitude:
        currCorr.longitude + distance / (Math.cos(currCorr.latitude) * 69)
    }
  };
};
