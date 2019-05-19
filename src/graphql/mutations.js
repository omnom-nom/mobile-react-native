// eslint-disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    email
    name
    phone
    type
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    email
    name
    phone
    type
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    email
    name
    phone
    type
  }
}
`;
export const createDish = `mutation CreateDish($input: CreateDishInput!) {
  createDish(input: $input) {
    id
    cookId
    spice
    order
    foodType
    status
    price
    description
    content
    images
    name
  }
}
`;
export const updateDish = `mutation UpdateDish($input: UpdateDishInput!) {
  updateDish(input: $input) {
    id
    cookId
    spice
    order
    foodType
    status
    price
    description
    content
    images
    name
  }
}
`;
export const deleteDish = `mutation DeleteDish($input: DeleteDishInput!) {
  deleteDish(input: $input) {
    id
    cookId
    spice
    order
    foodType
    status
    price
    description
    content
    images
    name
  }
}
`;
