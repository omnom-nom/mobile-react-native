// eslint-disable
// this is an auto generated file. This will be overwritten

export const createDish = `mutation CreateDish($input: CreateDishInput!) {
  createDish(input: $input) {
    content
    cookId
    description
    foodType
    id
    images
    name
    time
    price
    spice
    status
  }
}
`;
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    email
    name
    phone
    type
  }
}
`;
export const deleteDish = `mutation DeleteDish($input: DeleteDishInput!) {
  deleteDish(input: $input) {
    content
    cookId
    description
    foodType
    id
    images
    name
    time
    price
    spice
    status
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
export const updateDish = `mutation UpdateDish($input: UpdateDishInput!) {
  updateDish(input: $input) {
    content
    cookId
    description
    foodType
    id
    images
    name
    time
    price
    spice
    status
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
