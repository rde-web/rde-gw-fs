import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { notFound } from "./handlers/404.ts";
import { ls } from "./handlers/ls.ts";

const ROUTE_LS:URLPattern = new URLPattern({ pathname: "/ls" });

function handle(req: Request): Promise<Response> {
  const url:URL = new URL(req.url)
  switch(url.pathname) {
    case ROUTE_LS.pathname:
      return ls(req);
  }
  return notFound();
}

console.log("Listening on http://localhost:8000");

serve(handle);
