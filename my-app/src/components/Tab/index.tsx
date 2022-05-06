import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
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
        <Box>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const BasicTabs: React.FC<any> = ({ titles, children }: any) => {
  const [value, setValue] = React.useState(0);

  console.log(children);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          
          variant="scrollable"
          scrollButtons='auto'
          allowScrollButtonsMobile
        >
          {titles &&
            titles.map((item: any, index: any) => (
              <Tab key={index} label={item} {...a11yProps(index)} />
            ))}
        </Tabs>
      </Box>
      {children &&
        children.map((item: any, index: number) => (
          <TabPanel key={item.props.prod.id} value={value} index={Number(item.props.prod.statusID)}>
            {item}
          </TabPanel>
        ))}
      {children &&
        children.map((item: any, index: number) => (
          <TabPanel key={item.props.prod.id} value={value} index={0}>
            {item}
          </TabPanel>
        ))}
    </Box>
  );
};

export default BasicTabs;
