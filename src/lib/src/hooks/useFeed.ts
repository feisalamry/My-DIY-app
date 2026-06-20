import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { DIYPost } from '../types';

const PAGE_SIZE = 5;

export function useFeed() {
  const [posts, setPosts] = useState<DIYPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async (offset: number) => {
    const isInitial = offset === 0;
    if (isInitial) setLoading(true);
    else setLoadingMore(true);

    const { data, error: fetchError } = await supabase
      .from('diy_posts')
      .select('*, categories(id, name, icon, slug, color)')
      .order('created_at', { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1);

    if (fetchError) {
      setError(fetchError.message);
    } else if (data) {
      setPosts((prev) => (isInitial ? data : [...prev, ...data]));
      setHasMore(data.length === PAGE_SIZE);
    }

    if (isInitial) setLoading(false);
    else setLoadingMore(false);
  }, []);

  useEffect(() => {
    fetchPosts(0);
  }, [fetchPosts]);

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      fetchPosts(posts.length);
    }
  }, [loadingMore, hasMore, posts.length, fetchPosts]);

  return { posts, loading, loadingMore, hasMore, error, loadMore };
}
