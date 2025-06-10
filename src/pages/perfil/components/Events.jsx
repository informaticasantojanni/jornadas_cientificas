import React from 'react'
import { useEvents } from '../hooks/useEvents'
import { setRegistration } from '../../../services/firebase.services'

const Events = ({ userId }) => {
    const { events } = useEvents();

    const handleInscription = async (eventId, userId) => {
        console.log("Inscription in progress for user: ", userId, "en evento ", eventId)
        const res = await setRegistration(eventId, userId)
        res.status
            ? console.log("Registration status: ", res.status)
            : console.log("Registration failed with: ", res.error)
    }

    return (
        <div className='flex flex-col items-center'>
            {events?.map(event => (
                <div key={event.id} className='event-item'>
                    <p>{event.name}</p>
                    <button onClick={() => handleInscription(event.id, userId)}>
                        Inscribirte
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Events
