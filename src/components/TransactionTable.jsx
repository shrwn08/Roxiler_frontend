const TransactionsTable = ({ data, totalPages, page, setPage, perPage, searchQuery }) => {
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const filteredData = data.filter(transaction => {
    const title = transaction.title.toLowerCase();
    const description = transaction.description.toLowerCase();
    const price = transaction.price.toString();
    return (
      title.includes(searchQuery.toLowerCase()) ||
      description.includes(searchQuery.toLowerCase()) ||
      price.includes(searchQuery)
    );
  });

  return (
    <div className="w-11/12">
      <table className="w-full min-h-40 border-1 mt-6 bg-[#FFDA78] rounded-md">
        <thead>
          <tr>
            <th className="border-1 pl-2">Id</th>
            <th className="border-1 pl-2">Title</th>
            <th className="border-1 pl-2">Description</th>
            <th className="border-1 pl-2">Price</th>
            <th className="border-1 pl-2">Category</th>
            <th className="border-1 pl-2">Sold</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((transaction) => (
              <tr key={transaction.id}>
                <td className="border-1 pl-2">{transaction._id}</td>
                <td className="border-1 pl-2">{transaction.title.substring(0, 20)}...</td>
                <td className="border-1 pl-2">{transaction.description.substring(0, 40)}...</td>
                <td className="border-1 pl-2">${transaction.price}</td>
                <td className="border-1 pl-2">{transaction.category}</td>
                <td className="border-1 pl-2">{transaction.sold ? "Sold" : "Not Sold"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Section */}
      <div className="w-full flex justify-between items-center mt-4">
        <div>Page No. {page}</div>
        <div className="w-36 flex justify-between items-center">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="px-2 py-1 bg-gray-300 rounded"
          >
            Previous
          </button>
          <span>-</span>
          <button
            onClick={handleNextPage}
            disabled={page >= totalPages}
            className="px-2 py-1 bg-gray-300 rounded"
          >
            Next
          </button>
        </div>
        <div>Items per page: {perPage}</div>
      </div>
    </div>
  );
};

export default TransactionsTable;
