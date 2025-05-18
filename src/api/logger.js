export function validationError(request, h, error) {
  console.log(error.message);
  return h
    .response({
      success: false,
      statusCode: 400,
      error: "Bad Request",
      message: error.message,
    })
    .code(400)
    .takeover();
}
