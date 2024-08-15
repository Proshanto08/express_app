import moment from 'moment-timezone';

const formatTimezoneLabel = (timezone: string): string => {
  // Extract city/location from timezone
  const parts = timezone.split('/');
  const city = parts.length > 1 ? parts[1] : parts[0];
  
  // Get the offset
  const offset = moment.tz(timezone).format('Z');

  return `(GMT${offset}) ${city}`;
};

export const getAllTimezones = (): { value: string, label: string }[] => {
  return moment.tz.names().map((timezone) => ({
    value: timezone,
    label: formatTimezoneLabel(timezone)
  }));
};
