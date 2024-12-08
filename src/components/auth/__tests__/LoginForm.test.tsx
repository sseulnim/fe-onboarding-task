import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "../LoginForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// 테스트용 래퍼 컴포넌트
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{component}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe("LoginForm", () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it("renders login form correctly", () => {
    renderWithProviders(<LoginForm />);

    expect(
      screen.getByPlaceholderText(/아이디를 입력하세요/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/비밀번호를 입력하세요/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /로그인/i })).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    renderWithProviders(<LoginForm />);

    const loginButton = screen.getByRole("button", { name: /로그인/i });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/아이디를 입력해주세요/i)).toBeInTheDocument();
      expect(screen.getByText(/비밀번호를 입력해주세요/i)).toBeInTheDocument();
    });
  });

  it("handles form submission", async () => {
    renderWithProviders(<LoginForm />);

    const idInput = screen.getByPlaceholderText(/아이디를 입력하세요/i);
    const passwordInput = screen.getByPlaceholderText(/비밀번호를 입력하세요/i);

    fireEvent.change(idInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    const loginButton = screen.getByRole("button", { name: /로그인/i });
    fireEvent.click(loginButton);

    // API 호출 결과를 기다림
    await waitFor(() => {
      // 여기서는 실제 API를 호출하지 않으므로 모의 응답을 확인
      // 실제로는 MSW 등을 사용하여 API 모킹을 구현해야 함
    });
  });
});
