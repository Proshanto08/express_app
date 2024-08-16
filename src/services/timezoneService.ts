import moment from 'moment-timezone';

const formatTimezoneLabel = (timezone: string): string => {
  const parts = timezone.split('/');
  const city = parts.length > 1 ? parts[1] : parts[0];
  const offset = moment.tz(timezone).format('Z');
  return `(GMT${offset}) ${city}`;
};


interface ITimezone {
  value: string;
  label: string;
  offset: string;
}


export const getAllTimezones = (): { value: string; label: string }[] => {
  return moment.tz.names()
    .map((timezone: string): ITimezone => {
      const offset = moment.tz(timezone).format('Z');
      return {
        value: timezone,
        label: formatTimezoneLabel(timezone),
        offset,
      };
    })
    .sort((a: ITimezone, b: ITimezone): number => {
      // Sort negative offsets first in descending order
      if (a.offset.startsWith('-') && b.offset.startsWith('-')) {
        return b.offset.localeCompare(a.offset); // Descending for negative offsets
      }
      if (a.offset.startsWith('-') && !b.offset.startsWith('-')) {
        return -1; // Negative offsets come before positive offsets
      }
      if (!a.offset.startsWith('-') && b.offset.startsWith('-')) {
        return 1; // Positive offsets come after negative offsets
      }
      // Sort positive offsets in ascending order
      return a.offset.localeCompare(b.offset); // Ascending for positive offsets
    })
    .map(({ value, label }: ITimezone): { value: string; label: string } => ({ value, label }));
};
