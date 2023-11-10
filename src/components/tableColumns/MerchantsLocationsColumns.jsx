import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


export const COLUMNS = [
    {
        Header: "Merchant ID",
        accessor: "merchants_id",
        // Cell:({cell}) => (
        //     // console.log(cell)
        //     <Link to={`/business-address-table/${cell.row.original.merchants_id}`}>{cell.value}</Link>
        // )
    },
    {
        Header: "Business Name",
        accessor: "merchant_name"
    },
    {
        Header: "Street Address",
        accessor: "street_address1",
        Cell: ({cell}) => (
            <Link to={`/business-address-table/${cell.row.original.merchants_id}`}>{cell.value}</Link>

        )
    },
    {
        Header: "City",
        accessor: "city"
    },
    {
        Header: "State",
        accessor: "state"
    },
    {
        Header: "Zip code",
        accessor: "zip_code"
    },
]

//COME BACK TO THIS.
COLUMNS.propTypes = {
    cell: PropTypes.isRequired
}