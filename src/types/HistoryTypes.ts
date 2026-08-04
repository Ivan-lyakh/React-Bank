export type History = {
  id: number,
  created_at: string,
  type: string,
  sum: number,
  sender_name: string,
  sender_number: string,
  sender_id: string,
  recipient_read: boolean,
  recipient_number: string,
  message: string
}


export type InitialState = {
  error: string,
  loading: boolean,
  history: History[]
}