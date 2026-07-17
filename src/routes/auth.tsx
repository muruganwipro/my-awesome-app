import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Dashboard" },
      { name: "description", content: "Sign in or create an account to access your dashboard." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) navigate({ to: "/", replace: true });
  }, [user, loading, navigate]);

  return (
    <main className="mx-auto flex w-full max-w-md flex-col px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">Welcome</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Sign in to your account or create a new one.
      </p>
      <Tabs defaultValue="signin" className="mt-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign in</TabsTrigger>
          <TabsTrigger value="signup">Sign up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <SignInForm onDone={() => router.invalidate()} />
        </TabsContent>
        <TabsContent value="signup">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </main>
  );
}

function SignInForm({ onDone }: { onDone: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Signed in");
    onDone();
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
      <Field label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" />
      <Field label="Password" type="password" value={password} onChange={setPassword} autoComplete="current-password" />
      <Button type="submit" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</Button>
    </form>
  );
}

function SignUpForm() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { display_name: displayName },
      },
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Account created. Check your inbox to confirm your email, then sign in.");
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
      <Field label="Display name" value={displayName} onChange={setDisplayName} autoComplete="name" />
      <Field label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" />
      <Field label="Password" type="password" value={password} onChange={setPassword} autoComplete="new-password" minLength={6} />
      <Button type="submit" disabled={busy}>{busy ? "Creating account…" : "Create account"}</Button>
    </form>
  );
}

function Field(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  minLength?: number;
}) {
  const id = props.label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{props.label}</Label>
      <Input
        id={id}
        type={props.type ?? "text"}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        autoComplete={props.autoComplete}
        minLength={props.minLength}
        required
      />
    </div>
  );
}
