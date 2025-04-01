import { Box } from "@mui/material";
import {
  Sidebar as MUI_Sidebar,
  Menu,
  MenuItem,
  Submenu,
} from "react-mui-sidebar";
import { NavLink, useLocation } from 'react-router';

import { Icon } from "@iconify/react";
import Menuitems, { MenuitemsType } from "./MenuItems";
import { useAuthStore } from "src/zustand/AuthUserInfo";
import { useContext } from "react";
import { DashboardContext } from "src/context/DashboardContext";

const renderMenuItems = (items: MenuitemsType[], pathDirect: string) => {
  const { isLogin } = useAuthStore.getState();
  const {isMobileSidebar , setIsMobileSidebar} = useContext(DashboardContext);

  return items.map((item) => {
    if (item.subheader) {
      // Display Subheader
      return (
        <Box sx={{ margin: "0 -24px", textTransform: 'uppercase', '& .MuiListSubheader-root': { fontWeight: '600 !important' } }} key={item.subheader}>
          <Menu
            subHeading={item.subheader}
            key={item.subheader}
          >
            <></>
          </Menu>
        </Box>
      );
    }

    //If the item has children (submenu)
    if (item.children) {
      return (
        <Submenu
          key={item.id}
          title={item.title}
          borderRadius='999px'
          icon={
            item.icon ? (
              <Icon icon={"solar:" + item.icon} width="20" height="20" />
            ) : (
              <Icon icon="mdi:circle" width="6" height="6" />
            )
          }
        >
          {renderMenuItems(item.children, pathDirect)}
        </Submenu>
      );
    }

    if(item.isForAll || isLogin===item.isRequiredLogin ){ //모든 사용자용 또는 로그인 여부에 따른 페이지 노출 판단
    // If the item has no children, render a MenuItem
      return (
        <div key={item.title} onClick={()=>setIsMobileSidebar(!isMobileSidebar)}>
          <MenuItem
            key={item.id}
            isSelected={pathDirect === item?.href}
            borderRadius='999px'
            icon={
              item.icon ? (
                <Icon icon={"solar:" + item.icon} width="20" height="20" />
              ) : (
                <Icon icon="mdi:circle" width="6" height="6" />
              )
            }
            component={NavLink}
            link={item.href && item.href !== "" ? item.href : undefined}
            target={item.href && item.href.startsWith("https") ? "_blank" : "_self"}
            badge={item.chip ? true : false}
            badgeContent={item.chip || ""}
            badgeColor='secondary'
            badgeTextColor="#1b84ff"
            disabled={item.disabled}
          >
            {item.title}
          </MenuItem>
        </div>

      );
    }

    return <></>;
  });

};

const SidebarItems = () => {
  const location = useLocation();
  const pathDirect = location.pathname;

  return (
    <Box sx={{ px: "20px", overflowX: 'hidden', marginTop:"20px" }}>
      <MUI_Sidebar width={"100%"} showProfile={false} themeColor={"#43ced7"} themeSecondaryColor={'#1b84ff1a'}>
        {renderMenuItems(Menuitems, pathDirect)}
      </MUI_Sidebar>
    </Box>
  );
};

export default SidebarItems;

