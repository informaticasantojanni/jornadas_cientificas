import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

export const useJornadasNumero = () => {
  const [inscriptos, setInscriptos] = useState(0);
  const [trabajos, setTrabajos] = useState(0);
  const [disertantes, setDisertantes] = useState(0);
  const [conferencias, setConferencias] = useState(0);

  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger the animation only once
    threshold: 0.5, // Trigger when 50% of the component is visible
  });

  useEffect(() => {
    if (inView) {
      const counters = [
        {
          max: 450,
          stateSetter: setInscriptos,
        },
        {
          max: 100,
          stateSetter: setTrabajos,
        },
        {
          max: 50,
          stateSetter: setDisertantes,
        },
        {
          max: 4,
          stateSetter: setConferencias,
        },
      ];

      const duration = 2000; // Duration in milliseconds
      const intervals = [];

      counters.forEach(({ max, stateSetter }) => {
        let countStart = 0;
        const increment = max / (duration / 10);

        const interval = setInterval(() => {
          countStart += increment;
          if (countStart >= max) {
            clearInterval(interval);
            stateSetter(max);
          } else {
            stateSetter(Math.ceil(countStart));
          }
        }, 10);

        intervals.push(interval);
      });

      // Cleanup function to clear intervals when component unmounts
      return () => {
        intervals.forEach(clearInterval);
      };
    }
  }, [inView]);

  return {
    inscriptos,
    trabajos,
    disertantes,
    conferencias,
    ref,
  };
};
