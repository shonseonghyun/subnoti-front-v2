import { Avatar, Box, Button, IconButton, Menu, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useLocation ,useNavigate} from 'react-router';
import ProfileImg from 'src/assets/images/profile/user-1.jpg';
import { useAuthStore } from 'src/zustand/AuthUserInfo';
import * as dropdownData from './data';



const Profile = () => {
  const isLogin = useAuthStore((state) => !!state.authUserInfo.accessToken);
  const { clearAuthUserInfo } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const clickedLogout = () =>{
    clearAuthUserInfo();
    navigate(location.pathname);
  }

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={ProfileImg}
          alt={'ProfileImg'}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '240px',
            p: 0,
          },
        }}
      >
        {
          isLogin ?
          <div>
            <Box paddingX={2}>
              {dropdownData.profile.map((profile) => (
                <Box key={profile.title}>
                  <Box
                    sx={{
                      px: 2,
                      py: '10px',
                      '&:hover': {
                        backgroundColor: 'primary.light',
                      },
                    }}
                    className="hover-text-primary"
                  >
                    <Link to={profile.href}>
                      <Typography
                        variant="subtitle2"
                        fontWeight={500}
                        color="textPrimary"
                        className="text-hover" component='span'
                        noWrap
                        sx={{
                          width: '240px',
                        }}
                      >
                        {profile.title}
                      </Typography>
                    </Link>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box p={0}>
              <Box
                sx={{
                  px: 2,
                  py: '10px',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                  },
                }}
                className="hover-text-primary"
              >
                <Button variant="outlined" 
                color="primary" sx={{ width: "100%" }} onClick={clickedLogout}>
                  Logout
                </Button>
              </Box>
            </Box>
          </div>
          :
          <Box p={0}>
            <Box
              sx={{
                px: 2,
                py: '10px',
                '&:hover': {
                  backgroundColor: 'primary.light',
                },
              }}
              className="hover-text-primary"
            >
            <Button variant="outlined" component={Link} color="primary" sx={{ width: "100%" }} to={"/auth/login"}>
                Login
            </Button>
          </Box>
        </Box>

        }
      </Menu>
    </Box>
  );
};

export default Profile;
