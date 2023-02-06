import React, {
  ReactNode,
  FunctionComponent,
  useContext,
  useState,
} from 'react';
import { IUserClass, UserClasses, userClassFactory } from './userClass';
import {
  IUserPermissions,
  UserPermissions,
  userPermissionsFactory,
} from './userPermissions';

type TogglesProviderProps = {
  children: ReactNode;
  defaultUserClass: IUserClass;
  defaultUserPermissions: IUserPermissions;
};

type TogglesContext = {
  computeToggles: (toggles: Toggles[]) => boolean;
  config: {
    updateUserClass: (userClass: UserClasses) => void;
    updateUserPermissions: (userPermissions: UserPermissions) => void;
  };
};

const togglesContext = React.createContext<TogglesContext>({
  computeToggles: () => false,
  config: {
    updateUserClass: () => undefined,
    updateUserPermissions: () => undefined,
  },
});

export enum UserClassToggles {
  Beta = 'beta',
}

export enum UserPermissionsToggles {
  Admin = 'admin',
}

export enum FeatureUnderDevelopment {
    ShowTotalWorkCalculation022023 = 'showTotalWorkCalculation022023',
  }

type Toggles = UserClassToggles | UserPermissionsToggles | FeatureUnderDevelopment;

export const useToggles = (toggles: Toggles[] = []) => {
  const { computeToggles, config } = useContext(togglesContext);

  return {
    isOn: computeToggles(toggles),
    updateUserClass: config.updateUserClass,
    updateUserPermissions: config.updateUserPermissions
  };
};

export const TogglesProvider: FunctionComponent<TogglesProviderProps> = ({
  children,
  defaultUserClass,
  defaultUserPermissions,
}) => {
  const [userClass, setUserClass] = useState<IUserClass>(defaultUserClass);
  const [userPermissions, setUserPermissions] = useState<IUserPermissions>(
    defaultUserPermissions
  );

  const togglesDict: Record<Toggles, () => boolean> = {
    [UserClassToggles.Beta]: userClass.isBeta,
    [UserPermissionsToggles.Admin]: userPermissions.isAdmin,
    [FeatureUnderDevelopment.ShowTotalWorkCalculation022023]: () => false
  };

  const computeToggles = (toggles: Toggles[]): boolean => {
    return toggles.reduce((prev, curr) => prev && togglesDict[curr](), true);
  };

  const updateUserClass = (newUserClass: UserClasses) =>
    setUserClass(userClassFactory(newUserClass));

  const updateUserPermissions = (newUserPermissions: UserPermissions) =>
    setUserPermissions(userPermissionsFactory(newUserPermissions));

  return (
    <togglesContext.Provider
      value={{
        computeToggles,
        config: {
          updateUserClass,
          updateUserPermissions,
        },
      }}
    >
      {children}
    </togglesContext.Provider>
  );
};
