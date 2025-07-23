import { useQuery } from '@tanstack/react-query';
import { fetchTopGainingProject } from '@/apis';

export const useTopGainingProject = () =>
    useQuery({
        queryKey: ['topGainingProject'],
        queryFn: fetchTopGainingProject,
        staleTime: 1000 * 60 * 5,
    });