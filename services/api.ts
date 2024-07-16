import type {AsyncDataOptions} from "#app/composables/asyncData";

export function useTestRequest(options?: AsyncDataOptions): ReturnType<typeof useAsyncData<API.Test>>  {
    return useGet('https://www.kokoni.ltd/index/Article/loadArticleInfo?article_id=123',options)
}