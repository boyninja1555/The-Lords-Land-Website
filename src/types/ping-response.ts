import type PlayerData from "./player-data"

export default interface PingResponse {
    online: boolean
    ip: string
    port: number
    hostname?: string
    debug: {
        ping: boolean
        query: boolean
        bedrock: boolean
        srv: boolean
        querymismatch: boolean
        ipinsrv: boolean
        cnameinsrv: boolean
        animatedmotd: boolean
        cachehit: boolean
        cachetime: number
        cacheexpire: number
        apiversion: number
    }
    version?: string
    protocol?: {
        version: number
        name: string
    }
    icon?: string
    software?: string
    map?: {
        raw: string
        clean: string
        html: string
    }
    gamemode?: string
    serverid?: string
    eula_blocked?: boolean
    motd?: {
        raw: string[]
        clean: string[]
        html: string[]
    }
    players?: {
        online: number
        max: number
        list?: PlayerData[]
    }
    plugins?: {
        name: string
        version: string
    }[]
    mods?: {
        name: string
        version: string
    }[]
    info?: {
        raw: string[]
        clean: string[]
        html: string[]
    }
}
