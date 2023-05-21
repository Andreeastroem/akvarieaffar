import { SignIn } from "@clerk/nextjs/app-beta"

import { theme } from "../appearance"

export default async function LogIn() {
  return <SignIn signUpUrl="/konto/skapa" appearance={theme} />
}
