import { sign } from 'jsonwebtoken';
import {compare} from 'bcryptjs';

export async function comparePassword(attempt, password) {
  return await compare(attempt, password);
}

export function getToken(id, username) {
  return sign({
      id,
      username,
    },
    process.env.SECRET,
    { expiresIn: '10m', algorithm: 'HS512', issuer: username },
  );
}

export function handleSorting(sortExpression: string) {
  const orderOptions = {};
  const criterion = sortExpression.split(',');
  criterion.forEach(criteria => {
    const parameter = criteria.charAt(0);
    const key = criteria.substring(1);
    // ' ' - because '+' is transformed into ' '
    if (parameter !== ' ' && parameter !== '-') {
      //throw new InvalidSortingParameterException();
    }
    const value = criteria.startsWith('-') ? -1 : 1;
    orderOptions[key] = value;
  });
  return orderOptions;
}
