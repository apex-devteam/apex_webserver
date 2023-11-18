import './App.css'
import Administration from './components/Administrator'
import MerchantsLocationsTable from './components/MerchantsLocationsTable'
import HomePage from './components/HomePage'
import { useUserAuthContext } from "./providers/AuthProvider"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import merchantsService from './services/merchants'
import usersServer from './services/users';
import salesService from './services/sales';
import SalesTable from './components/SalesTable'
import HeaderLayout from './components/HeaderLayout'
import ErrorPage from './components/ErrorPage'
import LinkUser from './components/LinkUser'
import CreateAccountForm from './components/CreateAccountForm'

const App = () => {
  const { users } = useUserAuthContext()
  // console.log(users)
  const router = createBrowserRouter([
    {
      element: <HeaderLayout/>,
      errorElement: <ErrorPage />,
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
          element: <MerchantsLocationsTable/>
        },
        {
          path: "/business-address-table/:id",
          loader: async ({params}) => {
            const sales = await salesService.getSales(params.id)
            if (sales.length === 0 || !sales) {
              throw Error("There seems to be no data associated with this!")
          }
            return sales
           },
          element: <SalesTable />,
          // errorElement: <ErrorPage />
        },
        {
          path: '/administration',
          loader: async () => {
            return await merchantsService.getMerchants(users.id)
          },
          element: <Administration/>
        },
        {
          path: '/link-user',
          loader: async () => {
            const merchants = await merchantsService.getMerchants(users.id)
            const allUsers = await usersServer.getAllUsers()
            const allData = [merchants, allUsers]
            return allData
          },
          element: <LinkUser/>
        },
        {
          path: "/create-new-account",
          element: <CreateAccountForm />
        }
      ],
    }
  ]);

  return (
    <div className="main-container">
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
