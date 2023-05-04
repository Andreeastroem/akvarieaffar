import { SignUp } from "@clerk/nextjs/app-beta";
import { theme } from "../appearance";

export default async function CreateAccount() {
  return <SignUp signInUrl="/konto/logga-in" appearance={theme} />;
}
