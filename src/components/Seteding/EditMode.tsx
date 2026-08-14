import styles from './SetedingModal.module.css'


import { useUser } from '../../hooks/useUser'
import { useActions } from '../../hooks/useActions';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import closedIconWhite from '../../images/closedWhite.png'
import { EditModeOpen } from './EditModeOpen';
import { ErrorModal } from '../Error/ErrorModal';

type Props = {
  setOpenModal: React.Dispatch<React.SetStateAction<string>>;
}

export const EditMode = (props: Props) => {


  const { user } = useUser()

  const [editOpen, setEditOpen] = useState("")

  const { actions } = useActions()

  const { t } = useTranslation()


  return (
    <div className={styles.edit}>

      {actions.error && <ErrorModal message={actions.error} />}

      {!editOpen ?
        <div className={styles.editBody}>

          <div className={styles.closed}>
            <img onClick={() => props.setOpenModal("")} src={closedIconWhite} alt="#" />
          </div>

          <div className={styles.headerEdit}>
            <h2>{t("setedingModal.changeTitle")}</h2>
          </div>

          <div className={styles.editSectioins}>
            <h2> {t("seteding.name")}: {user?.user_metadata.name}</h2>
            <button onClick={() => setEditOpen("name")} className='button'>{t("setedingModal.changeBtn")}</button>
          </div>

          <div className={styles.editSectioins}>
            <h2> {t("seteding.surname")}: {user?.user_metadata.surename}</h2>
            <button onClick={() => setEditOpen("surename")} className='button'>{t("setedingModal.changeBtn")}</button>
          </div>


          <div className={styles.editSectioins}>
            <h2> {t("seteding.email")}: {user?.email}</h2>
            <button onClick={() => setEditOpen("email")} className='button'>{t("setedingModal.changeBtn")}</button>
          </div>

          <div className={styles.editSectioins}>
            <h2> {t("setedingModal.changePassword")}: </h2>
            <button onClick={() => setEditOpen("password")} className='button'>{t("setedingModal.changeBtn")}</button>
          </div>


        </div>
        : <EditModeOpen mode={editOpen} setEditOpen={setEditOpen} />
      }

    </div>
  )
}