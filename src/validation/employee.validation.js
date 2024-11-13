const { z } = require("zod");
const {
  ErrNameRequired,
  ErrNameMinLength,
  ErrNameMaxLength,
  ErrEmailRequired,
  ErrEmailInvalid,
  ErrPhoneRequired,
  ErrPhoneMinLength,
  ErrPhoneMaxLength,
  ErrSpecialtyTypeRequired,
  ErrStatusRequired,
} = require("../errors/employee.error");

const EmployeeSchema = z.object({
  id: z.number().optional(),
  name: z.string(ErrNameRequired).min(2, ErrNameMinLength).max(100, ErrNameMaxLength),
  description: z.string().optional(),
  email: z.string(ErrEmailRequired).email(ErrEmailInvalid),
  phone: z.string(ErrPhoneRequired).min(10, ErrPhoneMinLength).max(15, ErrPhoneMaxLength),
  specialtyType: z.string(ErrSpecialtyTypeRequired),
  status: z.string(ErrStatusRequired),
  hireDate: z.string().datetime().optional(),
  avatar: z.string().optional(),
  locationId: z.number().optional(),
});

const EmployeeCreateDTOSchema = EmployeeSchema.omit({ id: true });

const EmployeeUpdateDTOSchema = EmployeeCreateDTOSchema.partial();

const EmployeeCondDTOSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  specialtyType: z.string().optional(),
  status: z.string().optional(),
  locationId: z.number().optional(),
});

const EmployeeBookingCondDTOSchema = z.object({
  bookingTime: z.string().datetime(),
  duration: z.number().optional(),
});

const EmployeeFreeTimeCondDTOSchema = z.object({
  date: z.string().datetime(),
});

module.exports = {
  EmployeeSchema,
  EmployeeCreateDTOSchema,
  EmployeeUpdateDTOSchema,
  EmployeeCondDTOSchema,
  EmployeeBookingCondDTOSchema,
  EmployeeFreeTimeCondDTOSchema,
};
