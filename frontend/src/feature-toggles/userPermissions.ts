export interface IUserPermissions {
  isAdmin: () => boolean;
}

export type UserPermissions = 'admin' | 'anonymous';

class AnonymousUser implements IUserPermissions {
  isAdmin = () => false;
}

class AdminUser implements IUserPermissions {
  isAdmin = () => true;
}

export const userPermissionsFactory = (
  userPermissions: UserPermissions
): IUserPermissions => {
  if (userPermissions === 'admin') {
    return new AdminUser();
  } else {
    return new AnonymousUser();
  }
};
