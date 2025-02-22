import Pagination from '@mui/material/Pagination';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const BasicPagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const pageCount = Math.ceil(totalItems / itemsPerPage)
    return (
        <Pagination count={pageCount} page={currentPage} onChange={onPageChange}/>
    );
}
export default BasicPagination