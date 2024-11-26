const ErrNameRequired = new Error("Name is required");
const ErrNameMinLength = new Error("Name must be at least 2 characters");
const ErrNameMaxLength = new Error("Name must be at most 100 characters");

const ErrEmailRequired = new Error("Email is required");
const ErrEmailInvalid = new Error("Email is invalid");

const ErrPhoneRequired = new Error("Phone is required");
const ErrPhoneMinLength = new Error("Phone must be at least 10 characters");
const ErrPhoneMaxLength = new Error("Phone must be at most 15 characters");

const ErrBookingTimeRequired = new Error("Booking time is required");
const ErrBookingTimeInvalid = new Error("Booking time is invalid");

const ErrServiceIdRequired = new Error("Service ID is required");
const ErrLocationIdRequired = new Error("Location ID is required");
const ErrEmployeeIdRequired = new Error("Employee ID is required");
const ErrPaymentMethodIdRequired = new Error("Payment method ID is required");
const ErrCustomerIdRequired = new Error("Customer ID is required");
const ErrEmployeeNotFound = new Error("Employee not found");
const ErrLocationNotFound = new Error("Location not found");
const ErrCustomerNotFound = new Error("Customer not found");
const ErrServiceNotFound = new Error("Service not found");
const ErrCustomerBookingOverlap = new Error("You already have a booking during this time slot");
const ErrEmployeeBookingOverlap = new Error("The selected employee is not available during this time slot");

module.exports = {
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
  ErrEmployeeNotFound,
  ErrLocationNotFound,
  ErrCustomerNotFound,
  ErrServiceNotFound,
  ErrCustomerBookingOverlap,
  ErrEmployeeBookingOverlap,
};
