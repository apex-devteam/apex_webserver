import { useTable, usePagination } from "react-table"
import PropTypes from 'prop-types'


const DefaultTable = ({columns, data}) => {
  const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      nextPage,
      previousPage,
      gotoPage,
      pageCount,
      pageOptions,
      setPageSize,
      state,
      canPreviousPage,
      canNextPage
  } = useTable({
      columns,
      data
  },
  usePagination
  )

  const { pageIndex, pageSize } = state

  return (
    <>
      <table {...getTableProps()} className="defaultTable">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th key={column.id} {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr key={row.id} {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td key={cell.column.id} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-between items-center">
        <div>
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
            {' '}
          </span>
          <span>
            | Go to page: {' '}
            <input 
              type='number' 
              defaultValue={pageIndex + 1} 
              onChange={event => {
                  const pageNumber = event.target.value ? Number(event.target.value) - 1 : 0
                  gotoPage(pageNumber)
              }}
              style={{width: "50px"}}
            />
          </span>
          <select value={pageSize} onChange={event => setPageSize(Number(event.target.value))}>
            {[10,25,50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button className="btn" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{`<<`}</button>
          <button className="btn ml-1" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
          <button className="btn mx-1" onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
          <button className="btn" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{`>>`}</button>
        </div>
      </div>
    </>
  );
}

DefaultTable.propTypes = {
    columns: PropTypes.object,
    data: PropTypes.object
}

export default DefaultTable