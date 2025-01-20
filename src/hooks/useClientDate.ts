import { useState, useEffect } from 'react';

type Props = {
  refreshInterval?: number;
};

const useClientDate = ({ refreshInterval }: Props) => {
  const [today, setToday] = useState(() => new Date());

  useEffect(() => {
    if (!refreshInterval) return;

    const interval = setInterval(() => {
      setToday(new Date());
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  return today;
};

export default useClientDate;
