'use server';

import { signIn, signOut } from '@/auth';
import sql from '@/app/lib/db';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { z } from 'zod';

const SignupSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Enter a valid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});

export type SignupState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function signup(
  prevState: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const validatedFields = SignupSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields.',
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return { message: 'An account with this email already exists.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
    `;
  } catch (error) {
    console.error(error);
    return {
      message:
        'Could not create account. Make sure the database is seeded (/seed).',
    };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/dashboard/overview',
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (error instanceof AuthError) {
      return {
        message: 'Account created, but sign-in failed. Please log in.',
      };
    }
    throw error;
  }

  return { message: null };
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/dashboard/overview',
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}
