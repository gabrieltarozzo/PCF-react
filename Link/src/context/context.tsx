import{createContext} from 'react';

interface ContextProps {
    move: Function,
    mouseEvent: Function,
    onClickCard: Function
}
export default createContext<ContextProps>({
    move:()=>{},
    mouseEvent:()=>{},
    onClickCard:()=>{}
});