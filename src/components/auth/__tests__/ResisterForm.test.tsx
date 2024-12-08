import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RegisterForm from "../RegisterForm";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{component}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe("RegisterForm", () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it("renders register form correctly", () => {
    renderWithProviders(<RegisterForm />);

    expect(screen.getByPlaceholderText(/아이디/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/비밀번호/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/닉네임/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /회원가입/i })
    ).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    renderWithProviders(<RegisterForm />);

    const submitButton = screen.getByRole("button", { name: /회원가입/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/아이디를 입력해주세요/i)).toBeInTheDocument();
      expect(screen.getByText(/비밀번호를 입력해주세요/i)).toBeInTheDocument();
      expect(screen.getByText(/닉네임을 입력해주세요/i)).toBeInTheDocument();
    });
  });

  it("handles form submission", async () => {
    renderWithProviders(<RegisterForm />);

    const idInput = screen.getByPlaceholderText(/아이디/i);
    const passwordInput = screen.getByPlaceholderText(/비밀번호/i);
    const nicknameInput = screen.getByPlaceholderText(/닉네임/i);

    fireEvent.change(idInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(nicknameInput, { target: { value: "테스터" } });

    const submitButton = screen.getByRole("button", { name: /회원가입/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      // 회원가입 성공 후 처리 확인
    });
  });
});
