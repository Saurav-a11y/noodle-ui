import { useQuery } from '@tanstack/react-query';
import { fetchOverviewStats } from '@/apis';

export const useOverviewStats = () =>
    useQuery({
        queryKey: ['overviewStats'],
        queryFn: fetchOverviewStats,
        staleTime: 1000 * 60 * 5,
    });