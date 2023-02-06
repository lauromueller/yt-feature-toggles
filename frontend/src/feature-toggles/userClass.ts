export interface IUserClass {
  isBeta: () => boolean;
}

export type UserClasses = 'beta' | 'stable';

class StableUser implements IUserClass {
  isBeta = () => false;
}

class BetaUser implements IUserClass {
  isBeta = () => true;
}

export const userClassFactory = (userClass: UserClasses): IUserClass => {
  if (userClass === 'stable') {
    return new StableUser();
  } else {
    return new BetaUser();
  }
};
