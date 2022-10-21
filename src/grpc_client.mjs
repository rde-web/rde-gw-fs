import {loadPackageDefinition, credentials} from "@grpc/grpc-js";
import {loadSync} from "@grpc/proto-loader";

class rde_fs_client {
    constructor(addr){
        let packageDefinition = loadSync("./api/rde-daemon-api/fs.proto", {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
        });
        let description = loadPackageDefinition(packageDefinition);
        this.client = new description.rde_fs.RDEFS(
            addr,
            credentials.createInsecure(), //@todo
        )
    }
}

export default function FSClient(addr) {
    const client = new rde_fs_client(addr);
      
    const proxy = {
        get(target, prop, _) {
            if (prop === "client") {
                return target.client;
            }
            return target.client[prop];
        },
    };
    return new Proxy(client, proxy);
}
