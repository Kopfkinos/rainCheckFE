import { useState, useEffect } from "react"

const useFetch = <T>(getFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      setError(null)

      const result = await getFunction()

      setData(result)
    } catch (err) {
      // @ts-ignore
      setError(err instanceof Error ? err : new Error("An error occured!"))
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setData(null)
    setLoading(false)
    setError(null)
  }

  useEffect(() => {
    if (autoFetch) {
      fetchData()
    }
  }, [getFunction])

  return { data, loading, error, refetch: fetchData, reset }
}

export default useFetch
