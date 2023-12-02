import './App.css'
import MerchantAdmin from './components/MerchantAdmin'
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
import DeveloperAdmin from './components/DeveloperAdmin'
import DeveloperAdminTable from './components/DeveloperTable'

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
          path: '/merchant-administration',
          loader: async () => {
            const getMerchants = await merchantsService.getMerchants(users.id)
            console.log(getMerchants)
            return getMerchants;
          },
          element: <MerchantAdmin/>
        },
        {
          path: '/developer-administration',
          element: <DeveloperAdmin/>,
        },
        {
          path: "/developer-administration/create-new-account",
          element: <CreateAccountForm />
        },
        {
          path: "/developer-administration/developer-table",
          element: <DeveloperAdminTable/>,
          loader: async () => {
            return await merchantsService.getDeveloperAdminMerchants()
          }
        },
        {
          path: '/developer-administration/link-user',
          loader: async () => {
            const merchants = await merchantsService.getDeveloperAdminMerchants()
            const allUsers = await usersServer.getAllUsers()
            const allData = [merchants, allUsers]
            return allData
          },
          element: <LinkUser/>
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
