import { connection } from "next/server"

import { PageInner } from "@/components/mvd/page-inner"

export default async function Page() {
  await connection()

  return <PageInner />
}