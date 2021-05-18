import React, { useCallback, useState } from 'react';
import { useRafCallback } from '../../src';

export const Example: React.FC = () => {
  const [eventDate, setEventDate] = useState<Date>();
  const [frameDate, setFrameDate] = useState<Date>();

  const [storeFrameDate] = useRafCallback(() => {
    setFrameDate(new Date());
  });

  const handleClick = useCallback(() => {
    setEventDate(new Date());
    storeFrameDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        Below states displays dates when occurred event and animation frame that following it
      </div>
      <br />
      <div>Event occurred: {eventDate?.toISOString() ?? 'NOT TRIGGERED'}</div>
      <div>Animation frame occurred: {frameDate?.toISOString()}</div>
      <br />
      <button onClick={handleClick}>Push me!</button>
    </div>
  );
};
