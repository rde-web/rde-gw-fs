// import { decode, encode } from "https://deno.land/x/msgpack@v1.2/mod.ts";

const MAX_BUFF_SIZE = 256;

export async function sendToCommutator(data:Record<string, unknown>): Promise<string> {
    const conn:Deno.Conn = await Deno.connect({hostname:"localhost", port:8085});
    {
        // const encoded = encode(data);
        // const nWrited = await conn.write(encoded);
    	// @todo cannot correctrly decode msg pack on rde-commutator
        const fdid = data.fdid;
        delete data.fdid;
        const payload = {
            svc :"fs",
            mtd: "ls",
            fdid: fdid,
            pld: data
        }

        const encoded = JSON.stringify(payload);
        const nWrited = await conn.write(new TextEncoder().encode(encoded));
        console.log(`writed ${nWrited}`);
    }
    const buff:Uint8Array = new Uint8Array(MAX_BUFF_SIZE);
    {
        const nReaded = await conn.read(buff);
        console.log(`readed ${nReaded}`);
        if (nReaded == null)
            throw new Error("EOF");
    }
    // const result = decode(buff);
    // @todo cannot correctrly decode msg pack on rde-commutator
    const out = new TextDecoder().decode(buff);
    conn.close();
    return out
}