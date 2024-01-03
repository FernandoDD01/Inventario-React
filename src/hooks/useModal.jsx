import { useState } from "react";

export default function useModal(initialValue = false) {
  const [isActive, setIsActive] = useState(initialValue);

  const openModal = () => setIsActive(true);
  const closeModal = () => setIsActive(false);

  return [isActive, openModal, closeModal];
}
