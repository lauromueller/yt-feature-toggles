import { useState } from 'react';
import { EmployeeActions } from './EmployeeActions';
import { PuffLoader } from 'react-spinners';
import { Button, Centered } from '../design-kit';

export type Employee = {
  id: string;
  name: string;
  position: string;
  totalHours: string | number;
};

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col">
      <Button
        className="my-4 px-2 border rounded active:bg-slate-200 w-fit"
        onClick={() => {
          setLoading(true);
          fetch('http://localhost:8080/employees')
            .then((res) => res.json())
            .then((res) => {
              setEmployees(res);
              setLoading(false);
            });
        }}
      >
        Fetch employees
      </Button>
      <div className="border border-slate-200 rounded-md py-3 w-100">
        {loading && <Centered>{<PuffLoader />}</Centered>}
        {employees.length === 0 && !loading && (
          <Centered>
            <span>No employees</span>
          </Centered>
        )}
        {employees.length > 0 && !loading && (
          <ul>
            {employees.map((employee) => (
              <li
                key={employee.id}
                className="mb-3 pb-3 border-b border-b-slate-200 px-4 last:mb-0 last:pb-0 last:border-0 flex justify-between items-center w-100"
              >
                <div>
                  <p>{employee.name}</p>
                  <pre className="text-sm text-slate-400">
                    {employee.position}
                    {employee.totalHours &&
                      `${
                        employee.position.length < 8 ? '\t\t' : '\t'
                      }| Worked in month: ${employee.totalHours}h`}
                  </pre>
                </div>
                <EmployeeActions employee={employee} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Employees;
