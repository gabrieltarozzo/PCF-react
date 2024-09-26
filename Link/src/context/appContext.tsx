import { createContext } from 'react';

interface ContextProps {
    onSelectKanban: Function,
    onClose: Function,
    onRefreshData: Function,
    onNextPage: Function,
}
export default createContext<ContextProps>({
    onSelectKanban: () => { },
    onClose: () => { },
    onRefreshData: () => { },
    onNextPage: () => { },
});