import React from "react";

const Streaming = () => {

    const conferencias = [
        {id: '1', name: 'Conferencia 1', date: '12/11'},
        {id: '2', name: 'Conferencia 2', date: '13/11'},
        {id: '3', name: 'Conferencia 3', date: '14/11'},
        {id: '4', name: 'Conferencia 4', date: '15/11'},
    ]

  return (
    <div className="bg-PauBaseComponents ms-40">
      <div
        className="w-full h-[600px] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/sreaming_background.png')" }}
      >
        {/* You can add any additional content inside this div if needed */}
        <div className="h-full grid grid-cols-1 sm:grid-cols-4 gap-4 p-8">
          {conferencias.map((conferencia) => (
            <div
              key={conferencia.id}
              className="bg-Black bg-opacity-50 rounded-lg p-6 transition duration-300 ease-in-out transform hover:bg-White hover:bg-opacity-10
              flex flex-col justify-end"
            >
              <h3 className="text-White text-4xl font-semibold mb-4">{conferencia.name}</h3>
              <p className="text-sm text-White">
                {conferencia.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Streaming;
