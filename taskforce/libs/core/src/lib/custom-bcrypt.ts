import { genSaltSync, hashSync, compareSync } from 'bcrypt';

const SALT_ROUNDS = 10;

export const SALT = genSaltSync(SALT_ROUNDS);

export const getHashPassword = (password: string): string => {
  return hashSync(password, SALT);
};

export const comparePassword = (password: string, passwordHash: string): boolean => {
  return compareSync(password, passwordHash);
}
