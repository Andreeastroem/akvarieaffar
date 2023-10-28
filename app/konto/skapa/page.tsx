import { SignUp } from "@clerk/nextjs"

import { theme } from "../appearance"

export default async function CreateAccount() {
  return <SignUp signInUrl="/konto/logga-in" appearance={theme} />
}
