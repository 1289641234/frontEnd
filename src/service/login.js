import { fetchService } from "./fetch";

export function login(userInfo) {
  const info = JSON.stringify(userInfo);

  return fetchService("/login", {
    method: "POST",
    body: info,
  });
}
