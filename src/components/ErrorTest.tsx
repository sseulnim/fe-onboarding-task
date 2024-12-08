import * as Sentry from "@sentry/react";

const ErrorTest = () => {
  const throwError = () => {
    throw new Error("의도적으로 발생시킨 에러");
  };

  const logError = () => {
    try {
      // 의도적으로 에러 발생
      throw new Error("로깅을 위한 테스트 에러");
    } catch (error) {
      Sentry.captureException(error);
      alert("에러가 발생하여 Sentry에 기록되었습니다.");
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={throwError}
        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
      >
        에러 발생시키기
      </button>
      <button
        onClick={logError}
        className="bg-orange-500 text-white px-4 py-2 rounded"
      >
        에러 로깅하기
      </button>
    </div>
  );
};

export default ErrorTest;
