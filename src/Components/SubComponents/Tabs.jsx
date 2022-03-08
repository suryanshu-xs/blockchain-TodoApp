import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import HorizontalSplitRoundedIcon from '@mui/icons-material/HorizontalSplitRounded';
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import HomeTab from './HomeTab';
import TasksTab from './TasksTab';
import { TodoContext } from '../../App';
import StatisticsTab from './StatisticsTab';

function TabPanel(props) {
    const { children, value, index, ...other } = props;


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 1 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}




const BottomTabs = ({ value, setValue }) => {
    const theme = useTheme();

    const handleChange = (event, newValue) => {
        setValue(newValue);

    };



    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',

        }} >
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                className='swipeableViews'
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <TasksTab />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <HomeTab />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <StatisticsTab />
                </TabPanel>
            </SwipeableViews>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor='inherit'

                    variant="fullWidth"
                    style={{
                        height: 60,
                        display: 'flex',
                        alignItems: 'center'

                    }}
                >
                    <Tab icon={<HorizontalSplitRoundedIcon />} {...a11yProps(0)} />
                    <Tab icon={<HomeRoundedIcon />} {...a11yProps(1)} />
                    <Tab icon={<EqualizerRoundedIcon />} {...a11yProps(2)} />
                </Tabs>
            </AppBar>

        </Box>
    );
}

export default BottomTabs
