import { useState } from "react"
import { useUser } from "../../hooks/useUser"
import styles from './SetedingModal.module.css'
import { supabase } from "../../services/supabase/supabase"
import { validateName } from "../../utils/DashboardHelpers"

import { useActions } from "../../hooks/useActions"
import { MdCheck } from "react-icons/md";

type Props = {
  mode: string
  setEditOpen: React.Dispatch<React.SetStateAction<string>>;

}

export const EditModeOpen = (props: Props) => {

  const { user, loadUsers } = useUser()

  const { dispatchActions } = useActions()

  const [value, setValue] = useState("")

  const [confirm, setConfirm] = useState("")

  const [done, setDone] = useState(false)

  const updateUserData = async (
    firstName: string,
    lastName: string
  ) => {

    const control = validateName(value)

    if (!control) {
      props.setEditOpen("")
      dispatchActions({ type: "SET_ERROR", payload: "New data is not correcnted!" })
      return
    }


    const { error } = await supabase.auth.updateUser({
      data: {
        name: firstName,
        surename: lastName,
      },
    });

    if (error) {
      console.log(error)
      dispatchActions({ type: "SET_ERROR", payload: "New data is not correcnted!" })
    };

    setDone(true)
    loadUsers()
  }

  const updateUserEmail = async (value: string) => {

    const email = value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      props.setEditOpen("");
      dispatchActions({
        type: "SET_ERROR",
        payload: "New email is not correct!",
      });
      return;
    }

    const { error } = await supabase.auth.updateUser({
      email,
    });

    if (error) {
      console.log(error);

      dispatchActions({
        type: "SET_ERROR",
        payload: "This email is already being used in our system!",
      });

      return;
    }

    setDone(true);
    loadUsers();
  };

  const updateUserPassword = async (value: string) => {

    if (value.length < 6 || /\s/.test(value)) {
      props.setEditOpen("");

      dispatchActions({
        type: "SET_ERROR",
        payload: "New password is not correct!",
      });

      return;
    }

    if (value !== confirm) {
      dispatchActions({
        type: "SET_ERROR",
        payload: "Make sure the same password is entered in both fields!",
      });
      return
    }

    const { error } = await supabase.auth.updateUser({
      password: value,
    });

    if (error) {
      console.log(error);

      dispatchActions({
        type: "SET_ERROR",
        payload: "New password is not correct!",
      });

      return;
    }

    setDone(true);
    loadUsers();
  };

  if (done) {
    return (
      <div className={styles.pinBody}>

        <div className={styles.iconDone}>
          <h2><MdCheck color='white' /></h2>
        </div>

        {props.mode === "name" && <h2 style={{ textAlign: "center" }}>User data successfully updated!</h2>}

        {props.mode === "surename" && <h2 style={{ textAlign: "center" }}>User data successfully updated!</h2>}

        {props.mode === "email" && <p style={{ textAlign: "center" }}>To complete the email change, follow the link sent to your new email address.</p>}

        {props.mode === "password" && <p style={{ textAlign: "center" }}>The password has been successfully changed!</p>}

        <button className='button' onClick={() => props.setEditOpen("")}>OK</button>

      </div>
    )
  }


  if (props.mode === "name") {

    return (
      <div>
        <h2>Please enter the new desired name:</h2>
        <p style={{ textAlign: "left", paddingTop: "15px" }}>The name must not contain numbers or be shorter than two characters!</p>
        <div className={styles.openEditColumn}>
          <input
            placeholder="new name*"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text" />
          <button onClick={() => updateUserData(value, user?.user_metadata.surename)} className="button">edit</button>
        </div>
      </div>
    )
  }

  if (props.mode === "surename") {

    return (
      <div>
        <h2>Please enter the new desired surename:</h2>
        <p style={{ textAlign: "left", paddingTop: "15px" }}>The surename must not contain numbers or be shorter than two characters!</p>
        <div className={styles.openEditColumn}>
          <input
            placeholder="new surename*"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text" />
          <button onClick={() => updateUserData(user?.user_metadata.name, value)} className="button">edit</button>
        </div>
      </div>
    )
  }

  if (props.mode === "email") {

    return (
      <div>
        <h2>Please enter new email:</h2>
        <p style={{ textAlign: "left", paddingTop: "15px" }}>Your new email address must comply with email formatting rules.</p>
        <div className={styles.openEditColumn}>
          <input
            placeholder="new email*"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text" />
          <button onClick={() => updateUserEmail(value)} className="button">edit</button>
        </div>
      </div>
    )
  }

  if (props.mode === "password") {

    return (
      <div>
        <h2 style={{ textAlign: "center" }}>Please enter new password:</h2>
        <p style={{ textAlign: "left", paddingTop: "30px" }}>Your new password must be at least 6 characters long.</p>

        <div className={styles.openEditColumn} style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <input
              placeholder="new password*"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text" />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <input
              placeholder="confirm new password*"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              type="text" />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={() => updateUserPassword(value)} className="button">edit</button>
          </div>
        </div>

      </div>
    )
  }
}