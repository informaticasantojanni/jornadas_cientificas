import { useState, useEffect } from "react"
import { getAllEvents } from "../../../services/firebase.services";

export const useEvents = () => {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState();

    useEffect(() => {
        const fetchAllEvents = async () => {

            try {
                const res = await getAllEvents()
                console.log("Events list: ", res)
                const availableEvents = res.filter(event => event.inscriptionState === true)             
                setEvents(availableEvents)
            } catch (error) {
                console.log8
            } finally {
                setLoading(false)
            }
        }

        fetchAllEvents();
    }, [])





    return { loading, events }
}