import { Tabs, Tab, Box, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getCricketMatches, getCricketMatchDetails } from "../Service/cricket-api";
import Score from "./score";

function TabComponent() {
  const [value, setValue] = useState(0);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    getCricketMatches()
      .then((data) => {
        setMatches(data.matches);
        console.log(data.matches);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e, value) => {
    setValue(value);
  };

  function TabPanel(props) {
    return (
      <Box>
        {props.value === props.index && (
          <Box>
            <Typography style={{ margin: "15px" }}>
              {" "}
              {props.children}
            </Typography>
          </Box>
        )}
      </Box>
    );
  }

  function getData(type) {
    return matches.map((match) => {
      return (
        <>
          {match.type === type ? (
            <Box display = 'flex' alignItems = 'center' justifyContent = 'center'>
              <Score match={match} key={match.unique_id} />
            </Box>
          ) : (
            ""
          )}
        </>
      );
    });
  }

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        centered
      >
        <Tab label="One Day" />
        <Tab label="T-20" />
        <Tab label="Test" />
      </Tabs>
      <TabPanel value={value} index={0}>
        {getData("ODI")}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {getData("Twenty20")}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {getData("Tests")}
      </TabPanel>
    </>
  );
}

export default TabComponent;
