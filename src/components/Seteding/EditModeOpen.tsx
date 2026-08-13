import { useState } from "react"
import { useUser } from "../../hooks/useUser"
import styles from './SetedingModal.module.css'
import { supabase } from "../../services/supabase/supabase"
import { validateName } from "../../utils/DashboardHelpers"

import { useActions } from "../../hooks/useActions"
import { MdCheck } from "react-icons/md";
import { useTranslation } from "react-i18next"

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

  const { t } = useTranslation()

  const updateUserData = async (
    firstName: string,
    lastName: string
  ) => {

    const control = validateName(value)

    if (!control) {
      props.setEditOpen("")
      dispatchActions({ type: "SET_ERROR", payload: t("editMode.errorData") })
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
      dispatchActions({ type: "SET_ERROR", payload: t("editMode.errorData") })
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
        payload: t("editMode.errorData"),
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
        payload: t("editMode.errorEmailReg"),
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
        payload: t("editMode.errorData"),
      });

      return;
    }

    if (value !== confirm) {
      dispatchActions({
        type: "SET_ERROR",
        payload: t("editMode.errorConfirmPassword"),
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
        payload: t("editMode.errorPass"),
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

        {props.mode === "name" && <h2 style={{ textAlign: "center" }}>{t("editMode.doneName")}</h2>}

        {props.mode === "surename" && <h2 style={{ textAlign: "center" }}>{t("editMode.doneSurname")}</h2>}

        {props.mode === "email" && <p style={{ textAlign: "center" }}>{t("editMode.doneEmail")}</p>}

        {props.mode === "password" && <p style={{ textAlign: "center" }}>{t("editMode.donePassword")}</p>}

        <button className='button' onClick={() => props.setEditOpen("")}>OK</button>

      </div>
    )
  }


  if (props.mode === "name") {

    return (
      <div>
        <h2>{t("editMode.nameTitle")}:</h2>
        <p style={{ textAlign: "left", paddingTop: "15px" }}>{t("editMode.nameSubtitle")}</p>
        <div className={styles.openEditColumn}>
          <input
            placeholder={t("editMode.namePlaceholder")}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text" />
          <button onClick={() => updateUserData(value, user?.user_metadata.surename)} className="button">{t("editMode.nameBtn")}</button>
        </div>
      </div>
    )
  }

  if (props.mode === "surename") {

    return (
      <div>
        <h2>{t("editMode.surnameTitle")}:</h2>
        <p style={{ textAlign: "left", paddingTop: "15px" }}>{t("editMode.surnameSubtitle")}</p>
        <div className={styles.openEditColumn}>
          <input
            placeholder={t("editMode.surnamePlaceholder")}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text" />
          <button onClick={() => updateUserData(user?.user_metadata.name, value)} className="button">{t("editMode.surnameBtn")}</button>
        </div>
      </div>
    )
  }

  if (props.mode === "email") {

    return (
      <div>
        <h2>{t("editMode.emailTitle")}:</h2>
        <p style={{ textAlign: "left", paddingTop: "15px" }}>{t("editMode.emailSubtitle")}</p>
        <div className={styles.openEditColumn}>
          <input
            placeholder={t("editMode.emailPlaceholder")}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text" />
          <button onClick={() => updateUserEmail(value)} className="button">{t("editMode.emailBtn")}</button>
        </div>
      </div>
    )
  }

  if (props.mode === "password") {

    return (
      <div>
        <h2 style={{ textAlign: "center" }}>{t("editMode.passwordTitle")}</h2>
        <p style={{ textAlign: "left", paddingTop: "30px" }}>{t("editMode.passwordSubtitle")}</p>

        <div className={styles.openEditColumn} style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <input
              placeholder={t("editMode.passwordPlaceholder1")}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text" />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <input
              placeholder={t("editMode.passwordPlaceholder2")}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              type="text" />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={() => updateUserPassword(value)} className="button">{t("editMode.passwordBtn")}</button>
          </div>
        </div>

      </div>
    )
  }
}