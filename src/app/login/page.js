import LoginForm from "@/components/auth/LoginForm/LoginForm"

export default function Page() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}
