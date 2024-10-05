/// <reference lib="webworker" />

import { setupServiceWorker } from "@builder.io/qwik-city/service-worker"

setupServiceWorker()

// eslint-disable-next-line ts/promise-function-async,ts/no-misused-promises
self.addEventListener("install", () => self.skipWaiting())
self.addEventListener("activate", (ev) => ev.waitUntil(self.clients.claim()))

declare const self: ServiceWorkerGlobalScope
