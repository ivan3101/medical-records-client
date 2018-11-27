import React from 'react';
import Sidebar from "../../../components/sidebar/sidebar";
import ItemsMenu from "../../../components/sidebar/itemsMenu/itemsMenu";
import ItemMenu from "../../../components/sidebar/itemMenu/itemMenu";
import Icon from "../../../components/icon/icon";

const SidebarContainer = ({ routes }) => {
    return (
        <Sidebar>
            <ItemsMenu>
                {
                    routes.map((route, i) => (
                        <ItemMenu path={route.path} key={i}>
                            <Icon icon={route.icon}/>
                            { route.name }
                        </ItemMenu>
                    ))
                }
            </ItemsMenu>
        </Sidebar>
    );
};

export default SidebarContainer;
