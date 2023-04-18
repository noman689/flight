import moment from 'moment';

export const insertIf = <T>(condition?: any, ...elements: T[]) =>
  condition ? elements : [];

export const getAircraftDate = (segments, key) => {
  if (key == 'from') {
    return segments[0].departing_at;
  } else {
    return segments[segments.length - 1].arriving_at;
  }
};
export const getDuration = (start, end) => {
  const d1 = moment(new Date(start));
  const d2 = moment(new Date(end));
  const difference = d2.diff(d1, 'minutes');
  const hours = Math.trunc(difference / 60);
  const minutes = difference - hours * 60;
  return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
};
export const getStops = (segment) => {
  let stops = [];
  if (segment?.length > 1) {
    for (let i = 0; i < segment.length - 1; i++) {
      const stopDuration = getDuration(
        segment[i].departing_at,
        segment[i + 1].departing_at,
      );
      stops.push({
        [i]: `${stopDuration} ${segment[i + 1].origin.iata_code} `,
      });
    }
  }
  return {
    stopLength: stops.length,
    stops,
  };
};
