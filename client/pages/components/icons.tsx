import { SiJavascript, SiPython } from 'react-icons/si';
import { AiOutlineConsoleSql } from 'react-icons/ai';

const iconPicker = (name:string) => {
    switch (name) {
        case 'javascript': 
            return <SiJavascript title='JavaScript'/>
        case 'sql':
            return <AiOutlineConsoleSql title='SQL'/>
        case 'python':
            return <SiPython title='Python'/>
    }
}

export default iconPicker;
