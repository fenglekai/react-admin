import service from "../../src/utils/request";

/**
 * 新增部门
 */
export function DepartmentAddApi(data) {
  return service.request({
    url: "/department/add/",
    method: "post",
    data,
  });
}

/**
 * 部门列表
 */
export function GetList(data) {
  return service.request({
    url: "/department/list/",
    method: "post",
    data,
  });
}
