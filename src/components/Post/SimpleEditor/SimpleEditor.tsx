import 'easymde/dist/easymde.min.css';
import { useCallback, useMemo, useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import { PropsInterface } from './types';

const SimpleEditor: React.FC<PropsInterface> = ({ resetError }) => {
    const [textMde, setTextMde] = useState<string>();
    const optionsMDE = useMemo(
        () =>
            ({
                spellChecker: false,
                maxHeight: '400px',
                placeholder: 'Typing in text...',
                status: false,
                markdown: true,
                autosave: {
                    uniqueId: 'demo',
                    enabled: true,
                    delay: 1000,
                },
            } as EasyMDE.Options),
        []
    );

    const onChange = useCallback((value: string) => {
        setTextMde(value);
    }, []);
    return (
        <SimpleMDE value={textMde} onChange={onChange} options={optionsMDE} onFocus={resetError} />
    );
};

export default SimpleEditor;
