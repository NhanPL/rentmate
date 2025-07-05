import { ArrowLeft, Edit, KeyRounded } from '@mui/icons-material';
import { Badge, Button, Card, CardContent, Chip, Typography } from '@mui/material';
import { BedDouble, CalendarDays, ChevronLeft, ChevronRight, DollarSign, Mail, PlusCircle, User } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';
import { PageHeader } from '../../components/pageHeader/PageHeader';
import TableCommon from '../../components/tableCommon/TableCommon';
import { formatDate, getDisplayName } from '../../utils/format';
import FormRoom from '../../components/form/formRoom/FormRoom';
import FormPayment from '../../components/form/formPayment/FormPayment';
import FormTenant from '../../components/form/formTenant/FormTenant';

const room = {
  id: '101',
  rent: 1200,
  isOccupied: true,
};

const tenants = [
  {
    name: 'John Doe',
    contactInfo: '034-567-8901',
    leaseStartDate: '2023-01-01',
    leaseEndDate: '',
  },
  {
    name: 'Jane Smith',
    contactInfo: '012-345-6789',
    leaseStartDate: '2023-02-01',
    leaseEndDate: '2024-01-31',
  },
];

const dataTable = [
  {
    period: 'January 2023',
    rent: '$1200',
    electricity: '$150',
    electricOld: 20,
    electricNew: 30,
    water: '$50',
    waterOld: 10,
    waterNew: 12,
    totalDue: '$1400',
    status: 'Paid',
  },
  {
    period: 'February 2023',
    rent: '$1200',
    electricity: '$160',
    electricOld: 30,
    electricNew: 40,
    water: '$60',
    waterOld: 12,
    waterNew: 14,
    totalDue: '$1420',
    status: 'Unpaid',
  },
  {
    period: 'March 2023',
    rent: '$1200',
    electricity: '$155',
    electricOld: 40,
    electricNew: 50,
    water: '$55',
    waterOld: 14,
    waterNew: 16,
    totalDue: '$1410',
    status: 'Paid',
  },
  {
    period: 'April 2023',
    rent: '$1200',
    electricity: '$165',
    electricOld: 50,
    electricNew: 60,
    water: '$65',
    waterOld: 16,
    waterNew: 18,
    totalDue: '$1430',
    status: 'Unpaid',
  },
  {
    period: 'May 2023',
    rent: '$1200',
    electricity: '$150',
    electricOld: 60,
    electricNew: 70,
    water: '$50',
    waterOld: 18,
    waterNew: 20,
    totalDue: '$1400',
    status: 'Paid',
  },
  {
    period: 'June 2023',
    rent: '$1200',
    electricity: '$160',
    electricOld: 70,
    electricNew: 80,
    water: '$60',
    waterOld: 20,
    waterNew: 22,
    totalDue: '$1420',
    status: 'Unpaid',
  },
  {
    period: 'July 2023',
    rent: '$1200',
    electricity: '$155',
    electricOld: 80,
    electricNew: 90,
    water: '$55',
    waterOld: 22,
    waterNew: 24,
    totalDue: '$1410',
    status: 'Paid',
  },
  {
    period: 'August 2023',
    rent: '$1200',
    electricity: '$165',
    electricOld: 90,
    electricNew: 100,
    water: '$65',
    waterOld: 24,
    waterNew: 26,
    totalDue: '$1430',
    status: 'Unpaid',
  },
];

const Room = () => {
  const [idxTenant, setIdxTenant] = React.useState(0);
  const [openFormRoom, setOpenFormRoom] = React.useState(false);
  const [openFormPayment, setOpenFormPayment] = React.useState(false);
  const [openFormTenant, setOpenFormTenant] = React.useState(false);

  const handleToggleFormRoom = () => {
    setOpenFormRoom(!openFormRoom);
  };

  const handleToggleFormPayment = () => {
    setOpenFormPayment(!openFormPayment);
  };

  const handleToggleFormTenant = () => {
    setOpenFormTenant(!openFormTenant);
  };

  // const param = useParams();

  const handleNextTenant = () => {
    if (idxTenant < tenants.length - 1) {
      setIdxTenant(idxTenant + 1);
    }
  };

  const handlePrevTenant = () => {
    if (idxTenant > 0) {
      setIdxTenant(idxTenant - 1);
    }
  };

  const renderDataTable = () => {
    return dataTable.map((item) => ({
      period: item.period,
      rent: item.rent,
      electricity: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.2 }}>
          <span style={{ fontWeight: 500 }}>{item.electricity}</span>
          <span style={{ fontSize: 12, color: '#888' }}>
            {item.electricOld} - {item.electricNew}
          </span>
        </div>
      ),
      water: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.2 }}>
          <span style={{ fontWeight: 500 }}>{item.water}</span>
          <span style={{ fontSize: 12, color: '#888' }}>
            {item.waterOld} - {item.waterNew}
          </span>
        </div>
      ),
      totalDue: item.totalDue,
      status: (
        <Chip
          label={item.status}
          color={item.status === 'Paid' ? 'success' : 'warning'}
          variant="outlined"
          size="small"
          sx={{
            fontWeight: 500,
            letterSpacing: 0.5,
          }}
        />
      ),
      actions: (
        <Button
          variant="outlined"
          color="warning"
          size="small"
          onClick={() => alert(`View details for ${item.period}`)}
        >
          <Edit className="h-4 w-4" />
        </Button>
      ),
    }));
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <PageHeader
        title={`Room 101`}
        actions={
          <Link to={`/properties/1`}>
            <Button variant="outlined">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Apartment
            </Button>
          </Link>
        }
      />

      <main className="grid flex-1 items-start gap-6">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Room Details Card */}
          <Card className="md:col-span-1 shadow-sm">
            <div className="flex items-center justify-between p-4">
              <Typography variant="h6" className="flex items-center gap-2">
                <KeyRounded className="h-5 w-5 text-primary" />
                Room Information
              </Typography>
              <Button variant="outlined" onClick={handleToggleFormRoom}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </div>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2">
                  <BedDouble className="h-4 w-4" />
                  Type
                </span>
                <span className="font-medium">1 bed</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Base Rent
                </span>
                <span className="font-medium">${room.rent?.toLocaleString() || 'N/A'} / month</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                {room.isOccupied ? (
                  <Badge variant="standard" className="text-orange-600 border-orange-500">
                    Occupied
                  </Badge>
                ) : (
                  <Badge variant="standard">Available</Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tenant Details Card */}
          <Card className="md:col-span-2 shadow-sm">
            <div className="flex items-center justify-between p-4 pb-0">
              <div>
                <Typography variant="h6" className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Tenant Information
                </Typography>
                <Typography variant="body1" className="text-black/60">
                  Details for tenant {idxTenant + 1} of {tenants.length}.
                </Typography>
              </div>
              <Button variant="outlined" onClick={handleToggleFormTenant}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Tenant
              </Button>
            </div>
            <CardContent>
              {room.isOccupied ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <dt className="text-muted-foreground flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Name
                    </dt>
                    <dd className="font-medium">{tenants[idxTenant].name}</dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-muted-foreground flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Contact
                    </dt>
                    <dd className="font-medium">{tenants[idxTenant].contactInfo}</dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-muted-foreground flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      Lease Start
                    </dt>
                    <dd className="font-medium">
                      {tenants[idxTenant].leaseStartDate ? formatDate(tenants[idxTenant].leaseStartDate) : ''}
                    </dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-muted-foreground flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      Lease End
                    </dt>
                    <dd className="font-medium">
                      {tenants[idxTenant].leaseEndDate ? formatDate(tenants[idxTenant].leaseEndDate) : ''}
                    </dd>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No tenant assigned to this room.</p>
              )}
            </CardContent>
            <footer className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Button variant="outlined" className="h-8 w-8" onClick={handlePrevTenant} disabled={idxTenant === 0}>
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous tenant</span>
                </Button>
                <span>{`Tenant ${idxTenant + 1} of ${tenants.length}`}</span>
                <Button
                  variant="outlined"
                  className="h-8 w-8"
                  onClick={handleNextTenant}
                  disabled={idxTenant >= tenants.length - 1}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next tenant</span>
                </Button>
              </div>
              <Button variant="outlined" onClick={() => alert('Edit Tenant')}>
                <Edit className="mr-2 h-4 w-4" />
                Edit {getDisplayName(tenants[idxTenant].name)}
              </Button>
            </footer>
          </Card>
        </div>

        {/* Payment History Card */}
        <Card className="shadow-sm">
          <CardContent>
            <div className="flex items-center justify-between p-4 pb-0">
              <div>
                <Typography variant="h6">Payment History</Typography>
                <Typography variant="body1" className="text-black/60">
                  Monthly breakdown of rent and utilities.
                </Typography>
              </div>
              <Button variant="outlined" onClick={handleToggleFormPayment}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Payment
              </Button>
            </div>
            <TableCommon
              headName={['Period', 'Rent', 'Electricity', 'Water', 'Total Due', 'Status', 'Actions']}
              data={renderDataTable()}
              isPanigation
            />
          </CardContent>
        </Card>
      </main>

      <FormRoom isOpen={openFormRoom} onClose={handleToggleFormRoom} />
      <FormPayment open={openFormPayment} onClose={handleToggleFormPayment} />
      <FormTenant open={openFormTenant} onClose={handleToggleFormTenant} />
    </div>
  );
};

export default Room;
