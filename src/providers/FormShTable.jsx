/* eslint-disable react/prop-types */
import { useContext, useState, createContext } from "react"

export const AppContextForm = createContext()
export const AppContextTable = createContext()
export const useStateForm = () => useContext(AppContextForm)
export const useStateTable = () => useContext(AppContextTable)

export const FormShTable = ({ children }) => {
  const [stateForm, setStateForm] = useState({
    estado: 'oculto',
    acction: 'Editar',
    values: []
  });

  const [stateTable, setStateTable] = useState([]);

  return (
    <AppContextForm.Provider value={[stateForm, setStateForm]}>
      <AppContextTable.Provider value={[stateTable, setStateTable]}>
        {children}
      </AppContextTable.Provider>
    </AppContextForm.Provider>
  )
}
