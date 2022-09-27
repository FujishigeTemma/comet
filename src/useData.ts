import { useCallback, useRef, useSyncExternalStore } from 'react'

export function useData<T>(url: string): T | undefined {
  const data$ = useRef<T>()

  const subscribe = useCallback(
    (onStoreChange: () => void): (() => void) => {
      const controller = new AbortController()

      fetch(url, { signal: controller.signal })
        .then(res => res.json())
        .then(data => {
          data$.current = data

          onStoreChange()
        })
        // eslint-disable-next-line no-console
        .catch(err => console.error(err))

      return () => {
        controller.abort()
      }
    },
    [url]
  )

  return useSyncExternalStore(subscribe, () => data$.current)
}
