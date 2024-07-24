import { useFetch, useNuxtApp } from 'nuxt/app'
import type { UseFetchOptions, AsyncData } from 'nuxt/app'
import type { FetchError } from 'ofetch'
import type { Ref } from '#imports'

export function useAPI<T>(
    url: string | (() => string),
    options?: Omit<UseFetchOptions<T>, 'default'> & { default: () => T | Ref<T> },
) : AsyncData<T, FetchError> {
    return useFetch(url, {
        ...options,
        $fetch: useNuxtApp().$api,
    }) as AsyncData<T, FetchError>
}
