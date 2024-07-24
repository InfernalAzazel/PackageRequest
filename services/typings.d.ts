export interface PagesData<T> extends ResponseMessages<T>{
    total: number
}

export interface ResponseMessages <T>{
    done: boolean
    code: number
    msg: boolean
    data: T | any
}

declare namespace API {
    type Test = {
        title: string
        content: string
    }
}