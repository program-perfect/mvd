import { PageInner } from "@/components/mvd/page-inner"

type PageProps = {
  searchParams: Promise<{
    section?: string | string[]
  }>
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams
  const rawSection = Array.isArray(params.section) ? params.section[0] : params.section

  return <PageInner initialSlug={rawSection ?? null} />
}