import React, { useMemo, useRef, useState } from 'react';
import { useMemoCache } from '../..';

export const Example: React.FC = () => {
  const { initialFilters: filters, initialUsers: users } = useMemo(() => {
    const initialFilters = {
      none: 'none',
      premiumCustomer: 'premium customer',
      customer: 'customer',
      guest: 'guest',
    };

    const initialUsers = [
      {
        name: 'James',
        type: initialFilters.customer,
      },
      {
        name: 'Robert',
        type: initialFilters.premiumCustomer,
      },
      {
        name: 'Mary',
        type: initialFilters.guest,
      },
      {
        name: 'Elizabeth',
        type: initialFilters.customer,
      },
      {
        name: 'Richard',
        type: initialFilters.guest,
      },
    ];

    return {
      initialFilters,
      initialUsers,
    };
  }, []);

  const [selectedFilter, setSelectedFilter] = useState(filters.none);

  const memoCalls = useRef(0);
  const memoCacheCalls = useRef(0);

  const memoUsers = useMemo(() => {
    memoCalls.current++;

    return users.filter((user) => selectedFilter === filters.none || user.type === selectedFilter);
  }, [filters.none, selectedFilter, users]);
  const memoCacheUsers = useMemoCache(() => {
    memoCacheCalls.current++;

    return users.filter((user) => selectedFilter === filters.none || user.type === selectedFilter);
  }, [filters.none, selectedFilter, users]);

  const listing = [
    {
      name: useMemoCache.name,
      calls: memoCacheCalls.current,
      listedUsers: memoCacheUsers,
    },
    {
      name: useMemo.name,
      calls: memoCalls.current,
      listedUsers: memoUsers,
    },
  ];

  const labelDomId = 'user-type';

  return (
    <section>
      <h1>Example of useMemoCache</h1>
      <div>
        {listing.map(({ name, listedUsers, calls }) => (
          <section key={name}>
            <h2>
              {name}: calls {calls}
            </h2>
            <ul>
              {listedUsers.map((user) => (
                <li>
                  <p>
                    {user.name}: {user.type}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <label htmlFor={labelDomId}>
        select filter:{' '}
        <select id={labelDomId} onChange={({ target: { value } }) => setSelectedFilter(value)}>
          {Object.values(filters).map((filter) => (
            <option selected={selectedFilter === filter} value={filter}>
              {filter}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
};
