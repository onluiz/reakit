import React from "react";
import { Sidebar, Link, Backdrop, Block, use } from "reakit";
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { palette } from "styled-tools";
import StyleguidistContainer from "../containers/StyleguidistContainer";
import getSectionUrl from "../utils/getSectionUrl";
import getRelease from "../utils/getRelease";
import Menu from "./Menu";

const StyledSidebar = styled(Sidebar)`
  padding: 1em 1em 3em;
  min-width: 250px;
  -webkit-overflow-scrolling: touch;
`;

const VersionLink = styled(Link)`
  font-size: 16px;
  color: ${palette("grayscale", 3)};
`;

const SectionLink = styled(use(Link, RouterLink))`
  font-size: 22px;
  color: ${palette("backgroundText", -1)};
  font-weight: 600;
  line-height: 2;
  margin: 1em 0 0.5em;
  *:first-child > & {
    margin-top: 0;
  }
`;

const MobileSidebar = () => (
  <Sidebar.Container context="sidebar">
    {sidebar => (
      <React.Fragment>
        <Backdrop fade use={Sidebar.Hide} zIndex={99999} {...sidebar} />
        <StyleguidistContainer>
          {({ sections }) => (
            <StyledSidebar slide {...sidebar}>
              <Block>
                <VersionLink href={getRelease.url()}>
                  {getRelease.version}
                </VersionLink>
              </Block>
              {sections.map(section => (
                <Block key={section.slug} onClick={sidebar.hide}>
                  <SectionLink to={getSectionUrl(sections, section)}>
                    {section.name}
                  </SectionLink>
                  <Menu section={section} />
                </Block>
              ))}
            </StyledSidebar>
          )}
        </StyleguidistContainer>
      </React.Fragment>
    )}
  </Sidebar.Container>
);

export default MobileSidebar;
