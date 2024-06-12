/* eslint-disable react/prop-types */
import '../styles/NavbarLeft.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LIST_MENU = [
  {
    name: 'Inventario',
    subMenu: false,
    subItems: ['Productos', 'Ubicacion', 'Categorias', 'Entrada de Almacen', 'Salida de Almacen', 'Devolucion a Almacen'],
    linkPage: ['/products', '/location']
  },
  {
    name: 'Gastos',
    subMenu: false,
    subItems: ['Orden De Compra', 'Solicitud de Compra'],
    linkPage: ['/products']
  },
  {
    name: 'Cotizacion',
    subMenu: false,
    subItems: ['Cotizar', 'Impresoras', 'Lista de Precios', 'Lista de Procesos'],
    linkPage: ['/products']
  },
  {
    name: 'Contactos',
    subMenu: false,
    subItems: ['Proveedores', 'Proveedores de Servicio', 'Clientes'],
    linkPage: ['/products']
  }
]


export const NavBarLeft = () => {
  const [itemlist, setItemlist] = useState(LIST_MENU);

  const selectItems = (id) => {
    const listTemporal = itemlist
    const isOpenSubMenu = listTemporal[id].subMenu

    for (let index = 0; index < listTemporal.length; index++) {
      listTemporal[index].subMenu = false
    }
    if (!isOpenSubMenu) listTemporal[id].subMenu = true;
    setItemlist([...listTemporal])
  }

  return (
    <nav className='navbar-left'>
      <ul className='ul-nb-left'>
        {itemlist.map((items, x) => {
          return (
            <li onClick={() => { selectItems(x) }} key={x} className={items.subMenu ? 'li-nb-principal-select' : 'li-nb-principal'}>
              <div>
                <h3>{items.name}</h3>
              </div>
              <SubMenu
                visible={items.subMenu}
                subItems={items.subItems}
                linkPage={items.linkPage}
              />
            </li>
          )
        })}
      </ul>

    </nav>
  )
}

const SubMenu = ({ visible = false, subItems = [], linkPage = [] }) => {

  const navigate = useNavigate()

  const selectPage = (page) => {
    page ? navigate(page) : navigate('/dashboard');
  }

  if (!visible) {
    return (<></>)
  }
  return (
    <ul className='ul-nb-sublist'>
      {subItems.map((items, x) => {
        return (
          <li onClick={() => { selectPage(linkPage[x]) }} key={x} className='li-nb-sublist'>{items}</li>
        )
      })}
    </ul>
  )
}