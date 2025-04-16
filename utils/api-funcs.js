import axios from "axios"

const api = axios.create({
  baseURL: "https://rain-check-be.onrender.com/api/",
})

export const getUsers = () => {
  return api
    .get("/users")
    .then(({ data }) => data.users)
    .catch((error) => {
      console.error("Error fetching users:", error)
      throw error
    })
}

export const getEvents = (username) => {
  return api
    .get(`users/${username}/events`)
    .then(({ data }) => data.events_by_user)
    .catch((error) => {
      console.error("Error fetching events:", error)
      throw error
    })
}

export const postEvent = (eventData) => {
  return api
    .post(`/events`, eventData)
    .then(({ data }) => {
      return data.event
    })
    .catch((error) => {
      console.error("Error posting event:", error)
      throw error
    })
}

export const getEventByEventID = (event_id) => {
  return api
    .get(`/events/${event_id}`)
    .then(({ data }) => {
      return data.event[0]
    })
    .catch((error) => {
      console.error("Error fetching event:", error)
      throw error
    })
}

export const updateEvent = (event_id) => {
  return api
    .patch(`/events/${event_id}`)
    .then(({ data }) => {
      data.event
    })
    .catch((error) => {
      console.error("Error updating event:", error)
      throw error
    })
}
