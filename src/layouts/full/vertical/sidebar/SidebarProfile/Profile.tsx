import { Avatar, Box, IconButton, Typography } from '@mui/material';
import SidebarProfileBgImg from 'src/assets/images/backgrounds/sidebar-profile-bg.jpg';
import ProfileImg from 'src/assets/images/profile/user-1.jpg';
import { useAuthStore } from 'src/zustand/AuthUserInfo';

export const Profile = () => {
  const { authUserInfo, isLogin} = useAuthStore.getState();

  return (
    <Box
      sx={{
        backgroundImage: `url(${SidebarProfileBgImg})`,
        borderRadius: '0 !important',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
      }}
    >
      <>
        <Box
          py="28px"
          borderRadius="0 !important"
          sx={{
            px: '30px',
          }}
        >
          <Box className="profile-img" position="relative">
            <Avatar alt="Remy Sharp" src={ProfileImg} sx={{ height: 50, width: 50 }} />
          </Box>
        </Box>
        <IconButton
          aria-haspopup="true"
          size="small"
          aria-label="action"
          sx={{ p: 0, width: '100%' ,cursor:"default"}}
        >
          { <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                py: '4px',
                px: 2,
                bgcolor: 'rgba(0,0,0,0.5)',
                borderRadius: '0 !important',
                width: '100%',
            }}
          >
            <Typography
              variant="h5"
              fontSize="15px"
              color="white"
              fontWeight="400"
              sx={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              {isLogin ? `${authUserInfo.name} 님` : "게스트 님"}
            </Typography>
            {/* <Box>
              <Tooltip title="User" placement="top">
                <Box color="white" sx={{ p: 0 }}>
                  <IconCaretDownFilled width={18} />
                </Box>
              </Tooltip>
            </Box> */}
          </Box>
          }
        </IconButton>

        {/* <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} disableRipple>
            <Box color="primary.main" display="flex" alignItems="center">
              <Icon icon="solar:user-circle-line-duotone" height={22} />
            </Box>
            <Typography fontSize="15px" ml={1}>
              My Profile
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <Box color="secondary.main" display="flex" alignItems="center">
              <Icon icon="solar:notes-line-duotone" height={21} />
            </Box>
            <Typography fontSize="15px" ml={1}>
              My Notes
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <Box color="success.main" display="flex" alignItems="center">
              <Icon icon="solar:inbox-line-line-duotone" height={21} />
            </Box>
            <Typography fontSize="15px" ml={1}>
              Inbox
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose} disableRipple>
            <Box color="warning.main" display="flex" alignItems="center">
              <Icon icon="solar:settings-line-duotone" height={21} />
            </Box>
            <Typography fontSize="15px" ml={1}>
              Account Setting
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose} disableRipple>
            <Box color="error.main" display="flex" alignItems="center">
              <Icon icon="solar:logout-2-line-duotone" height={21} />
            </Box>
            <Link to="/auth/auth1/login">
              <Typography fontSize="15px" ml={1} color="textPrimary">
                Logout
              </Typography>
            </Link>
          </MenuItem>
          <Divider />
          <Box px="12px">
            <Button variant="contained" color="primary" fullWidth>
              View Profile
            </Button>
          </Box>
        </StyledMenu> */}
      </>
    </Box>
  );
};
