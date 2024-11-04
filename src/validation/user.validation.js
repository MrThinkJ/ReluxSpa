const { z } = require("zod");

const UserSchema = z.object({
  id: z.number().optional(),
  username: z.string().min(2, { message: "Username must be at least 2 characters" }),
  passwordHash: z.string().min(6, { message: "Password must be at least 6 characters" }),
  roleId: z.number(),
  email: z.string().email({ message: "Email is invalid" }),
  phone: z.string().min(10, { message: "Phone must be at least 10 characters" }),
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
});
const UserCondDTOSchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  fullName: z.string().optional(),
});

const UserCreateDTOSchema = UserSchema.omit({ id: true, passwordHash: true }).extend({
  password: z.string(),
});

const UserRegistrationDTOSchema = UserSchema.omit({ id: true, roleId: true, passwordHash: true }).extend({
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});
const UserLoginDTOSchema = UserSchema.pick({ username: true }).extend({
  password: z.string(),
});

const UserUpdateDTOSchema = z.object({
  phone: z.string().optional(),
  fullName: z.string().optional(),
});

module.exports = {
  UserSchema,
  UserCondDTOSchema,
  UserCreateDTOSchema,
  UserRegistrationDTOSchema,
  UserLoginDTOSchema,
  UserUpdateDTOSchema,
};
