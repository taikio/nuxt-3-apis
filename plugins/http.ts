import UserService from "@/services/user";

interface IHttp {
  user: UserService;
}

export default defineNuxtPlugin(() => {
  const fetcher = $fetch.create({
    baseURL: "/api",
    onRequest({ request, options }) {
      const authHeader = { Authorization: "Bearer xyz" };
      options.headers = Object.assign(authHeader, options.headers);
    },
  });

  const httpServices: IHttp = {
    user: new UserService(fetcher),
  };

  return {
    provide: {
      http: httpServices,
    },
  };
});
