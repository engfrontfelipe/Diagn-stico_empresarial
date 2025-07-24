import { LoginForm } from "@/components/ui/login-form";

export default function LoginPage() {
  return (
    <div
      className="min-h-svh bg-cover bg-center bg-no-repeat flex items-center justify-center p-6 md:p-10"
      style={{
        backgroundImage:
          "url('https://assinaturas.grovehost.com.br/StaticDicionary/bg_02.webp')",
      }}
    >
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="bg-slate-100/70 p-6 rounded-2xl relative z-10 flex w-full max-w-sm flex-col gap-6">
        <a
          href="#"
          className="flex flex-col items-center gap-2 self-center font-medium "
        >
          <div className="flex items-center justify-center rounded-md">
            <img
              src="https://assinaturas.grovehost.com.br/StaticDicionary/logConsulting.png"
              alt="Logo Grove"
              className="h-auto w-30 "
            />
          </div>
          Diagnóstico Empresarial v2.0
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
