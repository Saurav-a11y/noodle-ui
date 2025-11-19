import { useQuery } from '@tanstack/react-query';
import { fetchMostTalkedProject } from '@/apis';

export const useMostTalkedProject = () =>
    useQuery({
        queryKey: ['mostTalkedProject'],
        queryFn: fetchMostTalkedProject,
        staleTime: 1000 * 60 * 5,
    });