const Routes = ({isOpen, setRoute, routeRecommendations}) => {   
    return (  
        <div  style={isOpen ? {background: '#8a8a8a', height: '40vh'} : {background: '#8a8a8a', height: '55vh'}}>
            {String(routeRecommendations)}
        </div>
    );
}
 
export default Routes;