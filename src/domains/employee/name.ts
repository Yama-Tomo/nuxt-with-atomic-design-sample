import { Country } from './attributes';

export const fullName = (
  firstName: string,
  lastName: string,
  country: number
) =>
  country === Country.JAPAN
    ? `${lastName} ${firstName}`
    : `${firstName} ${lastName}`;
