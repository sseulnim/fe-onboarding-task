import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodoListPage from "../TodoListPage";
import { todoAPI } from "@/services/todoApi";

// jest.mock을 먼저 선언하고, 구현은 나중에 하는 방식으로 변경
jest.mock("@/services/todoApi", () => ({
  todoAPI: {
    getTodos: jest.fn(),
  },
}));

const mockTodos = [
  { id: 1, userId: 1, title: "Test Todo 1", completed: false },
  { id: 2, userId: 1, title: "Test Todo 2", completed: true },
];

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

describe("TodoListPage", () => {
  beforeEach(() => {
    queryClient.clear();
    // 각 테스트 전에 mock 구현을 설정
    (todoAPI.getTodos as jest.Mock).mockResolvedValue(mockTodos);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders todo list correctly", async () => {
    renderWithProviders(<TodoListPage />);

    // 로딩 상태 확인
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // 데이터 로드 후 상태 확인
    await waitFor(() => {
      expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
      expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
    });
  });

  it("displays completed status correctly", async () => {
    renderWithProviders(<TodoListPage />);

    await waitFor(() => {
      const completedTodo = screen.getByText(/Test Todo 2/);
      expect(completedTodo).toHaveClass("line-through");
    });
  });
});
