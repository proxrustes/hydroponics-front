export const HTTP_RESPONSES = {
  200: (load?: any) => ({ status: 200, message: load ?? "" }),
  201: (load?: any) => ({ status: 200, message: load ?? "" }),
  400: (param: string) => ({
    status: 400,
    message: `Required parameter '${param}' is missing`,
  }),
  401: {
    status: 401,
    message:
      "No auth credentials provided. You are not allowed to access this information",
  },
  403: {
    status: 403,
    message: "Unauthorized. You are not allowed to access this information",
  },
  404: (param: string) => ({
    status: 404,
    message: `No '${param}' found`,
  }),

  409: (param: string) => ({
    status: 404,
    message: `'${param}' alrady exists`,
  }),
  422: (load?: any) => ({ status: 422, message: `Validation Error: ${load}` }),
  500: (e: any) => ({
    status: 500,
    message: `An internal error occurred: ${e}`,
  }),
};
