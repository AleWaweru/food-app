"use client"
import {SessionProvider} from "next-auth/react";

const AppProvider = ({children}) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default AppProvider;