import { createServer } from "node:http"
import process from "node:process"

/*
 * WHAT IS THIS FILE?
 *
 * It's the entry point for the Express HTTP server when building for production.
 *
 * Learn more about Node.js server integrations here:
 * - https://qwik.dev/docs/deployments/node/
 */
import { createQwikCity } from "@builder.io/qwik-city/middleware/node"
import qwikCityPlan from "@qwik-city-plan"
import { manifest } from "@qwik-client-manifest"

import render from "./entry.ssr"

// Allow for dynamic port
const PORT = process.env.PORT ?? 3004

// Create the Qwik City express middleware
const { router, notFound, staticFile } = createQwikCity({
  render,
  qwikCityPlan,
  manifest,
})

const server = createServer()

server.on("request", (req, res) => {
  if (req.url?.startsWith("/build") || req.url?.startsWith("/assets")) {
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable")
  }

  void staticFile(req, res, () => {
    void router(req, res, () => {
      void notFound(req, res, () => null)
    })
  })
})

server.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`)
})
