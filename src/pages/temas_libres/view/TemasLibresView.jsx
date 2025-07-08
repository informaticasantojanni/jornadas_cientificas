import React from 'react'
import PagesBannerView from '../../../components/pagesBanner/view/PagesBannerView'
import InscripcionForm from '../components/InscripcionForm'

const TemasLibresView = () => {
    return (
        <div>
            <PagesBannerView title={"Trabajos Temas Libres"} />
            <section className="mt-3 rounded-tl-xl bg-White flex flex-col items-center px-3 py-10 laptop1:ms-40">
                <p className="p-10">Trabajos Temas Libres</p>
                <div className="w-[350px] tablet:w-[700px] laptop1:w-[800px]">
                    <InscripcionForm></InscripcionForm>
                </div>
            </section>
        </div>
    )
}

export default TemasLibresView