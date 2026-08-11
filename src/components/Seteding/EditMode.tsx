
import { useUser } from '../../hooks/useUser'
import styles from './SetedingModal.module.css'
import closedIconWhite from '../../images/closedWhite.png'
import { useState } from 'react';
import { EditModeOpen } from './EditModeOpen';
import { ErrorModal } from '../Error/ErrorModal';
import { useActions } from '../../hooks/useActions';

type Props = {
  setOpenModal: React.Dispatch<React.SetStateAction<string>>;
}

export const EditMode = (props: Props) => {



  const { user } = useUser()

  const [editOpen, setEditOpen] = useState("")

  const { actions } = useActions()


  return (
    <div className={styles.edit}>

      {actions.error && <ErrorModal message={actions.error} />}

      {!editOpen ?
        <div className={styles.editBody}>

          <div className={styles.closed}>
            <img onClick={() => props.setOpenModal("")} src={closedIconWhite} alt="#" />
          </div>

          <div className={styles.headerEdit}>
            <h2>Edit details</h2>
          </div>

          <div className={styles.editSectioins}>
            <h2> name: {user?.user_metadata.name}</h2>
            <button onClick={() => setEditOpen("name")} className='button'>edit</button>
          </div>

          <div className={styles.editSectioins}>
            <h2> surename: {user?.user_metadata.surename}</h2>
            <button onClick={() => setEditOpen("surename")} className='button'>edit</button>
          </div>


          <div className={styles.editSectioins}>
            <h2> email: {user?.email}</h2>
            <button onClick={() => setEditOpen("email")} className='button'>edit</button>
          </div>

          <div className={styles.editSectioins}>
            <h2> change password: </h2>
            <button onClick={() => setEditOpen("password")} className='button'>change</button>
          </div>


        </div>
        : <EditModeOpen mode={editOpen} setEditOpen={setEditOpen} />
      }

    </div>
  )
}