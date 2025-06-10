import { useState, useEffect } from "react";
import { getUserById } from "../../../services/firebase.services";
import { useGlobal } from "../../../hooks/useGlobal";
import { useAuth } from "../../../core/auth/hooks/useAuth";
import { updateUserData } from "../../../services/firebase.services";

export const useProfile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const { setShowSpinner } = useGlobal();
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    dni: "",
    cell: "",
    servicio: "",
    category: "",
    email: "",
  });
  const [editing, setEditing] = useState(false);

  const convert_category = {
    bioquimico: "Bioquímico/a",
    estudiante: "Estudiante",
    enfermero: "Enfermero/a",
    farmaceutico: "Farmacéutico/a",
    kinesiologo: "Kinesiologo/a",
    medico: "Médico/a",
    residente: "Residente",
    trabajador_social: "Trabajador/a Social",
    otros: "Otros profesionales"
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user.uid) return;
      setShowSpinner(true);
      try {
        const res = await getUserById(user.uid);
        setUserData(res);
        setFormData({
          name: res?.name || "",
          lastName: res?.lastName || "",
          dni: res?.dni || "",
          cell: res?.cell || "",
          servicio: res?.servicio || "",
          category: res?.category || "",
          email: res?.email || "",
        });
      } catch (error) {
        console.log("Unable to retrieve user data");
      } finally {
        setShowSpinner(false);
      }
    };

    fetchUserData();
  }, [user.uid]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setShowSpinner(true);
      // TODOS: Check user.uid and formData are not empty
      const responseUpdateUserData = await updateUserData(user.uid, formData);
      if (!responseUpdateUserData.status)
        throw new Error(responseUpdateUserData.error);
    } catch (error) {
      console.log(error);
    } finally {
      setEditing(false);
      setShowSpinner(false);
    }
  };



  return {
    convert_category,
    userData,
    formData,
    handleChange,
    handleSubmit,
    editing,
    handleEdit,
    handleCancel,
  };
};
