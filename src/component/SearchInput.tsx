import { FunctionComponent, useState, useCallback } from "react";
import { Button, Select, Input } from "semantic-ui-react";
import styled from 'styled-components';

interface Props {
    onSearch: (params: string) => void;
}

const StyledInput = styled(Input)`
  width: 100%;
`;

const searchOptions = [
    { key: 'title', text: 'Film Title', value: 'title' },
    { key: 'producer', text: 'Film Producer', value: 'producer' },
    { key: 'director', text: 'Film Director', value: 'director' },
];

const SearchInput: FunctionComponent<Props> = ({
    onSearch
}) => {
    const [keyword, setKeyword] = useState('');
    const [option, setOptions] = useState('title');

    const handleSearch = useCallback(() => {
        onSearch(`${option}=${keyword}`)
    }, [keyword, option])
    const handleKeyword = useCallback((e) => {setKeyword(e.target.value)}, [])
    const handleOption = useCallback((_, data) => {
        setOptions(data.value)
    }, [])
    return (
        <StyledInput type='text' placeholder='Search...' action >
            <input value={keyword} onChange={handleKeyword} />
            <Select compact options={searchOptions} value={option} onChange={handleOption}/>
            <Button onClick={handleSearch} type='submit'>Search</Button>
        </StyledInput>
    )
}

export default SearchInput;