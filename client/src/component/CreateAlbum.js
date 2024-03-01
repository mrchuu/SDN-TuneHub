import { Autocomplete, FormControl, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useDropzone } from "react-dropzone";
import { MdAlbum } from "react-icons/md";
import { useSelector } from "react-redux";
import { CgColorPicker } from "react-icons/cg";
import { IoIosClose } from "react-icons/io";
import PerformRequest from "../utilities/PerformRequest";
export default function CreateAlbum() {
  const { OriginalRequest } = PerformRequest();
  const [album, setAlbum] = useState({});
  const [pickerVisibility, setPickerVisibility] = useState(false);
  const updateAlbum = ({ name, value }) => {
    const updatedAlbum = { ...album, [name]: value };
    setAlbum(updatedAlbum);
  };
  const theme = useSelector((state) => state.theme.theme);
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    updateAlbum({ name: "album_cover", value: file });
  }, []);
  const [unpublishedSongs, setUnpublishedSongs] = useState([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const dropzoneStyle = {
    border: "2px dashed #ccc",
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center",
    color: theme ? "white" : "#353535",
  };
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await OriginalRequest("artists/findByName", "POST", {
          artistName: "",
        });
        console.log(response);
        setUnpublishedSongs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSongs();
  }, []);
  const inputOutLineColor = () => {
    return theme ? "#ADADAD" : "#717171";
  };
  const inputTextColor = () => {
    return theme ? "white" : "#353535";
  };
  const inputStyle = () => {
    return {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: inputOutLineColor(),
      },
      "& .MuiInputLabel-root": {
        color: inputTextColor(),
      },
      "& .MuiInputBase-input": {
        color: inputTextColor(),
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: inputTextColor(),
      },
    };
  };
  const [color, setColor] = useState("#aabbcc");
  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center">
        <h4 className="text-center text-lightText dark:text-darkText font-semibold text-lg">
          Publish Your Album Here{" "}
        </h4>
        &nbsp;
        <MdAlbum size={25} className="text-lightText dark:text-darkText" />
      </div>
      <div className="w-full flex justify-between">
        <div className="w-5/12 h-10 p-5">
          <form className="w-full">
            <div className="flex w-full justify-between mb-5">
              <TextField
                label="albumName"
                variant="outlined"
                sx={inputStyle()}
              />
              <TextField
                label="Price"
                variant="outlined"
                type="number"
                sx={inputStyle()}
              />
            </div>
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={2}
              sx={inputStyle()}
              className="mb-5"
              // onChange={(e) => {
              //   handleDataChange(e);
              // }}
            />
            <div className="mb-5" {...getRootProps()} style={dropzoneStyle}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Upload Your Cover Image Here</p>
              )}
            </div>
            <div className="flex items-center mb-5">
              <label className="text-lightText dark:text-darkText font-semibold text-base">
                Album Theme
              </label>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setPickerVisibility(!pickerVisibility);
                }}
                className={`px-4 py-1 ml-5 border-2 border-light10 dark:border-dark10 rounded-md hover:bg-light10 dark:hover:bg-dark10 ${
                  pickerVisibility ? "bg-light10 dark:bg-dark10" : ""
                }`}
              >
                {pickerVisibility ? (
                  <IoIosClose className="dark:text-white" />
                ) : (
                  <CgColorPicker className="dark:text-white" />
                )}
              </button>
              {pickerVisibility ? (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "32%",
                    zIndex: 999,
                  }}
                  className="shadow-lg shadow-neutral-400 dark:shadow-blue-500/50"
                >
                  <HexColorPicker color={color} onChange={setColor} />
                </div>
              ) : (
                <></>
              )}
            </div>
            <div>
              <label className="text-lightText dark:text-darkText font-semibold text-base">
                Add Songs
              </label>
              <FormControl fullWidth className="mt-3">
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={unpublishedSongs}
                  getOptionLabel={(option) => (
                    <div className="h-5 w-full bg-red-400 mb-5"></div>
                  )}
                  filterSelectedOptions
                  onChange={(event, selected) => {
                    const selectedItems = selected.map((item) => item._id);
                    console.log(selectedItems);
                  }}
                  sx={inputStyle()}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Unpublished Songs"
                      placeholder="Unpublished Songs"
                    />
                  )}
                />
              </FormControl>
            </div>
          </form>
        </div>
        <div className="w-6/12 p-5 flex justify-center items-center">
          <div
            className="w-72 h-72 p-5 mx-auto z-20 left-16 relative"
            style={{ backgroundColor: color }}
          >
            <img
              src={
                album.album_cover
                  ? URL.createObjectURL(album.album_cover)
                  : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
              }
            />
          </div>
          <img
            src="https://res.cloudinary.com/djzdhtdpj/image/upload/v1709269357/png-transparent-phonograph-record-lp-record-music-others-miscellaneous-album-disc-jockey-thumbnail_1_dd0lc3.png"
            className="w-64 h-64 right-20 relative animate-spin"
            style={{ animationDuration: "10000ms" }}
          />
        </div>
      </div>
    </div>
  );
}
