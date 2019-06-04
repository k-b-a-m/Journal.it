module.exports = (coordinate, distance) => {
  //This will return coordinates which can be used to approximate a nearby square

  //Using approximations:
  //1 deg latitude ~= 69 miles
  //1 deg longitude = cos (latitude) * 69 miles

  return {
    min: {
      latitude: coordinate.latitude - distance / 69,
      longitude:
      coordinate.longitude - distance / (Math.cos(coordinate.latitude) * 69)
    },
    max: {
      latitude: coordinate.latitude + distance / 69,
      longitude:
      coordinate.longitude + distance / (Math.cos(coordinate.latitude) * 69)
    }
  };
};
