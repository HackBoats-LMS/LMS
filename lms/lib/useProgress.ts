'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export const useProgress = (subject: string, totalModules: number) => {
  const { data: session } = useSession();
  const [completedPercentage, setCompletedPercentage] = useState(0);
  const [masteryPercentage, setMasteryPercentage] = useState(0);

  useEffect(() => {
    if (session?.user?.email) {
      fetchProgress();
    }
  }, [session]);

  const fetchProgress = async () => {
    try {
      const res = await fetch(`/api/progress?userEmail=${session?.user?.email}&subject=${subject}`);
      const data = await res.json();
      if (data.success) {
        calculateProgress(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch progress:', error);
    }
  };

  const calculateProgress = (progress: any[]) => {
    const completedModules = progress.filter(p => p.completed).length;
    const masteryModules = progress.filter(p => p.percentage >= 80).length;
    
    setCompletedPercentage(Math.round((completedModules / totalModules) * 100));
    setMasteryPercentage(Math.round((masteryModules / totalModules) * 100));
  };

  return { completedPercentage, masteryPercentage };
};
