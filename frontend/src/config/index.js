export const registerFormControls = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "Enter Your First name",
    componentType: "input",
    type: "text",
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Enter Your Last name",
    componentType: "input",
    type: "text",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "Enter Your Phone Number",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Your Email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Your Password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Your Email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Your Password",
    componentType: "input",
    type: "password",
  },
];

export const productFormControls = [
  {
    name: "productName",
    label: "Product Name",
    placeholder: "Enter product name",
    componentType: "input",
    type: "text",
  },
  {
    name: "price",
    label: "Price",
    placeholder: "Enter product price",
    componentType: "input",
    type: "number",
  },
  {
    name: "discountPrice",
    label: "Discount Price (%)",
    placeholder: "Enter discount Price",
    componentType: "input",
    type: "number",
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Enter product description",
    componentType: "textarea",
    type: "text",
  },
  {
    name: "quantity",
    label: "Quantity",
    componentType: "quantity",
    type: "text",
  },
  {
    name: "inStock",
    label: "In Stock",
    componentType: "switch",
    defaultValue: true,
  },
];
