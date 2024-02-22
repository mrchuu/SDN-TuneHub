import { Box, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import SongList from "../component/SongList";
import ArtistTemplate from "../template/ArtistTemplate";
import { useState } from "react";
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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function ArtistUpload() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <ArtistTemplate>
      <div className="w-full min-h-screen px-5">
        <h4 className="text-lightText dark:text-darkText text-2xl font-semibold pl-3">
          UPLOAD
        </h4>
        <div>
          <Box sx={{ borderBottom: 1, borderColor: "rgb(255, 255, 255, 0.5)" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label="Item One"
                sx={{
                  color: "#FFFFFF",
                  "&.Mui-selected": {
                    color: "#DA8F66",
                  },
                }}
                {...a11yProps(0)}
              />
              <Tab
                label="Item Two"
                sx={{
                  color: "#FFFFFF",
                  "&.Mui-selected": {
                    color: "#DA8F66",
                  },
                }}
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            Item One
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
        </div>
      </div>
    </ArtistTemplate>
  );
}
