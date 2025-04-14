const axios = require("axios").default

const api = axios.create({
  baseURL: "https://rain-check-be-334cee29484f.herokuapp.com/api",
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
    .get(`/${username}/events`)
    .then(({ data }) => data.events)
    .catch((error) => {
      console.error("Error fetching events:", error)
      throw error
    })
}

export const postEvent = () => {
  return api
    .post("/events")
    .then(({ data }) => data.events)
    .catch((error) => {
      console.error("Error posting event:", error)
      throw error
    })
}

export const getEventByEventID = () => {
  return api
    .get(`/events/${event_id}`)
    .then(({ data }) => data.event)
    .catch((error) => {
      console.error("Error fetching event:", error)
      throw error
    })
}

export const updateEvents = (event_id) => {
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
