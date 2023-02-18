import { matchEmail } from "./matchEmail";
import { test, expect } from "vitest";

test.each([
  {
    email: "test@example.com",
    allowDomain: "@example.com",
    expected: true,
  },
  {
    email: undefined,
    allowDomain: "",
    expected: false,
  },
  {
    email: "test@test",
    allowDomain: "@example.com",
    expected: false,
  },
])(
  "matchSession($email, $allowDomain)",
  async ({ email, allowDomain, expected }) => {
    const [result] = matchEmail(email, allowDomain);
    expect(result).toEqual(expected);
  }
);
