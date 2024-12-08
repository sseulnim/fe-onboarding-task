import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

declare global {
  interface JestMatchers<R> {
    toBeInTheDocument(): R;
    toHaveClass(className: string): R;
  }
}

if (!globalThis.TextEncoder) {
  Object.defineProperty(globalThis, "TextEncoder", {
    value: TextEncoder,
    writable: true,
    configurable: true,
  });

  Object.defineProperty(globalThis, "TextDecoder", {
    value: TextDecoder,
    writable: true,
    configurable: true,
  });
}

export {};
