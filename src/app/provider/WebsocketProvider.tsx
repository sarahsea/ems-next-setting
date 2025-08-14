'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type WsCtx = {
  socket: WebSocket | null;
  status: 'idle' | 'connecting' | 'open' | 'closed';
  send: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void;
};
const WebSocketContext = createContext<WsCtx | null>(null);
// function useWs() {
//   const ctx = useContext(WebSocketContext);
//   if (!ctx) throw new Error("WebSocketContext missing");
//   return ctx;
// }

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const url = process.env.NEXT_PUBLIC_WS_URL ?? 'ws://localhost:3001/ws';

  const [status, setStatus] = useState<WsCtx['status']>('idle');
  const ref = useRef<WebSocket | null>(null);
  const retryRef = useRef(0);

  useEffect(() => {
    let alive = true;

    function connect() {
      setStatus('connecting');
      const ws = new WebSocket(url);
      ref.current = ws;

      ws.onopen = () => {
        retryRef.current = 0;
        if (!alive) return;
        setStatus('open');
      };

      ws.onmessage = (event) => {
        // Example: integrate with react-query cache here
        // const msg = JSON.parse(event.data);
        // queryClient.setQueryData([...], updater)
      };

      ws.onclose = () => {
        if (!alive) return;
        setStatus('closed');
        // Exponential backoff (cap at ~10s)
        const delay = Math.min(10000, 500 * 2 ** retryRef.current++);
        setTimeout(connect, delay);
      };

      ws.onerror = () => {
        ws.close();
      };
    }

    connect();
    return () => {
      alive = false;
      ref.current?.close();
      ref.current = null;
    };
  }, [url]);

  const value = useMemo<WsCtx>(
    () => ({
      socket: ref.current,
      status,
      send: (data) =>
        ref.current?.readyState === WebSocket.OPEN && ref.current.send(data),
    }),
    [status],
  );

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
}
