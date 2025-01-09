"use server";

export type FormState = {
  data?: {
    email?: string;
    password?: string;
  };
  errors?: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
  message?: string | null;
};

export async function submitLoginForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const errors: FormState["errors"] = {};

  if (data.email === "") {
    errors.email = ["Email is required."];
  } else if (!data.email.includes("@")) {
    errors.email = ["Email format is invalid."];
  }

  if (data.password === "") {
    errors.password = ["Password is required"];
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors: errors,
      message: "FAILED",
      data: data,
    };
  }
  try {
    //TODO: Check Login Credentials and Login
    return {
      message: "SUCCESS",
    };
  } catch (error) {
    return {
      errors: {
        _form: ["Something went wrong when saving the form."],
      },
      message: "FAILED",
      data: data,
    };
  }
}
