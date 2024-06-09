import { Box, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import SongList from "../component/SongList";
import ArtistTemplate from "../template/ArtistTemplate";
import { useState } from "react";
import { useSelector } from "react-redux";
import SongManagement from "../component/SongManagement";
import AlbumManagement from "../component/AlbumManagement";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

export default function ArtistTrack() {
  const [value, setValue] = useState(0);
  const theme = useSelector((state) => state.theme.theme);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <ArtistTemplate>
      <div className="w-full min-h-screen px-5">
        <h4 className="text-lightText dark:text-darkText text-2xl font-semibold pl-3">
        TRACK MANAGEMENT
        </h4>
        <div>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: theme
                ? "rgb(255, 255, 255, 0.5)"
                : "rgb(0, 0, 0, 0.3)",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label="Single"
                sx={{
                  color: theme ? "#ADADAD" : "#717171",
                  "&.Mui-selected": {
                    color: theme ? "#DA8F66" : "#F2785C",
                  },
                }}
              />
              <Tab
                label="Album"
                sx={{
                  color: theme ? "#ADADAD" : "#717171",
                  "&.Mui-selected": {
                    color: theme ? "#DA8F66" : "#F2785C",
                  },
                }}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div className="w-full">
              <SongManagement />
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="w-full">
              <AlbumManagement />
            </div>
          </CustomTabPanel>
        </div>
      </div>
    </ArtistTemplate>
  );
}
