import { useQuery } from "@tanstack/react-query";

export function usePageContent(page: string) {
  return useQuery({
    queryKey: ["content", page],
    queryFn: async () => {
      const res = await fetch(`/api/content/${page}`);
      if (!res.ok) return {};
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });
}
