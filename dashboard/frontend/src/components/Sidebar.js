import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.nav`
  width: 250px;
  background: #2c3e50;
  color: white;
  padding: 2rem 0;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin: 0;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  color: ${(props) => (props.active ? "#3498db" : "#ecf0f1")};
  text-decoration: none;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  background-color: ${(props) =>
    props.active ? "rgba(52, 152, 219, 0.1)" : "transparent"};
  border-left: 3px solid
    ${(props) => (props.active ? "#3498db" : "transparent")};
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(52, 152, 219, 0.1);
    color: #3498db;
  }
`;

const NavIcon = styled.span`
  margin-right: 12px;
  font-size: 1.2rem;
`;

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    {
      path: "/",
      label: "Dashboard",
      icon: "📊",
    },
    {
      path: "/price-analysis",
      label: "Price Analysis",
      icon: "📈",
    },
    {
      path: "/events-timeline",
      label: "Events Timeline",
      icon: "📅",
    },
    {
      path: "/change-points",
      label: "Change Points",
      icon: "🎯",
    },
  ];

  return (
    <SidebarContainer>
      <NavList>
        {navItems.map((item) => (
          <NavItem key={item.path}>
            <NavLink
              to={item.path}
              active={location.pathname === item.path ? 1 : 0}
            >
              <NavIcon>{item.icon}</NavIcon>
              {item.label}
            </NavLink>
          </NavItem>
        ))}
      </NavList>
    </SidebarContainer>
  );
};

export default Sidebar;
