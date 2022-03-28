import { nanoid } from 'nanoid';

export const USER_KEY = 'userID';

export const createUser = () => {
  const generatedUserID = nanoid(10);
  localStorage.setItem(USER_KEY, generatedUserID);

  return generatedUserID;
};

export const getCurrentUser = (): string | undefined => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(USER_KEY) || createUser();
  }
};
