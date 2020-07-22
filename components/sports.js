import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
const sports = [
  "Tennis",
  "Volleyball",
  "Football",
  "Badminton",
  "Disability Sport",
  "Diving",
  "Boxing",
  "Judo",
  "Swimming",
  "Table Tennis",
  "Taekwondo",
  "Wrestling",
];
export default function DesirableSports() {
  const [value, setValue] = React.useState(sports[0]);
  const [inputValue, setInputValue] = React.useState("");
  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={sports}
        style={{ maxWidth: 300, height: 64 }}
        renderInput={(params) => (
          <TextField {...params} label="Sports" variant="outlined" />
        )}
      />
    </div>
  );
}
