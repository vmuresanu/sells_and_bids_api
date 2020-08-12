import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { UserResponse } from '../modules/user/entity/user.response';

export async function comparePassword(attempt, password) {
  return await compare(attempt, password);
}

export function generateToken(id, username, roles, permissions) {
  return sign({
      id,
      username,
      roles,
      permissions,
    },
    process.env.SECRET,
    { expiresIn: '10m', algorithm: 'HS512', issuer: username },
  );
}

export function mapRolesAndPermissions(userResponse: UserResponse) {
  let object = { roles: [], permissions: [] } as any;
  object.id = userResponse.id;
  object.username = userResponse.username;

  userResponse.roles.forEach(r => {
    object.roles.push(r.name);
    return r.permissions.forEach(
      p => object.permissions.push(p.name),
    );
  });

  return object;
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
