import React from 'react';
import './error.sass'
import { CSSTransition} from 'react-transition-group';

const Error = ({error,timeout,className,description}) => {
return(
  <CSSTransition 
                in={error} 
                timeout={timeout} 
                className={className}
                classNames="fade" 
                mountOnEnter unmountOnExit>
    <div>{description} </div>
  </CSSTransition>
);
}
export default Error;

