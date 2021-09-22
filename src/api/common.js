import service from "../../src/utils/request";

/**
 * 列表
 */
export function TableList(params) {
  return service.request({
    url: params.url,
    method: params.method || "post",
    data: params.data,
  });
}
/**
 * 删除
 */
export function Delete(params) {
  return service.request({
    url: params.url,
    method: params.method || "post",
    data: params.data,
  });
}
/**
 * 公共API
 */
export function requestData(params) {
  return service.request({
    url: params.url,
    method: params.method || "post",
    data: params.data,
  });
}
