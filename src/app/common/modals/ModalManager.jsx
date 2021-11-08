import React from "react"
import { useSelector } from "react-redux"
import LoginForm from "../../../features/auth/Loginform"

export default function ModalManger() {
  const modalLookUp = {
    LoginForm,
  }
  const currentModal = useSelector((state) => state.modals)
  let renderedModal
  if (currentModal) {
    const { modalType, modalProps } = currentModal
    const ModalComponent = modalLookUp[modalType]
    renderedModal = <ModalComponent {...modalProps} />
  }

  return <span>{renderedModal}</span>
}
