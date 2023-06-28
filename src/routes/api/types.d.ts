export type FormDataErrors = {
  desc?: string;
  name?: string;
  password?: string;
  email?: string;
};

export type FormData = {
  name?: string;
  email?: string;

  errors?: FormDataErrors;
};
