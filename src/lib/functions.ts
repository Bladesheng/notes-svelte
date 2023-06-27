export function trimFormField(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export function validateStr(value: string, min = 1, max = Infinity) {
  if (value.length < min || value.length > max) {
    return false;
  }

  return true;
}

export function validateEmail(value: string) {
  return /^\S+@\S+\.\S+$/.test(value); // https://regexr.com/7g51q
}
