import { fetchService } from "./fetch";

export function getUserList() {
  //   const info = JSON.stringify(userInfo);

  return fetchService("/all/xian.usersinfo");
}
export function DelUserList(id) {
  //   const info = JSON.stringify(userInfo);

  return fetchService("/all/xian.usersinfo" + id, {
    method: "DELETE",
  });
}

export function getInfoList(table) {
  //   const info = JSON.stringify(userInfo);

  return fetchService("/all/xian." + table);
}
