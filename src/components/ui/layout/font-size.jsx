// context/FontSizeContext.jsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

const xLSIZES = [ 
  "text-2xl",
  "text-3xl",
  "text-4xl"
];

const xL3SIZES = [ 
  "text-3xl",
  "text-4xl",
  "text-5xl"
];

const xL4SIZES = [ 
  "text-4xl",
  "text-5xl",
  "text-6xl"
];

const xL5SIZES = [ 
  "text-5xl",
  "text-6xl",
  "text-7xl"
];

const xL6SIZES = [ 
  "text-6xl",
  "text-7xl",
  "text-7xl"
];

const SMSIZES = [ 
  "text-sm",
  "text-base",
  "text-lg"
];

const SM2SIZES = [ 
  "text-base",
  "text-lg",
  "text-2xl"
];

const XSSIZES = [ 
  "text-xs",
  "text-sm",
  "text-base"
];

const LGSIZES = [ 
  "text-lg",
  "text-2xl",
  "text-3xl"
];

const FontSizeContext = createContext(undefined);

export function FontSizeProvider({ children }) {
  const [level, setLevel] = useState(0); // índice 0 = ${XlfontClass}

  // Persiste a preferência do usuário
  useEffect(() => {
    const saved = localStorage.getItem("fontSizeLevel");
    if (saved) setLevel(Number(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("fontSizeLevel", String(level));
  }, [level]);

  const increase = () => setLevel((l) => Math.min(l + 1, xLSIZES.length - 1));
  const decrease = () => setLevel((l) => Math.max(l - 1, 0));

  return (
    <FontSizeContext.Provider
      value={{
        level,
        XlfontClass: xLSIZES[level],
        Xl3fontClass: xL3SIZES[level],
        Xl4fontClass: xL4SIZES[level],
        Xl5fontClass: xL5SIZES[level],
        Xl6fontClass: xL6SIZES[level],
        smfontClass: SMSIZES[level],
        sm2fontClass: SM2SIZES[level],
        XsfontClass: XSSIZES[level],
        lgfontClass: LGSIZES[level],
        increase,
        decrease,
        canIncrease: level < xLSIZES.length - 1,
        canDecrease: level > 0,
      }}
    >
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  const ctx = useContext(FontSizeContext);
  if (!ctx) throw new Error("useFontSize deve ser usado dentro de FontSizeProvider");
  return ctx;
}