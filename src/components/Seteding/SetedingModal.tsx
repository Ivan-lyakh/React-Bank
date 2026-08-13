import { useState } from 'react';
import styles from './/SetedingModal.module.css'
import { useUser } from '../../hooks/useUser';
import { supabase } from '../../services/supabase/supabase';
import { useAccount } from '../../hooks/useAccount';
import { EditMode } from './EditMode';
import { MdCheck } from "react-icons/md";
import { useTranslation } from 'react-i18next';

type Props = {
  mode: string;
  setOpenModal: React.Dispatch<React.SetStateAction<string>>;

};




export const SetedingModal = (props: Props) => {

  const [security, setSecurity] = useState(true)

  const { user } = useUser()

  const { dispatchAccount, account } = useAccount()

  const [password, setPassword] = useState("")

  const { t } = useTranslation()

  const verifyPassword = async () => {

    if (!user?.email) return;

    const { error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password,
    });

    if (error) {
      setPassword("")
      dispatchAccount({ type: "SET_ERROR", payload: t("setedingModal.errorPin") })
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

          <h2>{t("setedingModal.titlePin")}</h2>

          <input
            placeholder={t("setedingModal.placeholderPin")}
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="text" />

          <button
            onClick={() => verifyPassword()}
            className="button">
            {t("setedingModal.btnPin")}
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

            <h2>{t("setedingModal.youPin")}:</h2>
            <h2>{account.account?.PIN}</h2>


            <button className='button' onClick={() => props.setOpenModal("")}>OK</button>

          </div>
        }

      </div>
    </div>
  )

};