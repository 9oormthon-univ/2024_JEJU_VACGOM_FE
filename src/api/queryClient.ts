import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 브라우저에 포커스가 들어온 경우
      refetchOnMount: true, // 새로운 컴포넌트 마운트가 발생한 경우
      refetchOnReconnect: true, // 네트워크 재연결이 발생한 경우
      staleTime: 0, // 데이터가 fresh -> stale 되는 시간
      gcTime: 0, // 캐시된 데이터가 얼마나 오랫동안 메모리에 유지될 것인지
      retry: 0,
    },
  },
});
