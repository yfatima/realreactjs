import React, {useMemo, useState, useCallback} from 'react';

import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';

import Fetcher from './components/Fetcher';
import Hooks, {aFunc} from './components/Hooks';
import ToggleButtons from './components/ToggleButtons';
import PopcornSales from './components/PopcornSales';
import Strings from './components/strings';

export const useLinkOpener = () => {
  const windowObjectReferences = useMemo(() => ({}), []);
  const openRequestedSinglePopup = useCallback(
    (url, target, windowFeatures = "resizable,scrollbars,status") => {
      if (window !== window.top) {
        window.open(
          url,
          target,
          windowFeatures ? `${windowFeatures},noreferrer` : "noreferrer"
        );
        return true;
      }

      const windowObjectReference = windowObjectReferences[url];
      if (!windowObjectReference || windowObjectReference.closed) {
        windowObjectReferences[url] = window.open(url, target, windowFeatures);
        return true;
      }

      windowObjectReference.focus();
      return false;
    },
    [windowObjectReferences]
  );

  return [windowObjectReferences, openRequestedSinglePopup];
};

export default function App(props) {
  const [currentTab, setCurrentTab] = useState(0);
  const handleChangeCurrentTab = useCallback(
    (event, newValue) => {
      setCurrentTab(newValue);
    },
    []
  );

  const {rootSX, tabsSX} = useMemo(
    ()=>({
      rootSX:{ flexGrow: 1 },
      tabsSX: { borderBottom: 1, borderColor: 'divider' }
    }),
    []
  );
  
  const [, openLink] = useLinkOpener();
  const handleChangeOpenGitHubLink = useCallback(() => {
    openLink(
      "https://github.com/yfatima/realreactjs",
      "https://github.com/yfatima"
    );
  }, [openLink]);

  return (
    <Box sx={rootSX}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" noWrap >
              SWE 432 React examples
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
              edge="end"
              color="inherit"
              onClick={handleChangeOpenGitHubLink}
          >
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={tabsSX}>
        <Tabs value={currentTab} onChange={handleChangeCurrentTab}>
         <Tab label="Get Strings" />	
        </Tabs>
      </Box>
      <TabPanel value={currentTab} index={0}>
        <Strings />
      </TabPanel>
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}
