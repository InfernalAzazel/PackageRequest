export function useTestRequest(): ReturnType<typeof useAsyncData<API.Test>>  {
    return useGet('https://www.kokoni.ltd/index/Article/loadArticleInfo?article_id=123')
}