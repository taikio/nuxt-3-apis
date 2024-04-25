export default defineEventHandler((event) => {
  const authHeader = getHeader(event, "Authorization");

  if (!authHeader || authHeader !== "Bearer xyz") {
    return sendError(
      event,
      createError({ statusCode: 401, statusMessage: "Unauthorized" })
    );
  }

  return [
    {
      id: 1,
      name: "Product 1",
      price: 100,
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
    },
  ];
});
