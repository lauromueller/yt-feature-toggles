import { FunctionComponent } from 'react';
import { Employee } from './Employees';

export const EmployeeActions: FunctionComponent<{
  employee: Employee;
}> = () => {
  return (
    <div className="flex">
      <span>Delete | Open</span>
    </div>
  );
};
