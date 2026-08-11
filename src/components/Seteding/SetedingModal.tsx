import { useState } from 'react';
import styles from './/SetedingModal.module.css'
import { useUser } from '../../hooks/useUser';
import { supabase } from '../../services/supabase/supabase';
import { useAccount } from '../../hooks/useAccount';
import { EditMode } from './EditMode';
import { MdCheck } from "react-icons/md";

type Props = {
  mode: string;
  setOpenModal: React.Dispatch<React.SetStateAction<string>>;

};



export const SetedingModal = (props: Props) => {

  const [security, setSecurity] = useState(true)

  const { user } = useUser()

  const { dispatchAccount, account } = useAccount()

  const [password, setPassword] = useState("")

  const verifyPassword = async () => {

    if (!user?.email) return;

    const { error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password,
    });

    if (error) {
      setPassword("")
      dispatchAccount({ type: "SET_ERROR", payload: "Error verify password" })
      props.setOpenModal("")
      return;
    }

    setSecurity(false)
  };


  if (security) {
    return (
      <div className={styles.overlay}>
        <div className={styles.errorBox}>

          <div className={styles.icon}>
            <h2>!</h2>
          </div>

          <h2>Verify Password</h2>

          <input
            placeholder='enter you password'
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="text" />

          <button
            onClick={() => verifyPassword()}
            className="button">
            Control
          </button>

        </div>
      </div>
    )
  }



  return (
    <div className={styles.overlay}>
      <div className={styles.errorBox}>

        {props.mode === "edit"
          ? <EditMode setOpenModal={props.setOpenModal} />
          :
          <div className={styles.pinBody}>

            <div className={styles.iconDone}>
              <h2><MdCheck color='white' /></h2>
            </div>

            <h2>You PIN code:</h2>
            <h2>{account.account?.PIN}</h2>


            <button className='button' onClick={() => props.setOpenModal("")}>OK</button>

          </div>
        }

      </div>
    </div>
  )

};