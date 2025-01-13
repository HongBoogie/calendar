import { useState, useEffect } from 'react';

const useClientDate = () => {
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    setToday(new Date());
  }, []);

  return today;
};

export default useClientDate;
