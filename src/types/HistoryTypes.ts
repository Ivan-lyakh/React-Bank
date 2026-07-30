export type History = {
  id: number,
  created_at: string,
  type: string,
  sum: number,
  sender_name: string,
  sender_number: string,
  sender_id: string , 
  status: boolean,
  recipient_number: string , 
}


export type InitialState = {
  error: string,
  loading: boolean,
  history: History[] 
}