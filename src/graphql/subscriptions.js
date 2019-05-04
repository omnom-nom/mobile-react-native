// eslint-disable
// this is an auto generated file. This will be overwritten

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
