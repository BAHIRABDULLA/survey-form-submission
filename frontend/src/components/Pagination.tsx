import Pagination from '@mui/material/Pagination';

interface PaginationProps {
    totalItems: number;
    currentPage: number;
    onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const BasicPagination: React.FC<PaginationProps> = ({ totalItems, currentPage, onPageChange }) => {
    return (
        <Pagination count={totalItems} page={currentPage} onChange={onPageChange} />
    );
}
export default BasicPagination