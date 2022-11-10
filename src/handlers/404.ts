import { Status } from "./http.ts";

export function notFound(): Promise<Response> {
    return new Promise<Response>(
        (resolve, _) => resolve(new Response("Not found", {status: Status.NOT_FOUND}))
    )
}