import React, { useState } from "react"
import Alert from "./Alert"
import axios from "axios"

import { setToken } from "../utils"

const Signin = (props) => {
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  })

  const [alert, setAlert] = useState(false)
  const [alertMessage, setAllertMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setInputValues({
      ...inputValues,
      [name]: value,
    })
  }

  const redirectUser = (path) => {
    props.history.push(path)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (isFormEmpty()) {
      showAlert("Please fill all fields")
      return
    }
    setLoading(true)
    axios
      .post("http://localhost:1337/auth/local", {
        identifier: inputValues.username,
        password: inputValues.password,
      })
      .then((response) => {
        // Handle success.
        setLoading(false)
        setToken(response.data.jwt)
        showAlert(
          `Welcome back ${inputValues.username}! You are successfully logged in.`
        )
        setTimeout(() => {
          redirectUser("/")
        }, 3000)
      })
      .catch((error) => {
        // Handle error.
        showAlert(error.response)
        console.log("An error occurred:", error.response)
        setLoading(false)
      })
  }

  const isFormEmpty = () => {
    return !inputValues.username || !inputValues.password
  }

  const showAlert = (alertMessage) => {
    setAllertMessage(alertMessage)
    setAlert(true)

    setTimeout(() => {
      setAlert(false)
      setAllertMessage("")
    }, 4000)
  }

  return (
    <div className="flex flex-grow flex-col items-center w-full text-center">
      {/* LOG IN */}

      <form
        className="align-center my-auto sm:mx-10 sm:max-w-screen-sm md:max-w-screen-md w-11/12 lg:w-3/5 flex flex-col bg-gray-100 py-8 px-6 md:px-12 rounded-lg"
        onSubmit={handleSubmit}
      >
        <Alert show={alert} message={alertMessage} />
        <div className="mb-2 flex flex-col align-center">
          <h1 className="text-2xl my-2 font-medium text-gray-700 text-shadow">
            WELCOME BACK
          </h1>
        </div>
        {/* INPUT */}
        <label className="text-left text-gray-700 text-md italic">
          Username:
          <input
            className="rounded w-full text-md text-gray-700 px-4 py-2 mb-4 shadow"
            id="username"
            type="text"
            name="username"
            placeholder="i.e. John1990"
            onChange={handleChange}
          />
        </label>
        <label className="text-left text-gray-700 text-md italic">
          Password:
          <input
            className="rounded w-full text-md text-gray-700 px-4 py-2 mb-4 shadow"
            id="password"
            type="password"
            name="password"
            placeholder="your password"
            onChange={handleChange}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 mb-1 mx-4 md:mx-auto md:w-40 button-beep leading-none bg-purple-600 text-md text-white font-semibold py-2 px-8 rounded-full"
        >
          Submit
        </button>
      </form>
      {/* <div className="align-center flex flex-grow"></div> */}
    </div>
  )
}

export default Signin
