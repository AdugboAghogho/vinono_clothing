"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
// We have to extract the props type to avoid TypeScript errors
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
