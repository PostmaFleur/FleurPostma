"use client"

import {
  cloneKickoff,
  defaultKickoff,
  parseKickoff,
  STORAGE_KEY,
  type KickoffState,
} from "@/lib/kickoff"

export type KickoffSnapshot = {
  state: KickoffState
  corrupt: boolean
  persisted: boolean
  savedAt: string | null
}

const listeners = new Set<() => void>()
let cached: KickoffSnapshot | null = null

function notify() {
  for (const listener of listeners) listener()
}

export function subscribeKickoff(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getKickoffServerSnapshot(): KickoffSnapshot {
  return {
    state: cloneKickoff(defaultKickoff),
    corrupt: false,
    persisted: false,
    savedAt: null,
  }
}

export function getKickoffSnapshot(): KickoffSnapshot {
  if (cached) return cached
  cached = readFromStorage()
  return cached
}

function clockLabel() {
  return new Intl.DateTimeFormat("nl-NL", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date())
}

function readFromStorage(): KickoffSnapshot {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return {
        state: cloneKickoff(defaultKickoff),
        corrupt: false,
        persisted: false,
        savedAt: null,
      }
    }
    const parsed = parseKickoff(JSON.parse(raw))
    if (!parsed) {
      return {
        state: cloneKickoff(defaultKickoff),
        corrupt: true,
        persisted: false,
        savedAt: null,
      }
    }
    return {
      state: parsed,
      corrupt: false,
      persisted: true,
      savedAt: null,
    }
  } catch {
    return {
      state: cloneKickoff(defaultKickoff),
      corrupt: true,
      persisted: false,
      savedAt: null,
    }
  }
}

export function saveKickoff(state: KickoffState) {
  const next: KickoffSnapshot = {
    state,
    corrupt: false,
    persisted: true,
    savedAt: clockLabel(),
  }
  cached = next
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  notify()
}

export function resetKickoff() {
  window.localStorage.removeItem(STORAGE_KEY)
  cached = {
    state: cloneKickoff(defaultKickoff),
    corrupt: false,
    persisted: false,
    savedAt: clockLabel(),
  }
  notify()
}
