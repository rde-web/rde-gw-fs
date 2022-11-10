import { sendToCommutator } from "../../clients/commutator.ts";
import { Method, Status } from "./http.ts";

export async function ls(req: Request):Promise<Response> {
    if (req.method != Method.POST)
        return new Response(null, {status:Status.METHOD_NOT_ALLOWED});

    try {
        const request = await req.json()
        try {
            const resp = await sendToCommutator(request);
            return new Response(resp, {status:200});
        } catch(err) {
            return new Response(err, {status:Status.INTERNAL_ERROR});
        }
    } catch(err) {
        return new Response(err, {status: Status.BAD_REQUEST});
    }
}