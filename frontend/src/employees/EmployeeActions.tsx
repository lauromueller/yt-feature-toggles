import { FunctionComponent } from 'react';
import { useToggles } from '../feature-toggles';
import {
  UserClassToggles,
  UserPermissionsToggles,
} from '../feature-toggles/TogglesContext';
import { Employee } from './Employees';

export const EmployeeActions: FunctionComponent<{
  employee: Employee;
}> = () => {
  const { isOn: isBeta } = useToggles([UserClassToggles.Beta]);
  const { isOn: isAdmin } = useToggles([UserPermissionsToggles.Admin]);

  return <div className="flex">{isBeta && <span>{isAdmin && 'Delete'} | Open</span>}</div>;
};
