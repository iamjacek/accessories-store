import React, { useState } from "react"
import Alert from "./Alert"
import axios from "axios"
import { Link } from "react-router-dom"
import { setToken } from "../utils"

const Signup = (props) => {
  const [inputValues, setInputValues] = useState({
    username: "",
    email: "",
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
      .post("https://accessories.herokuapp.com/auth/local/register", {
        username: inputValues.username,
        email: inputValues.email,
        password: inputValues.password,
      })
      .then((response) => {
        // Handle success.
        setLoading(false)
        setToken(response.data.jwt)
        showAlert(`Success! You have been registered.`)
        setTimeout(() => {
          redirectUser("/")
        }, 4000)
      })
      .catch((error) => {
        // Handle error.
        showAlert(error.response)
        console.log("An error occurred:", error.response)
        setLoading(false)
      })
  }

  const isFormEmpty = () => {
    return !inputValues.username || !inputValues.email || !inputValues.password
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
    <div className="flex justify-center flex-grow w-full text-center">
      {/* SIGN UP */}

      <form
        className="align-center my-auto sm:mx-10 sm:max-w-screen-sm md:max-w-screen-md w-11/12 lg:w-3/5 flex flex-col bg-gray-100 py-8 px-6 md:px-12 rounded-lg"
        onSubmit={handleSubmit}
      >
        <Alert show={alert} message={alertMessage} />
        <div className="mb-2 flex flex-col align-center">
          <h1 className="text-2xl mt-4 mb-0 font-medium text-gray-700 text-shadow">
            LET'S GET STARTED
          </h1>
          <p className="mb-4 text-gray-700 flex justify-center font-medium text-sm text-shadow">
            Register to order phone accessories!
          </p>
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
          Email:
          <input
            className="rounded w-full text-md text-gray-700 px-4 py-2 mb-4 shadow"
            id="email"
            type="email"
            name="email"
            placeholder="your@mail.com"
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
          className="mt-4 mb-3 lg:mb-1 mx-4 md:mx-auto md:w-40 button-beep leading-none bg-purple-600 text-md text-white font-semibold py-2 px-8 rounded-full"
        >
          Submit
        </button>

        <p className="mb-4 text-gray-700 flex justify-center font-medium text-sm text-shadow whitespace-pre-wrap">
          Have account?{" "}
          <Link to="/signin" className="text-purple-600 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Signup
