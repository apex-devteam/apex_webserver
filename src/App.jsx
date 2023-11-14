
import './App.css'
import Administration from './components/Administrator'
import MerchantsLocationsTable from './components/MerchantsLocationsTable'
import HomePage from './components/HomePage'
import { useUserAuthContext } from "./providers/AuthProvider"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import merchantsService from './services/merchants'
import salesService from './services/sales';
import SalesTable from './components/SalesTable'
import HeaderLayout from './components/HeaderLayout'

const App = () => {
  const { users } = useUserAuthContext()
  console.log(users)
  const router = createBrowserRouter([
    {
      element: <HeaderLayout/>,
      children: [
        {
          path: '/',
          element: <HomePage />
        },
        {
          path: '/business-address-table',
          loader: async () => {
            return await merchantsService.getMerchants(users.id);
          },  
          
          // errorElement: <YOU SHOULD MAKE AN ERROR ELEMENT/>,
          element: <MerchantsLocationsTable/>
        },
        {
          path: "/business-address-table/:id",
          loader: async ({params}) => {
            const sales = await salesService.getSales(params.id)
            return sales
           },
          element: <SalesTable />
        },
        {
          path: '/administration',
          loader: async () => {
            return await merchantsService.getMerchants(users.id)
          },
          element: <Administration/>
        },

      ],
    }
  ]);

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
