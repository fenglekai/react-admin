const router = [
  {
    title: "控制台",
    icon: "home",
    key: "/index",
  },
  {
    title: "用户管理",
    icon: "laptop",
    key: "/index/user",
    child: [
      {
        title: "用户列表",
        icon: "",
        key: "/index/user/list",
      },
      {
        title: "添加用户",
        icon: "",
        key: "/index/user/add",
      },
    ],
  },
  {
    title: "部门管理",
    icon: "bars",
    key: "/user/navigation",
    child: [
      {
        title: "部门列表",
        icon: "",
        key: "/home/navigation/dropdown",
      },
      {
        title: "添加部门",
        icon: "",
        key: "/home/navigation/menu",
      },
    ],
  },
  {
    title: "职位管理",
    icon: "edit",
    key: "/user/entry",
    child: [
      {
        title: "职位列表",
        icon: "",
        key: "/home/entry/form/basic-form",
      },
      {
        title: "添加职位",
        icon: "",
        key: "/home/entry/form/step-form",
      },
    ],
  },
  {
    title: "请假",
    icon: "info-circle-o",
    key: "/home/about",
  },
  {
    title: "加班",
    icon: "info-circle-o",
    key: "/home/abouta",
  },
];

export default router;
