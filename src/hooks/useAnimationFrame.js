import { useRef, useCallback, useEffect } from "react";

export function useAnimationFrame(callback) {
    const reqRef = useRef();
    const prevRef = useRef();
    const cb = useCallback(callback, [callback]);
    useEffect(() => {
        const animate = (time) => {
            if (prevRef.current !== undefined) cb(time - prevRef.current);
            prevRef.current = time;
            reqRef.current = requestAnimationFrame(animate);
        };
        reqRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(reqRef.current);
    }, [cb]);
}
