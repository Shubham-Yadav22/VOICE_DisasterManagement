"use client"

import React, { createContext, useContext } from 'react'

type LanguageContextType = {
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  t: (key: string) => key
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const t = (key: string) => key // Simply return the key as the translation

  return (
    <LanguageContext.Provider value={{ t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 