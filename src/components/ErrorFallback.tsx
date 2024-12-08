import * as Sentry from "@sentry/react";

interface FallbackProps {
  error?: Error;
  eventId?: string;
}

const ErrorFallback = ({ error, eventId }: FallbackProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-4">
          오류가 발생했습니다
        </h2>
        <p className="text-gray-600 text-center mb-4">
          {error?.message || "알 수 없는 오류가 발생했습니다."}
        </p>
        <div className="space-y-4">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            페이지 새로고침
          </button>
          <button
            onClick={() => Sentry.showReportDialog({ eventId })}
            className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            에러 리포트 작성
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
