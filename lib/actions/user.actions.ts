"use server";

import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/db/prisma";
import { PaymentMethodType, ShippingAddress } from "@/types";
import { hashSync } from "bcrypt-ts-edge";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { formatError } from "../utils";
import {
  paymentMethodSchema,
  shippingAddressSchema,
  signInFormSchema,
  signUpFormSchema,
  updateUserSchema,
} from "../validators";
import { PAGE_SIZE } from "../constants";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Prisma } from "@prisma/client";

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    await signIn("credentials", user);

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: "Invalid email or password",
    };
  }
}

export async function signUpWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const { name, email, password } = user;
    const plainPassword = password;

    user.password = hashSync(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: user.password,
      },
    });

    await signIn("credentials", {
      email,
      password: plainPassword,
    });

    return {
      success: true,
      message: "user registered succesfully",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: formatError(error) };
  }
}

export async function signOutUser() {
  await signOut();
}

export async function getUserById(userId: string | undefined) {
  if (!userId) throw new Error("Id not correct");

  const user = await prisma.user.findFirst({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function updateUserAddress(data: ShippingAddress) {
  try {
    const session = await auth();

    const user = await getUserById(session?.user?.id);

    if (!user) throw new Error("User not found!");

    const address = shippingAddressSchema.parse(data);

    await prisma.user.update({
      where: { id: user.id },
      data: { address },
    });

    return { success: true, message: "Address updated succesfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export const updateUserPaymentMethod = async (data: PaymentMethodType) => {
  try {
    // Get user
    const session = await auth();
    const user = await getUserById(session?.user?.id);

    if (!user) throw new Error("User not found");

    const paymentMethod = paymentMethodSchema.parse(data);

    await prisma.user.update({
      where: { id: user.id },
      data: { paymentMethod: paymentMethod.type },
    });

    return { success: true, message: "Payment method updated succesfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};

// Update user profile
export async function updateProfile(user: { name: string; email: string }) {
  try {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    const currentUser = await getUserById(session?.user?.id);
    if (!currentUser) throw new Error("User not found");

    await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        name: user.name,
      },
    });
    return { success: true, message: "User updated succesfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Get all users

export async function getAllUsers({
  limit = PAGE_SIZE,
  page,
  query,
}: {
  limit?: number;
  page: number;
  query: string;
}) {
  console.log("query: ", query);

  const queryObject: Prisma.UserWhereInput =
    query && query !== "all"
      ? {
          name: {
            contains: query,
            mode: "insensitive",
          } as Prisma.StringFilter,
        }
      : {};

  const data = await prisma.user.findMany({
    skip: (page - 1) * limit,
    orderBy: { createdAt: "desc" },
    take: limit,
    where: queryObject,
  });

  const dataCount = await prisma.user.count();

  return { data, totalPages: Math.ceil(dataCount / limit) };
}

// Delete a user
export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id },
    });

    revalidatePath("/admin/users");
    return { success: true, message: "User deleted" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Update a user
export async function updateUser(user: z.infer<typeof updateUserSchema>) {
  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        role: user.role,
      },
    });

    revalidatePath("/admin/users");

    return { success: true, message: "User updated successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
