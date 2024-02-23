import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { RiFolderUploadFill } from "react-icons/ri";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { setGenres, setSongInfo } from "../redux/artistUpload.js";
import PerformRequest from "../utilities/PerformRequest.js";
const AudioDropZone = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const dropzoneStyle = {
    border: "2px dashed #ccc",
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center",
  };
  return (
    <div {...getRootProps()} style={dropzoneStyle}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Upload Your Audio File Here</p>
      )}
    </div>
  );
};
const CoverImageDropZone = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const dropzoneStyle = {
    border: "2px dashed #ccc",
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center",
  };
  return (
    <div {...getRootProps()} style={dropzoneStyle}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Upload Your Audio File Here</p>
      )}
    </div>
  );
};
export default function SongUploadForm() {
  const { OriginalRequest } = PerformRequest();
  const hasMounted = useRef(false);

  const [value, setValue] = useState([20, 37]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const genres = useSelector((state) => state.artistUpload.genres);
  const songInfo = useSelector((state) => state.artistUpload.songInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await OriginalRequest("genres/", "GET");
        dispatch(setGenres(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    if (hasMounted.current) {
      fetchGenres();
    } else {
      hasMounted.current = true;
    }
  }, [hasMounted]);
  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center">
        <h4 className="text-center text-lightText dark:text-darkText font-semibold text-lg">
          Upload Your Song Here{" "}
        </h4>
        &nbsp;
        <RiFolderUploadFill
          className="text-lightText dark:text-darkText"
          size={25}
        />
      </div>
      <div className="flex items-center justify-between mt-5">
        <div className="formSection w-6/12">
          <form className="w-10/12 mx-auto">
            <FormControl className="w-full gap-6 flex-col">
              <FormControl className="flex-row justify-between items-center">
                <FormControl className="w-6/12 mr-1">
                  <TextField
                    required
                    label="Song Name"
                    name="songName"
                    color="warning"
                    onChange={(e) => {
                      dispatch(
                        setSongInfo({
                          name: e.target.name,
                          value: e.target.value,
                        })
                      );
                    }}
                  />
                </FormControl>
                <FormControl className="w-6/12 ml-1">
                  <InputLabel id="genreLable">Genre</InputLabel>
                  <Select
                    value={songInfo.genre}
                    labelId="genreLable"
                    id="genre"
                    label="Genre"
                    onChange={(e) => {
                      dispatch(
                        setSongInfo({
                          name: "genre",
                          value: e.target.value,
                        })
                      );
                    }}
                  >
                    {genres.map((genre) => (
                      <MenuItem value={genre._id} key={genre._id}>
                        {genre.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </FormControl>
              <FormControl fullWidth>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={genres}
                  getOptionLabel={(option) => option.name}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Featured Artist"
                      placeholder="Featured Artist"
                    />
                  )}
                />
              </FormControl>
              <FormControl>
                <CoverImageDropZone />
              </FormControl>
              <FormControl>
                <AudioDropZone />
              </FormControl>
              <div className="flex items-center justify-between">
                <FormControl className="w-2/12">
                  <FormControlLabel control={<Checkbox />} label="Exclusive" />
                </FormControl>
                <FormControl className="w-9/12 flex items-center justify-between">
                  <p className="w-4/12">Preview range</p>
                  <Box width={300}>
                    <Slider
                      getAriaLabel={() => "Preview range"}
                      value={value}
                      onChange={handleChange}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) =>
                        `${Math.floor(value / 60)}:${value % 60}`
                      }
                      min={0}
                      max={330}
                    />
                  </Box>
                </FormControl>
              </div>
              <FormControl>
                <TextField label="Price(vnd)" type="number" color="warning" />
              </FormControl>
            </FormControl>
          </form>
        </div>
      </div>
    </div>
  );
}
