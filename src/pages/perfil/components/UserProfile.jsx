import React from "react";
import { useProfile } from "../hooks/useProfile";
import { useAuth } from "../../../core/auth/hooks/useAuth";
import EditIcon from "./EditIcon";
import ButtonVioletSM from "../../../components/buttons/ButtonVioletSM";
import ButtonBlueSM from "../../../components/buttons/ButtonBlueSM";
import { serviciosList } from "../../login/components/serviciosList";

const UserProfile = () => {
  const { user } = useAuth();
  const {
    convert_category,
    formData,
    handleEdit,
    handleChange,
    handleSubmit,
    handleCancel,
    editing,
  } = useProfile(user.uid);

  return (
    <div className="laptop1:ms-40 mt-3 rounded-tl-xl bg-White flex flex-col items-center pt-10 px-3">
      <div className="w-full bg-white rounded-lg shadow-lightShadowGrey max-w-[600px]">
        <div className="w-full bg-LightGreen text-White p-5 font-semiBold rounded-lg flex justify-between">
          <h1 className="text-xl">Mis datos:</h1>

          {!editing && (
            <button onClick={handleEdit}>
              <EditIcon width={"30px"} height={"30px"} />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-5">
          <div className="flex items-center">
            <p className="min-w-[50px] me-10">Nombre:</p>
            <input
              className={
                editing
                  ? "w-full bg-CardGrayLight p-2 rounded-lg shadow-lightShadowGrey"
                  : "w-full"
              }
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>
          <div className="flex pt-3">
            <p className="min-w-[50px] me-10">Apellido:</p>
            <input
              className={
                editing
                  ? "w-full bg-CardGrayLight p-2 rounded-lg shadow-lightShadowGrey"
                  : "w-full"
              }
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>
          <div className="flex pt-3">
            <p className="min-w-[50px] border-1 me-10">DNI:</p>
            <input
              className={
                editing
                  ? "w-full bg-CardGrayLight p-2 rounded-lg shadow-lightShadowGrey"
                  : "w-full"
              }
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>
          <div className="flex pt-3">
            <p className="min-w-[50px] me-10">Cell:</p>
            <input
              className={
                editing
                  ? "w-full bg-CardGrayLight p-2 rounded-lg shadow-lightShadowGrey"
                  : "w-full"
              }
              type="text"
              name="cell"
              value={formData.cell}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>
          <div className="flex items-center pt-3">
            <p className="max-w-[50px] me-10">Servicio:</p>
            {editing ? (
              <select
                name="servicio"
                value={formData.servicio} // Assuming you have state in your formData
                onChange={handleChange}
                className={`w-full rounded-lg shadow-lightShadowGrey shadow appearance-none px-5 py-2 mb-1 focus:outline-none focus:shadow-lightShadow`}
              >
                <option value="">Seleccione...</option>{" "}
                {/* Placeholder option */}
                {serviciosList.map((servicio, index) => (
                  <option key={index} value={servicio}>
                    {servicio}
                  </option>
                ))}
              </select>
            ) : (
              <p>{formData.servicio}</p>
            )}
          </div>
          <div className="flex pt-3">
            <p className="max-w-[50px] me-10">Categoría:</p>
            <input
              type="text"
              name="category"
              value={convert_category[formData.category]}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="flex pt-3">
            <p className="w-[50px] me-12">Email:</p>
            <input
            className="w-full"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
            />
          </div>
          {editing && (
            <div className="w-[220px] tablet:w-[300px] m-auto flex justify-between pt-10">
              <ButtonVioletSM
                onClick={handleCancel}
                type={"reset"}
                label={"Cancel"}
              />
              <ButtonBlueSM type={"submit"} label={"Guardar"} />
            </div>
          )}
        </form>
      </div>

      {/* Show more user information */}
    </div>
  );
};

export default UserProfile;
