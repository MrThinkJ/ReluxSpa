const { z } = require("zod");
const {
  ErrBookingTimeRequired,
  ErrBookingTimeInvalid,
  ErrLocationIdRequired,
  ErrEmployeeIdRequired,
  ErrCustomerIdRequired,
} = require("../errors/booking.error");

const BookingSchema = z.object({
  id: z.number().optional(),
  bookingTime: z.string(ErrBookingTimeRequired).datetime(ErrBookingTimeInvalid),
  bookingNotes: z.string().optional(),
  serviceIds: z.array(z.number()).optional(),
  locationId: z.number(ErrLocationIdRequired),
  employeeId: z.number(ErrEmployeeIdRequired),
  customerId: z.number(ErrCustomerIdRequired),
});

const BookingCreateDTOSchema = BookingSchema.omit({
  id: true,
});

const BookingUpdateDTOSchema = BookingCreateDTOSchema.omit({
  id: true,
  employeeId: true,
});

const BookingCondDTOSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  bookingTime: z.string().datetime().optional(),
  serviceIds: z.array(z.number()).optional(),
  locationId: z.number().optional(),
  employeeId: z.number().optional(),
  customerId: z.number().optional(),
});

module.exports = {
  BookingSchema,
  BookingCreateDTOSchema,
  BookingUpdateDTOSchema,
  BookingCondDTOSchema,
};
