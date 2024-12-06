// src/pages/LoginPage.tsx
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">로그인</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
