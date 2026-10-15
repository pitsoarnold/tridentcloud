import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getFoundingAvailability } from "@/lib/founding-clients.functions";

export function useFoundingStatus() {
  const fetchAvailability = useServerFn(getFoundingAvailability);
  const [status, setStatus] = useState<{
    isActive: boolean;
    filledSpots: number;
    totalSpots: number;
    isLoading: boolean;
  }>({ isActive: false, filledSpots: 0, totalSpots: 0, isLoading: true });

  useEffect(() => {
    let active = true;

    void fetchAvailability()
      .then((availability) => {
        if (!active) return;
        setStatus({
          isActive: availability.isActive,
          filledSpots: availability.filledSpots,
          totalSpots: availability.totalSpots,
          isLoading: false,
        });
      })
      .catch(() => {
        if (!active) return;
        setStatus({ isActive: false, filledSpots: 0, totalSpots: 0, isLoading: false });
      });

    return () => {
      active = false;
    };
  }, [fetchAvailability]);

  return {
    ...status,
    isFull: status.totalSpots > 0 && status.filledSpots >= status.totalSpots,
  };
}
