import { Box } from '@mui/material';
import CardOverview from '../../components/cardOverview/CardOverview';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HouseIcon from '@mui/icons-material/House';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import GroupsIcon from '@mui/icons-material/Groups';
import TableCommon from '../../components/tableCommon/TableCommon';
const Dashboard = () => {
  return (
    <Box component="div" sx={{ padding: 2, backgroundColor: '#FAFBFD' }}>
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardOverview
          title="Total Properties"
          count={6}
          icon={<AccountBalanceIcon sx={{ fontSize: 40, color: '#3E82CD' }} />}
          iconBgClr="#D7F1FF"
        />
        <CardOverview
          title="Occupied Units"
          count={16}
          icon={<HouseIcon sx={{ fontSize: 40, color: '#0EB072' }} />}
          iconBgClr="#BAF2D0"
        />
        <CardOverview
          title="Vacant Units"
          count={4}
          icon={<HouseSidingIcon sx={{ fontSize: 40, color: '#FF573A' }} />}
          iconBgClr="#FFDDD9"
        />
        <CardOverview
          title="Total People"
          count={40}
          icon={<GroupsIcon sx={{ fontSize: 40, color: '#A8ABB5' }} />}
          iconBgClr="#E5E9F7"
        />
      </Box>
      <Box className="grid grid-cols-1 lg:grid-cols-2 gap-4" sx={{ marginTop: 2 }}>
        <Box className="flex-1 bg-white p-2 rounded shadow">
          <TableCommon name="Recent Properties" headName={['Property Name', 'Location']} />
        </Box>
        <Box className="flex-1 bg-white p-2 rounded shadow">
          <TableCommon name="Recent Properties" headName={['Property Name', 'Location']} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
