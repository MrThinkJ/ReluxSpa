const ErrDataNotFound = new Error("Data not found");
const ErrPagingInvalid = new Error("Paging Invalid");
const ErrDataAlreadyExist = new Error("Data already exist");
const ErrInvalidToken = new Error("Invalid token");

module.exports = {
  ErrDataNotFound,
  ErrPagingInvalid,
  ErrDataAlreadyExist,
  ErrInvalidToken,
};
