import { useToggles } from '../feature-toggles';
import { post } from '../network';

const Config = () => {
  const { updateUserClass, updateUserPermissions } = useToggles();

  return (
    <div className="flex justify-between">
      <div className="flex align-middle">
        <input
          className="mr-2"
          type="checkbox"
          onChange={(e) =>
            post('http://localhost:8080/config', {
              enableToggles: e.target.checked,
            })
          }
          id="enable-toggles-checkbox"
        />
        <label htmlFor="enable-toggles-checkbox">Simulate high load</label>
      </div>
      <div className="grid gap-1 grid-cols-2">
        <div>
          <input
            className="mr-2"
            type="checkbox"
            id="beta-user-checkbox"
            onChange={(e) =>
              updateUserClass(e.target.checked ? 'beta' : 'stable')
            }
          />
          <label htmlFor="beta-user-checkbox">Beta user</label>
        </div>
        <div>
          <input
            className="mr-2"
            type="checkbox"
            id="admin-user-checkbox"
            onChange={(e) =>
              updateUserPermissions(e.target.checked ? 'admin' : 'anonymous')
            }
          />
          <label htmlFor="admin-user-checkbox">Admin user</label>
        </div>
      </div>
    </div>
  );
};

export default Config;
