const roles = {
  roles: [
    {
      name: "admin",
      permissions: [
        "create_product",
        "read_product",
        "update_product",
        "delete_product",
        "delete_userprofile",
        "get_userprofile"
      ]
    },
    {
      name: "manager",
      permissions: [
        "get_userprofile",
        "read_product"
      ]
    },
    {
      name: "customer",
      permissions: [
        "create_userprofile",
        "read_userprofile",
        "update_userprofile"
      ]
    }
  ]
};

export default roles;