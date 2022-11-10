
export enum Status{
    OK = 200,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    INTERNAL_ERROR = 500
}

export enum Method{
    GET = "GET",
    POST = "POST",
    OPTIONS = "OPTIONS"
}