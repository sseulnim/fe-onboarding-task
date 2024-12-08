import "@testing-library/jest-dom";

declare module "jest-dom" {
  export interface Matchers<R> {
    toBeInTheDocument(): R;
    toHaveClass(className: string): R;
  }
}

declare global {
  let TextEncoder: typeof TextEncoder;
  let TextDecoder: typeof TextDecoder;
}

Object.defineProperties(globalThis, {
  TextEncoder: {
    value: TextEncoder,
  },
  TextDecoder: {
    value: TextDecoder,
  },
});

export {};
