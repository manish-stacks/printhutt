import Compare from "@/pages/Compare"
import { notFound } from "next/navigation"

export const metadata = {
  title: 'compare',
  description: 'compare',
}

const ComparePage = () => {

  return (
    notFound()
  )
  //return <Compare />
}

export default ComparePage