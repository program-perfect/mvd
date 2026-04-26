"use client"

import { useEffect, useState } from "react"

export function SessionCode() {
  const [suffix, setSuffix] = useState("0000")

  useEffect(() => {
    const nextSuffix = String(Math.floor(Date.now() / 1000) % 10000).padStart(4, "0")
    setSuffix(nextSuffix)
  }, [])

  return <span className="tabular-nums">04-217-{suffix}</span>
}