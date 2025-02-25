import { Typography } from '@mui/material'


const Header = () => {

  return (
    <>
      <Typography
        variant="h4"
        className="text-center font-extrabold text-gray-800 mb-6"
        sx={{ fontWeight: 600 }}
      >
        Survey Form
      </Typography>
    </>
  )
}

export default Header