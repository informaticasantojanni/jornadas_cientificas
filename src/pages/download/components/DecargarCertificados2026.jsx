import React, { useState, useEffect } from 'react'
import { datos_certificados } from './datos_certificados_2026'
import ButtonVioletSM from '../../../components/buttons/ButtonVioletSM'
import { useGenerateCertificados2026 } from '../../perfil/hooks/useGenerateCertificados2026'
import Swal from "sweetalert2";
import SearhIcon from './SearchIcon';
import EncuestaModal from './EncuestaModal';

const ENCUESTA_STORAGE_KEY = "encuesta_jornadas_2026_completada";

const leerEncuestaCompletada = () => {
    try {
        return localStorage.getItem(ENCUESTA_STORAGE_KEY) === "true";
    } catch {
        return false;
    }
};

const DescargarCertificados2026 = () => {
    const { generateCertificado } = useGenerateCertificados2026()
    const [encuestaCompletada, setEncuestaCompletada] = useState(leerEncuestaCompletada)
    const [showEncuesta, setShowEncuesta] = useState(false)

    const handleEncuestaEnviada = () => {
        setEncuestaCompletada(true)
        setShowEncuesta(false)
        try {
            localStorage.setItem(ENCUESTA_STORAGE_KEY, "true")
        } catch {
            // sin storage: queda habilitado sólo en esta sesión
        }
    }
    const [filteredCertificados, setFilteredCertificados] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResult, setSearchResult] = useState("")

    const handleSearch = (e) => {
        e.preventDefault();

        if (searchTerm.length > 3) {
            const filtered = datos_certificados.filter(certificado =>
                Object.values(certificado).some(value =>
                    value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            setFilteredCertificados(filtered)
            setSearchTerm("")
            setSearchResult(filtered.length > 0 ? "" : "No se han encontrado registros")
        } else {
            Swal.fire({
                title: "Error",
                text: `Atención: Debe ingresar al menos 4 caracteres para ejecutar la búsqueda`,
                background: "#FAFAFA",
                color: "#025951",
                iconColor: "#FFC107",
                icon: "warning",
                allowOutsideClick: false, // No permite hacer clic fuera del modal
                allowEscapeKey: false, // No permite cerrar con la tecla Escape
                allowEnterKey: false, // No permite cerrar con la tecla Enter
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#038C7F",
            });
        }

    }



    return (
        <div className='flex flex-col items-center'>
            <h1 className="main-title text-center py-5">Descarga tu certificado 2026</h1>

            <div className="w-[330px] p-5 mb-10 bg-CardGrayLight rounded-xl">
                <form
                    className='flex justify-center'
                    onSubmit={handleSearch}>
                    <input
                        className='w-[200px] me-5 p-2 placeholder-CardGrayDark focus:outline-none'
                        type="text"
                        placeholder="Buscar por palabra clave..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        className="px-2 text-Black font-medium"
                        type="submit"><SearhIcon width={"30px"} /></button>
                </form>
            </div>

            <div className='w-full flex flex-col items-center'>

                {
                    filteredCertificados.length > 0 ?
                        filteredCertificados?.map((certificado, index) => (
                            <div
                                key={index}
                                className='w-[100%] laptop1:w-[75%] p-5 mb-5 border rounded-xl'>

                                <div className='pb-5'>
                                    {Object.entries(certificado).map(([key, value]) => (
                                        key != 'tipo' && (
                                            <p key={key}>
                                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                                            </p>
                                        )
                                    ))}
                                </div>
                                {!encuestaCompletada && (
                                    <p className="text-center text-sm text-CardGrayDark pb-3">
                                        Para descargar el certificado primero debe completar la encuesta.
                                    </p>
                                )}
                                <div className="flex flex-wrap justify-center gap-3">
                                    {!encuestaCompletada && (
                                        <button
                                            type="button"
                                            onClick={() => setShowEncuesta(true)}
                                            className="text-lg px-5 py-1 rounded-full border-2 border-LightViolet text-LightViolet hover:bg-VioletUltraLight transition duration-300 ease-in-out"
                                        >
                                            Completar encuesta
                                        </button>
                                    )}
                                    <ButtonVioletSM
                                        onClick={() => generateCertificado(certificado)}
                                        label={"Descargar"}
                                        disabled={!encuestaCompletada}
                                    />
                                </div>

                            </div>
                        ))
                        :
                        <p>{searchResult}</p>

                }
            </div>

            <EncuestaModal
                isOpen={showEncuesta}
                onClose={() => setShowEncuesta(false)}
                onSuccess={handleEncuestaEnviada}
            />

        </div>
    )
}


export default DescargarCertificados2026