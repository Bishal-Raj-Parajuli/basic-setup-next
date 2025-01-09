"use server";

export type FormState = {
  errors?: {
    fullName?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    _form?: string[];
  };
  message?: string | null;
  data?: {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
};

export async function submitSignupForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const data = {
    fullName: formData.get("fullName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const errors: FormState["errors"] = {};

  if (data.fullName === "") {
    errors.fullName = ["Full name is required"];
  }

  if (data.email === "") {
    errors.email = ["Email is required"];
  } else if (!data.email.includes("@")) {
    errors.email = ["Invalid email format."];
  }

  if (data.password === "") {
    errors.password = ["Password is required"];
  }
  if (data.confirmPassword === "") {
    errors.confirmPassword = ["Confirm password is required"];
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = ["Password doenot match."];
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors: errors,
      message: "FAILED",
      data: data,
    };
  }

  try {
    //TODO: Hash Password and save User Details
    return {
      message: "Success",
    };
  } catch (error) {
    return {
      errors: {
        _form: ["Something went wrong while saving form."],
      },
      message: "FAILED",
      data: data,
    };
  }
}
