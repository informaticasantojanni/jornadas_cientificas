import React from 'react'
const colaboradores = [
  { title: '', image: '/images/colaboradores/institucional_1.jpg' },
  { title: '', image: '/images/colaboradores/institucional_2.jpg' },
  { title: '', image: '/images/colaboradores/institucional_3.jpg' },
  { title: '', image: '/images/colaboradores/laboratorio_1.jpg' },
  { title: '', image: '/images/colaboradores/laboratorio_2.jpg' },
  { title: '', image: '/images/colaboradores/laboratorio_3.jpg' },
  { title: '', image: '/images/colaboradores/laboratorio_4.jpg' },
  { title: '', image: '/images/colaboradores/laboratorio_5.jpg' },
  { title: '', image: '/images/colaboradores/laboratorio_6.jpg' },
  // { title: '', image: '/images/colaboradores/laboratorio_7.jpg' },
  { title: '', image: '/images/colaboradores/laboratorio_8.jpg' },
  // { title: '', image: '/images/colaboradores/laboratorio_9.jpg' },
  { title: '', image: '/images/colaboradores/laboratorio_10.jpg' },
  { title: '', image: '/images/colaboradores/laboratorio_11.jpg' },
];

const Colaboran = () => {
  return (
    <section className="bg-White py-20 laptop1:ms-40 ">
      <div className='flex flex-col items-center px-3'>
      <h2 className="main-title text-center pb-10 relative z-10">
          Colaboran con las jornadas
        </h2>

        <div className="inner-container grid grid-cols-2 tablet:grid-cols-3 laptop1:grid-cols-6 laptop2:w-3/4 gap-6 mx-auto">
          {colaboradores.map((colaborador, index) => (
            <div key={index} className="bg-white rounded-lg p-5 shadow-lightShadowGrey hover:shadow-darkShadowGreen transition-shadow duration-200 flex flex-col justify-center items-center">
              <h3 className="text-xl font-semibold">{colaborador.title}</h3>
              <img src={colaborador.image}></img>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Colaboran
