import { z } from "zod";
import {
  ErrEmailInvalid,
  ErrFullNameAtLeast2Chars,
  ErrPasswordAtLeast6Chars,
  ErrPhoneInvalid,
  ErrUserNameAtLeast2Chars,
} from "./error";

export const UserSchema = z.object({
  id: z.number().optional(),
  username: z.string().min(2, { message: ErrUserNameAtLeast2Chars.message }),
  passwordHash: z.string().min(6, { message: ErrPasswordAtLeast6Chars.message }),
  roleId: z.number(),
  email: z.string().email({ message: ErrEmailInvalid.message }),
  phone: z.string().min(10, { message: ErrPhoneInvalid.message }),
  fullName: z.string().min(2, { message: ErrFullNameAtLeast2Chars.message }),
});
export type User = z.infer<typeof UserSchema>;

export const UserCondDTOSchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  fullName: z.string().optional(),
});
export type UserCondDTO = z.infer<typeof UserCondDTOSchema>;

export const UserCreateDTOSchema = UserSchema.omit({ id: true, passwordHash: true }).extend({
  password: z.string(),
});
export type UserCreateDTO = z.infer<typeof UserCreateDTOSchema>;

export const UserUpdateDTOSchema = z.object({
  phone: z.string().optional(),
  fullName: z.string().optional(),
});
export type UserUpdateDTO = z.infer<typeof UserUpdateDTOSchema>;

export const UserRegistrationDTOSchema = UserSchema.omit({ id: true, roleId: true, passwordHash: true }).extend({
  password: z.string().min(6, { message: ErrPasswordAtLeast6Chars.message }),
});
export type UserRegistrationDTO = z.infer<typeof UserRegistrationDTOSchema>;

export const UserLoginDTOSchema = UserSchema.pick({ username: true }).extend({
  password: z.string(),
});
export type UserLoginDTO = z.infer<typeof UserLoginDTOSchema>;
