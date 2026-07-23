export type Form = {
  email: string,
  password: string,
  name: string,
  age: string
}

export type InitialState = {
  error: string,
  loading: boolean
  form: Form
}