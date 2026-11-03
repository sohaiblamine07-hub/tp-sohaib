const express = require("express")

const app = express()

const SERVICE_C_URL = "http://127.0.0.1:8080"

app.get("/", async (req, res) => {
    const listeARetourner = [

        { "name": "Service B - node" }
    ]

    const r = await fetch(`${SERVICE_C_URL}`, {signal : AbortSignal.timeout(5000)})

    for(const item of await r.json()){
        listeARetourner.push(item)
    }
    res.json(listeARetourner)
})

app.listen(8081, "0.0.0.0")