FROM denoland/deno:alpine-1.27.2 AS builder
RUN apk update && apk add make=4.3-r0 git=2.30.6-r0
WORKDIR /src
COPY . .
ENTRYPOINT [ "make", "run" ]
# https://github.com/denoland/deno/issues/1846
# RUN make build

# FROM alpine:3.16.2
# WORKDIR /bin
# COPY --from=builder /src/build/rde-gw-fs rde-gw-fs
# ENTRYPOINT [ "rde-gw-fs" ]