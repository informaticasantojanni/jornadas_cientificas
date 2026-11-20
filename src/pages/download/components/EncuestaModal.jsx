import React, { useEffect } from "react";
import CloseIcon from "../../home/components/svgIcons/CloseIcon";
import {
    useEncuestaForm,
    OPCIONES_CALIFICACION,
    PREGUNTAS_SELECCION,
    PREGUNTAS_CALIFICACION,
    PREGUNTAS_ABIERTAS,
} from "../hooks/useEncuestaForm";

const EncuestaModal = ({ isOpen, onClose, onSuccess }) => {
    const { formData, errors, handleChange, handleSubmit, TEXTO_MAX_CARACTERES } =
        useEncuestaForm({ onSuccess });

    // Bloquea el scroll del body mientras el modal está abierto
    useEffect(() => {
        if (!isOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = prev; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        // z-40 para que el Spinner global (z-50) quede por encima al enviar
        <div className="fixed inset-0 flex items-center justify-center bg-Black bg-opacity-70 z-40 px-4">
            <div
                className="bg-White rounded-xl w-full max-w-[700px] max-h-[90vh] flex flex-col shadow-lg"
                role="dialog"
                aria-modal="true"
                aria-labelledby="encuesta-titulo"
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 p-5 border-b">
                    <h2 id="encuesta-titulo" className="text-xl font-bold text-Violet">
                        Encuesta sobre las XLI Jornadas Científicas del Hospital Donación Francisco Santojanni
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-Violet hover:text-LightViolet shrink-0"
                        aria-label="Cerrar encuesta"
                    >
                        <CloseIcon width={"30px"} />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
                    <div className="overflow-y-auto p-5 flex flex-col gap-6">
                        <p className="text-sm text-CardGrayDark">
                            Complete la encuesta para habilitar la descarga de su certificado.
                            Los campos marcados con <span className="text-Red">*</span> son obligatorios.
                        </p>

                        {PREGUNTAS_SELECCION.map(({ name, label, opciones }) => (
                            <div key={name} className="flex flex-col pb-5 border-b border-DarkGrey">
                                <label htmlFor={`encuesta-${name}`} className="w-auto block cursor-default font-semibold mb-2">
                                    {label} <span className="text-Red">*</span>
                                </label>
                                <select
                                    id={`encuesta-${name}`}
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    className="p-2 border border-VioletSoft rounded-md bg-White focus:outline-none focus:border-Violet"
                                >
                                    <option value="" disabled>Seleccione una opción</option>
                                    {Object.entries(opciones).map(([value, texto]) => (
                                        <option key={value} value={value}>{texto}</option>
                                    ))}
                                </select>
                                {errors[name] && <p className="text-Red text-sm mt-1">{errors[name]}</p>}
                            </div>
                        ))}

                        {PREGUNTAS_CALIFICACION.map(({ name, label }) => (
                            <fieldset key={name} className="pb-5 border-b border-DarkGrey last:border-b-0">
                                <legend className="font-semibold mb-3">
                                    {label} <span className="text-Red">*</span>
                                </legend>
                                <div className="flex flex-wrap gap-2">
                                    {OPCIONES_CALIFICACION.map((opcion) => {
                                        const checked = formData[name] === opcion;
                                        return (
                                            <label
                                                key={opcion}
                                                // w-auto / flex-row: anulan el estilo global de `label` en Hamburger.css
                                                className={`w-auto inline-flex flex-row items-center whitespace-nowrap select-none cursor-pointer px-4 py-1.5 rounded-full border text-sm transition
                                                    focus-within:ring-2 focus-within:ring-VioletSoft
                                                    ${checked
                                                        ? "bg-Violet text-White border-Violet"
                                                        : "bg-White text-Black border-VioletSoft hover:bg-VioletUltraLight"}`}
                                            >
                                                <input
                                                    type="radio"
                                                    name={name}
                                                    value={opcion}
                                                    checked={checked}
                                                    onChange={handleChange}
                                                    className="sr-only"
                                                />
                                                {opcion}
                                            </label>
                                        );
                                    })}
                                </div>
                                {errors[name] && <p className="text-Red text-sm mt-1">{errors[name]}</p>}
                            </fieldset>
                        ))}

                        {PREGUNTAS_ABIERTAS.map(({ name, label }) => (
                            <div key={name} className="flex flex-col">
                                <label htmlFor={`encuesta-${name}`} className="w-auto block cursor-default font-semibold mb-2">
                                    {label}
                                </label>
                                <textarea
                                    id={`encuesta-${name}`}
                                    name={name}
                                    rows={3}
                                    maxLength={TEXTO_MAX_CARACTERES}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    className="p-2 border border-VioletSoft rounded-md focus:outline-none focus:border-Violet resize-y"
                                />
                                {errors[name] && <p className="text-Red text-sm mt-1">{errors[name]}</p>}
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 p-5 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-1 rounded-full border border-Violet text-Violet hover:bg-VioletUltraLight transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-1 rounded-full bg-LightViolet text-White hover:bg-Violet hover:shadow-lg transition"
                        >
                            Enviar encuesta
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EncuestaModal;
