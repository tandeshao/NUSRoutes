import styled from 'styled-components';

export const MapNavbarContainer = styled.div`
    display: flex;
    position: absolute;
    bottom: 0;
    z-index: 1400 !important;
    width: 100vw;
    background-color: rgba(255, 255, 255, .95);
    height: 8vh;
`

export const Item = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
    padding: 10px;
    flex-grow: 1;
    text-align: center;

`