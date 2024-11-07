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
  ErrBookingTimeRequired,
  ErrBookingTimeInvalid,
  ErrServiceIdRequired,
  ErrLocationIdRequired,
  ErrEmployeeIdRequired,
  ErrPaymentMethodIdRequired,
  ErrCustomerIdRequired,
} = require("../errors/booking.error");

const BookingSchema = z.object({
  id: z.number().optional(),
  name: z.string(ErrNameRequired).min(2, ErrNameMinLength).max(100, ErrNameMaxLength),
  email: z.string(ErrEmailRequired).email(ErrEmailInvalid),
  phone: z.string(ErrPhoneRequired).min(10, ErrPhoneMinLength).max(15, ErrPhoneMaxLength),
  bookingTime: z.string(ErrBookingTimeRequired).datetime(ErrBookingTimeInvalid),
  bookingNotes: z.string().optional(),
  serviceId: z.number(ErrServiceIdRequired),
  locationId: z.number(ErrLocationIdRequired),
  employeeId: z.number(ErrEmployeeIdRequired),
  paymentMethodId: z.number(ErrPaymentMethodIdRequired),
  customerId: z.number(ErrCustomerIdRequired),
});

const BookingCreateDTOSchema = BookingSchema.omit({
  id: true,
});

const BookingUpdateDTOSchema = BookingCreateDTOSchema.partial();

const BookingCondDTOSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  bookingTime: z.string().datetime().optional(),
  serviceId: z.number().optional(),
  locationId: z.number().optional(),
  employeeId: z.number().optional(),
  paymentMethodId: z.number().optional(),
  customerId: z.number().optional(),
});

module.exports = {
  BookingSchema,
  BookingCreateDTOSchema,
  BookingUpdateDTOSchema,
  BookingCondDTOSchema,
};
