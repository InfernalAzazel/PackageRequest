import {computed, MaybeRef, unref} from "vue";
import {isObject} from "@vueuse/core";
import {LocationQueryRaw, stringifyQuery} from "vue-router";
import type {AsyncData} from "#app";

export const useRequest = $fetch.create({
    // 请求拦截
    async onRequest({ options }) {
        // 这里处理你的token
        const state = useGlobalState()
        options.headers = Object.assign(options.headers || {}, {
            // 如果 access_token 存在，则设置 Authorization 头部
            ...(state.value.access_token ? { 'Authorization': `Bearer ${state.value.access_token}` } : {}),
            // 如果locale存在，则设置 Customize-Language 头部
            ...(state.value.locale ? { 'Customize-Language': state.value.locale} : {}),
        })
    },
    // 正常响应
    async onResponse({ response }) {

    },
    // 响应异常
    async onResponseError({ response, options }) {
        options?.params?.noMessage || console.log(response._data?.message || '服务器错误')
    },
})


/**
 * 封装 get 请求
 * @param url 请求地址
 * @param query 请求参数
 */
export function useGet<T = unknown>(
    url: MaybeRef<string>,
    query?: MaybeRef<unknown>
): Promise<AsyncData<DataT>>  {
    const _url = computed(() => {
        const _url = unref(url)
        const _query = unref(query)
        const queryString = isObject(_query)
            ? stringifyQuery(_query as LocationQueryRaw)
            : _query || ''
        return `${_url}${queryString ? '?' : ''}${queryString}`
    })
    return useAsyncData<T>(() => useRequest(_url.value, {method: 'get'}),
        {immediate: false}
    )
}

/**
 * 封装 post 请求
 * @param url 请求地址
 * @param payload 请求参数
 */
export function usePost<T = unknown>(
    url: MaybeRef<string>,
    payload?: MaybeRef<unknown>
): ReturnType<typeof useAsyncData<T>> {
    return useAsyncData<T>( () => useRequest(url, {method: 'post', body: payload}),
        {immediate: false}
    )
}

/**
 * 封装 put 请求
 * @param url 请求地址
 * @param payload 请求参数
 */
export function usePut<T = unknown>(
    url: MaybeRef<string>,
    payload?: MaybeRef<unknown>
): ReturnType<typeof useAsyncData<T>> {
    return useAsyncData<T>(() => useRequest(url, {method: 'put', body: payload}),
        {immediate: false}
    )
}

/**
 * 封装 delete 请求
 * @param url 请求地址
 * @param query 请求参数
 */
export function useDelete<T = unknown>(
    url: MaybeRef<string>,
    query?: MaybeRef<unknown>
): ReturnType<typeof useAsyncData<T>>  {
    const _url = computed(() => {
        const _url = unref(url)
        const _query = unref(query)
        const queryString = isObject(_query)
            ? stringifyQuery(_query as LocationQueryRaw)
            : _query || ''
        return `${_url}${queryString ? '?' : ''}${queryString}`
    })
    return useAsyncData<T>(() => useRequest(_url.value, {method: 'delete'}),
        {immediate: false}
    )
}

/**
 * 封装获取Blob进行下载
 * @param url 请求地址
 */
export function useBlob(url: MaybeRef<string>): ReturnType<typeof useAsyncData<T>> {
    return useAsyncData<Blob>(async () => useRequest(url, {method: 'blob'}),
        {immediate: false}
    )
}