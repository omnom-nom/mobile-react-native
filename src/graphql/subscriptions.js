// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateDish = `subscription OnCreateDish($cookId: ID, $id: ID) {
  onCreateDish(cookId: $cookId, id: $id) {
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
export const onCreateUser = `subscription OnCreateUser(
  $email: AWSEmail
  $name: String
  $phone: AWSPhone
  $type: String
) {
  onCreateUser(email: $email, name: $name, phone: $phone, type: $type) {
    email
    name
    phone
    type
  }
}
`;
export const onDeleteDish = `subscription OnDeleteDish($cookId: ID, $id: ID) {
  onDeleteDish(cookId: $cookId, id: $id) {
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
export const onDeleteUser = `subscription OnDeleteUser(
  $email: AWSEmail
  $name: String
  $phone: AWSPhone
  $type: String
) {
  onDeleteUser(email: $email, name: $name, phone: $phone, type: $type) {
    email
    name
    phone
    type
  }
}
`;
export const onUpdateDish = `subscription OnUpdateDish($cookId: ID, $id: ID) {
  onUpdateDish(cookId: $cookId, id: $id) {
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
export const onUpdateUser = `subscription OnUpdateUser(
  $email: AWSEmail
  $name: String
  $phone: AWSPhone
  $type: String
) {
  onUpdateUser(email: $email, name: $name, phone: $phone, type: $type) {
    email
    name
    phone
    type
  }
}
`;
