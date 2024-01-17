import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar(props) {
  return (
    <TextField
    value={props.value}
    onChange={props.onChange}
    placeholder="Search by title"
    variant="filled"
    sx={{
      width: "80%",
      borderRadius: "50px",
      "& .MuiFilledInput-root": {
        borderRadius: "50px",
      },
      "& .MuiFilledInput-underline:before": {
        display: "none",
      },
      "& .MuiFilledInput-underline:after": {
        display: "none",
      },
      "& .MuiFilledInput-input": {
        padding: "20px",
      },
    }}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
  />
  );
}

export default SearchBar;