import ReactSearchBox from "react-search-box";
import { generateColors } from "../../theme"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useState } from "react";

const SearchBar = () => {
    const [input, setInput] = useState("")

    const colors = generateColors();

    const data = [
        {
            key : "",
            value : "here will be recommended programmes which we will fetch",
        },
        {
            key : "",
            value : "configure them under components explore searchbar",
        },
    ]
    return (<ReactSearchBox
    placeholder="Enter a Programme Name"
    value={input}
    data={data}
    inputFontColor={colors.text[500]}
    inputBackgroundColor={colors.primary[500]}
    leftIcon={<SearchOutlinedIcon/>}
    >

    </ReactSearchBox>)
}
export default SearchBar;

