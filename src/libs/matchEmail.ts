export const matchEmail = (
  email: string | undefined | null,
  allowDomain: string
): [false, string] | [true, undefined] => {
  if (!email) {
    return [false, "missing email"];
  }
  if (allowDomain && !~email.lastIndexOf(allowDomain)) {
    return [false, "email domain mismatch"];
  }
  return [true, undefined];
};
