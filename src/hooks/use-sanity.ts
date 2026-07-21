import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "@/lib/sanity";

export const useSanity = <T = unknown>(key: string, query: string, params?: Record<string, unknown>) =>
  useQuery<T>({
    queryKey: ["sanity", key, params ?? {}],
    queryFn: () => sanityClient.fetch<T>(query, params),
    staleTime: 60_000,
  });
