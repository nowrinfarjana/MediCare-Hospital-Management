
import { useEffect, useState } from 'react';
import './App.css';

// Load saved data safely from localStorage
const loadSavedData = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.error(`Could not load ${key} from localStorage:`, error);
    return fallback;
  }
};

const initialPatients = [
  {
    id: 'P001',
    name: 'Rahim Ahmed',
    age: 35,
    gender: 'Male',
    phone: '01712345678',
    email: 'rahim@gmail.com',
    address: 'Dhanmondi, Dhaka',
    status: 'Active'
  },
  {
    id: 'P002',
    name: 'Nusrat Jahan',
    age: 28,
    gender: 'Female',
    phone: '01812345678',
    email: 'nusrat@gmail.com',
    address: 'Uttara, Dhaka',
    status: 'Active'
  }
];

const initialDoctors = [
  {
    id: 'D001',
    name: 'Dr. Sarah Ahmed',
    specialization: 'Cardiology',
    qualification: 'MBBS, FCPS',
    email: 'sarah@gmail.com',
    phone: '01711111111',
    experience: '10',
    availability: 'Available',
    branch: 'Dhanmondi',
    chamber: 'Room 201',
    visitingDays: 'Sat, Mon, Wed',
    visitingTime: '5:00 PM - 8:00 PM',
    fee: '1000'
  },
  {
    id: 'D002',
    name: 'Dr. Mahmud Hasan',
    specialization: 'Neurology',
    qualification: 'MBBS, MD',
    email: 'mahmud@gmail.com',
    phone: '01722222222',
    experience: '8',
    availability: 'Available',
    branch: 'Uttara',
    chamber: 'Room 305',
    visitingDays: 'Sun, Tue, Thu',
    visitingTime: '4:00 PM - 7:00 PM',
    fee: '1200'
  },
  {
    id: 'D003',
    name: 'Dr. Nusrat Jahan',
    specialization: 'Dermatology',
    qualification: 'MBBS, DDV',
    email: 'nusrat.doctor@gmail.com',
    phone: '01733333333',
    experience: '6',
    availability: 'Unavailable',
    branch: 'Mirpur',
    chamber: 'Room 102',
    visitingDays: 'Sat, Mon',
    visitingTime: '6:00 PM - 9:00 PM',
    fee: '800'
  },
  {
    id: 'D004',
    name: 'Dr. Tanvir Rahman',
    specialization: 'Medicine',
    qualification: 'MBBS, FCPS',
    email: 'tanvir@gmail.com',
    phone: '01744444444',
    experience: '12',
    availability: 'Available',
    branch: 'Badda',
    chamber: 'Room 210',
    visitingDays: 'Sun, Tue, Thu',
    visitingTime: '5:00 PM - 8:00 PM',
    fee: '900'
  }
];

const departments = [
  'Cardiology',
  'Neurology',
  'Dermatology',
  'Medicine',
  'Orthopedics',
  'Gynecology',
  'Pediatrics',
  'Dental'
];

const emptyPatient = {
  name: '',
  age: '',
  gender: 'Male',
  phone: '',
  email: '',
  address: '',
  status: 'Active'
};

const emptyDoctor = {
  name: '',
  specialization: 'Cardiology',
  qualification: '',
  email: '',
  phone: '',
  experience: '',
  availability: 'Available',
  branch: 'Dhanmondi',
  chamber: '',
  visitingDays: '',
  visitingTime: '',
  fee: ''
};

const emptyAppointment = {
  patientName: '',
  patientPhone: '',
  doctorId: '',
  branch: '',
  date: '',
  time: '',
  reason: ''
};

function App() {
  const [activePage, setActivePage] = useState('Dashboard');

  const [patients, setPatients] = useState(() => loadSavedData('medicarePatients', initialPatients));
  const [doctors, setDoctors] = useState(() => loadSavedData('medicareDoctors', initialDoctors));
  const [appointments, setAppointments] = useState(() => loadSavedData('medicareAppointments', []));
  const [bills, setBills] = useState(() => loadSavedData('medicareBills', []));
 
  // Automatically save records whenever they change
  useEffect(() => {
    localStorage.setItem('medicarePatients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('medicareDoctors', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('medicareAppointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('medicareBills', JSON.stringify(bills));
  }, [bills]);

  const [patientForm, setPatientForm] = useState(emptyPatient);
  const [doctorForm, setDoctorForm] = useState(emptyDoctor);
  const [appointmentForm, setAppointmentForm] = useState(emptyAppointment);
  const [billForm, setBillForm] = useState({
    appointmentId: '',
    patientId: '',
    patientName: '',
    doctorName: '',
    amount: '',
    paymentMethod: 'Cash',
    paymentStatus: 'Pending',
    billDate: new Date().toISOString().split('T')[0],
    description: ''
  });

  const [editingPatient, setEditingPatient] = useState(null);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [editingBill, setEditingBill] = useState(null);

  const [showPatientForm, setShowPatientForm] = useState(false);
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showBillForm, setShowBillForm] = useState(false);

  const [patientSearch, setPatientSearch] = useState('');
  const [doctorSearch, setDoctorSearch] = useState('');
  const [appointmentSearch, setAppointmentSearch] = useState('');
  const [billSearch, setBillSearch] = useState('');

  const [doctorBranch, setDoctorBranch] = useState('All Branches');
  const [doctorDepartment, setDoctorDepartment] = useState('All Departments');

  const [viewingDoctor, setViewingDoctor] = useState(null);
  const [viewingPatient, setViewingPatient] = useState(null);
  const [viewingAppointment, setViewingAppointment] = useState(null);
  const [viewingBill, setViewingBill] = useState(null);

  const [appointmentError, setAppointmentError] = useState('');

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const defaultSettings = {
    hospitalName: 'MediCare Hospital',
    address: 'Dhaka, Bangladesh',
    phone: '01700000000',
    email: 'info@medicare.com',
    adminName: 'Admin',
    theme: 'Light'
  };

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('medicareSettings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [settingsMessage, setSettingsMessage] = useState('');

  const handleSettingsSave = (e) => {
    e.preventDefault();
    localStorage.setItem('medicareSettings', JSON.stringify(settings));
    setSettingsMessage('Settings saved successfully!');
  };

  const handleSettingsReset = () => {
    setSettings(defaultSettings);
    localStorage.setItem('medicareSettings', JSON.stringify(defaultSettings));
    setSettingsMessage('Settings reset successfully!');
  };


  // PATIENT FILTER
  const filteredPatients = patients.filter(patient =>
    `${patient.name} ${patient.id} ${patient.phone}`
      .toLowerCase()
      .includes(patientSearch.toLowerCase())
  );

  // DOCTOR FILTER FOR ADMIN
  const filteredDoctors = doctors.filter(doctor =>
    `${doctor.name} ${doctor.specialization} ${doctor.branch}`
      .toLowerCase()
      .includes(doctorSearch.toLowerCase())
  );

  // DOCTOR FILTER FOR PATIENT DIRECTORY
  const directoryDoctors = doctors.filter(doctor => {
    const nameMatch = doctor.name
      .toLowerCase()
      .includes(doctorSearch.toLowerCase());

    const branchMatch =
      doctorBranch === 'All Branches' ||
      doctor.branch === doctorBranch;

    const departmentMatch =
      doctorDepartment === 'All Departments' ||
      doctor.specialization === doctorDepartment;

    return nameMatch && branchMatch && departmentMatch;
  });

  // APPOINTMENT FILTER
  const filteredAppointments = appointments.filter(appointment =>
    `${appointment.patientName} ${appointment.doctorName} ${appointment.id}`
      .toLowerCase()
      .includes(appointmentSearch.toLowerCase())
  );

  // PATIENT CRUD
  const handlePatientSubmit = (e) => {
    e.preventDefault();

    if (!patientForm.name.trim() || !patientForm.phone.trim()) {
      alert('Please enter patient name and phone number.');
      return;
    }

    if (editingPatient) {
      setPatients(patients.map(patient =>
        patient.id === editingPatient
          ? { ...patientForm, id: editingPatient }
          : patient
      ));
    } else {
      const newPatient = {
        ...patientForm,
        id: 'P' + Date.now().toString().slice(-6)
      };

      setPatients([...patients, newPatient]);
    }

    setPatientForm(emptyPatient);
    setEditingPatient(null);
    setShowPatientForm(false);
  };

  const editPatient = (patient) => {
    setPatientForm({ ...patient });
    setEditingPatient(patient.id);
    setShowPatientForm(true);
  };

  const deletePatient = (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      setPatients(patients.filter(patient => patient.id !== id));
    }
  };

  // DOCTOR CRUD
  const handleDoctorSubmit = (e) => {
    e.preventDefault();

    if (!doctorForm.name.trim()) {
      alert('Please enter doctor name.');
      return;
    }

    if (editingDoctor) {
      setDoctors(doctors.map(doctor =>
        doctor.id === editingDoctor
          ? { ...doctorForm, id: editingDoctor }
          : doctor
      ));
    } else {
      const newDoctor = {
        ...doctorForm,
        id: 'D' + Date.now().toString().slice(-6)
      };

      setDoctors([...doctors, newDoctor]);
    }

    setDoctorForm(emptyDoctor);
    setEditingDoctor(null);
    setShowDoctorForm(false);
  };

  const editDoctor = (doctor) => {
    setDoctorForm({ ...doctor });
    setEditingDoctor(doctor.id);
    setShowDoctorForm(true);
  };

  const deleteDoctor = (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      setDoctors(doctors.filter(doctor => doctor.id !== id));
    }
  };

  // APPOINTMENT BOOKING
  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    setAppointmentError('');

    if (
      !appointmentForm.patientName.trim() ||
      !appointmentForm.patientPhone.trim() ||
      !appointmentForm.doctorId ||
      !appointmentForm.date ||
      !appointmentForm.time
    ) {
      setAppointmentError('Please fill in all required fields.');
      return;
    }

    const selectedDoctor = doctors.find(
      doctor => doctor.id === appointmentForm.doctorId
    );

    if (!selectedDoctor) {
      setAppointmentError('Please select a valid doctor.');
      return;
    }

    if (selectedDoctor.availability !== 'Available') {
      setAppointmentError('This doctor is currently unavailable.');
      return;
    }

    const duplicate = appointments.some(appointment =>
      appointment.id !== editingAppointment &&
      appointment.doctorId === appointmentForm.doctorId &&
      appointment.date === appointmentForm.date &&
      appointment.time === appointmentForm.time &&
      appointment.status !== 'Cancelled'
    );

    if (duplicate) {
      setAppointmentError(
        'This doctor already has an appointment at this date and time.'
      );
      return;
    }

    if (editingAppointment) {
      setAppointments(appointments.map(appointment =>
        appointment.id === editingAppointment
          ? {
              ...appointmentForm,
              id: editingAppointment,
              doctorName: selectedDoctor.name,
              fee: selectedDoctor.fee,
              status: appointment.status
            }
          : appointment
      ));
    } else {
      const newAppointment = {
        ...appointmentForm,
        id: 'A' + Date.now().toString().slice(-6),
        doctorName: selectedDoctor.name,
        fee: selectedDoctor.fee,
        status: 'Pending'
      };

      setAppointments([...appointments, newAppointment]);
    }

    setAppointmentForm(emptyAppointment);
    setEditingAppointment(null);
    setShowAppointmentForm(false);
    setAppointmentError('');

    alert(
      editingAppointment
        ? 'Appointment updated successfully!'
        : 'Appointment booked successfully!'
    );
  };

  const editAppointment = (appointment) => {
    setAppointmentForm({
      patientName: appointment.patientName,
      patientPhone: appointment.patientPhone,
      doctorId: appointment.doctorId,
      branch: appointment.branch,
      date: appointment.date,
      time: appointment.time,
      reason: appointment.reason
    });

    setEditingAppointment(appointment.id);
    setShowAppointmentForm(true);
    setAppointmentError('');
  };

  const deleteAppointment = (id) => {
    if (window.confirm('Delete this appointment?')) {
      setAppointments(appointments.filter(
        appointment => appointment.id !== id
      ));
    }
  };

  const updateAppointmentStatus = (id, status) => {
    setAppointments(appointments.map(appointment =>
      appointment.id === id
        ? { ...appointment, status }
        : appointment
    ));
  };

  // BILLING MANAGEMENT
  const filteredBills = bills.filter(bill =>
    `${bill.id} ${bill.patientName} ${bill.doctorName} ${bill.paymentStatus}`
      .toLowerCase()
      .includes(billSearch.toLowerCase())
  );

  const paidRevenue = bills
    .filter(bill => bill.paymentStatus === 'Paid')
    .reduce((total, bill) => total + Number(bill.amount || 0), 0);

  const pendingAmount = bills
    .filter(bill => bill.paymentStatus === 'Pending' || bill.paymentStatus === 'Unpaid')
    .reduce((total, bill) => total + Number(bill.amount || 0), 0);

  const openNewBill = () => {
    setBillForm({
      appointmentId: '',
      patientId: '',
      patientName: '',
      doctorName: '',
      amount: '',
      paymentMethod: 'Cash',
      paymentStatus: 'Pending',
      billDate: new Date().toISOString().split('T')[0],
      description: ''
    });
    setEditingBill(null);
    setShowBillForm(true);
    setViewingBill(null);
  };

  const handleBillAppointmentChange = (appointmentId) => {
    const appointment = appointments.find(item => item.id === appointmentId);
    if (!appointment) {
      setBillForm({
        ...billForm,
        appointmentId: '',
        patientId: '',
        patientName: '',
        doctorName: '',
        amount: ''
      });
      return;
    }

    const patient = patients.find(item =>
      item.name === appointment.patientName &&
      item.phone === appointment.patientPhone
    );

    setBillForm({
      ...billForm,
      appointmentId,
      patientId: patient ? patient.id : '',
      patientName: appointment.patientName,
      doctorName: appointment.doctorName,
      amount: appointment.fee || ''
    });
  };

  const handleBillPatientChange = (patientId) => {
    const patient = patients.find(item => item.id === patientId);
    setBillForm({
      ...billForm,
      patientId,
      patientName: patient ? patient.name : ''
    });
  };

  const handleBillSubmit = (e) => {
    e.preventDefault();

    if (!billForm.patientName.trim() || !billForm.amount || Number(billForm.amount) <= 0) {
      alert('Please select a patient and enter a valid bill amount.');
      return;
    }

    const billData = {
      ...billForm,
      amount: Number(billForm.amount),
      id: editingBill || ('B' + Date.now().toString().slice(-6))
    };

    if (editingBill) {
      setBills(bills.map(bill => bill.id === editingBill ? billData : bill));
      alert('Bill updated successfully!');
    } else {
      setBills([...bills, billData]);
      alert('Bill created successfully!');
    }

    setBillForm({
      appointmentId: '',
      patientId: '',
      patientName: '',
      doctorName: '',
      amount: '',
      paymentMethod: 'Cash',
      paymentStatus: 'Pending',
      billDate: new Date().toISOString().split('T')[0],
      description: ''
    });
    setEditingBill(null);
    setShowBillForm(false);
  };

  const editBill = (bill) => {
    setBillForm({ ...bill });
    setEditingBill(bill.id);
    setShowBillForm(true);
    setViewingBill(null);
  };

  const deleteBill = (id) => {
    if (window.confirm('Are you sure you want to delete this bill?')) {
      setBills(bills.filter(bill => bill.id !== id));
      if (viewingBill && viewingBill.id === id) setViewingBill(null);
    }
  };

  const updateBillStatus = (id, paymentStatus) => {
    setBills(bills.map(bill =>
      bill.id === id ? { ...bill, paymentStatus } : bill
    ));
  };

  const openNewAppointment = (doctor = null) => {
    setAppointmentForm({
      ...emptyAppointment,
      doctorId: doctor ? doctor.id : '',
      branch: doctor ? doctor.branch : ''
    });

    setEditingAppointment(null);
    setAppointmentError('');
    setShowAppointmentForm(true);
    setViewingDoctor(null);
    setActivePage('Appointments');
  };

  const menuItems = [
    { name: 'Dashboard', icon: '▦' },
    { name: 'Find a Doctor', icon: '⚕' },
    { name: 'Patients', icon: '♙' },
    { name: 'Doctors', icon: '⚕' },
    { name: 'Appointments', icon: '▣' },
    { name: 'Billing', icon: '💳' },
    { name: 'Settings', icon: '⚙' }
  ];

  return (
    <div className="app-container">

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? '' : 'sidebar-closed'}`}>
        <div className="sidebar-logo">
          <span>✚</span>
          {sidebarOpen && <h2>MediCare</h2>}
        </div>

        <p className="menu-label">MENU</p>

        <nav>
          {menuItems.map(item => (
            <button
              key={item.name}
              className={`menu-item ${activePage === item.name ? 'active' : ''}`}
              onClick={() => {
                setActivePage(item.name);
                setViewingDoctor(null);
                setViewingPatient(null);
                setViewingAppointment(null);
              }}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">

        {/* TOPBAR */}
        <header className="topbar">
          <button
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>

          <h3>{activePage}</h3>

          <div className="admin-profile">
            <span>👤</span>
            <span>Admin</span>
          </div>
        </header>

        <div className="page-content">

          {/* DASHBOARD */}
          {activePage === 'Dashboard' && (
            <div className="dashboard-page">

              <div className="dashboard-banner">
                <div className="banner-content">
                  <span className="banner-icon">✚</span>
                  <div>
                    <h2>MediCare Hospital</h2>
                    <p>Better Care. Healthier Tomorrow.</p>
                  </div>
                </div>
                <span className="banner-heart">♡</span>
              </div>

              <h2 className="section-heading">Overview</h2>

              <div className="stats-grid">
                <div className="stat-card">
                  <p>Total Patients</p>
                  <h2>{patients.length}</h2>
                  <span>Registered patients</span>
                </div>

                <div className="stat-card">
                  <p>Total Doctors</p>
                  <h2>{doctors.length}</h2>
                  <span>Medical professionals</span>
                </div>

                <div className="stat-card">
                  <p>Appointments</p>
                  <h2>{appointments.length}</h2>
                  <span>Total booked appointments</span>
                </div>

                <div className="stat-card">
                  <p>Total Revenue</p>
                  <h2>৳{paidRevenue.toLocaleString('en-BD')}</h2>
                  <span>Collected from bills</span>
                </div>
              </div>

              <div className="panel">
                <h3>Recent Patients</h3>

                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Patient ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {patients.slice(0, 5).map(patient => (
                        <tr key={patient.id}>
                          <td>{patient.id}</td>
                          <td>{patient.name}</td>
                          <td>{patient.age}</td>
                          <td>{patient.gender}</td>
                          <td>{patient.status}</td>
                        </tr>
                      ))}

                      {patients.length === 0 && (
                        <tr>
                          <td colSpan="5">No patients found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* FIND A DOCTOR */}
          {activePage === 'Find a Doctor' && (
            <div className="find-doctor-page">

              <div className="find-doctor-banner">
                <h1>Find Your Doctor</h1>
                <p>Find the right specialist for your healthcare needs.</p>
              </div>

              <div className="doctor-filter-panel">

                <div className="filter-field">
                  <label>Doctor Name</label>
                  <input
                    type="text"
                    placeholder="Search doctor by name..."
                    value={doctorSearch}
                    onChange={e => setDoctorSearch(e.target.value)}
                  />
                </div>

                <div className="filter-field">
                  <label>Select Branch</label>
                  <select
                    value={doctorBranch}
                    onChange={e => setDoctorBranch(e.target.value)}
                  >
                    <option>All Branches</option>
                    <option>Dhanmondi</option>
                    <option>Uttara</option>
                    <option>Mirpur</option>
                    <option>Badda</option>
                    <option>Kallyanpur</option>
                  </select>
                </div>

                <div className="filter-field">
                  <label>Select Department</label>
                  <select
                    value={doctorDepartment}
                    onChange={e => setDoctorDepartment(e.target.value)}
                  >
                    <option>All Departments</option>
                    {departments.map(department => (
                      <option key={department}>{department}</option>
                    ))}
                  </select>
                </div>

                <button
                  className="doctor-search-btn"
                  onClick={() => setViewingDoctor(null)}
                >
                  Search Doctor
                </button>
              </div>

              <div className="find-doctor-heading">
                <div>
                  <h2>Available Doctors</h2>
                  <p>Explore our experienced medical professionals.</p>
                </div>

                <span>{directoryDoctors.length} doctors found</span>
              </div>

              <div className="doctor-card-grid">
                {directoryDoctors.map(doctor => (
                  <div className="doctor-profile-card" key={doctor.id}>

                    <div className="doctor-avatar">⚕</div>

                    <div className="doctor-card-info">
                      <h3>{doctor.name}</h3>
                      <p className="doctor-specialty">
                        {doctor.specialization}
                      </p>

                      <p>{doctor.qualification || 'Qualification not added'}</p>
                      <p>{doctor.experience} years of experience</p>

                      <div className="doctor-card-meta">
                        <span>📍 {doctor.branch} Branch</span>
                        <span>🏥 {doctor.chamber || 'Chamber not added'}</span>
                      </div>

                      <span className={`doctor-availability ${
                        doctor.availability === 'Available'
                          ? 'available'
                          : 'unavailable'
                      }`}>
                        {doctor.availability}
                      </span>

                      <button
                        className="doctor-details-btn"
                        onClick={() => setViewingDoctor(doctor)}
                      >
                        View Details
                      </button>

                      <button
                        className="doctor-details-btn"
                        disabled={doctor.availability !== 'Available'}
                        onClick={() => openNewAppointment(doctor)}
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {directoryDoctors.length === 0 && (
                <div className="no-doctors">
                  <h3>No doctors found</h3>
                  <p>Try changing your search filters.</p>
                </div>
              )}

              {viewingDoctor && (
                <div
                  className="modal-overlay"
                  onClick={() => setViewingDoctor(null)}
                >
                  <div
                    className="doctor-modal"
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      className="modal-close"
                      onClick={() => setViewingDoctor(null)}
                    >
                      ×
                    </button>

                    <div className="doctor-avatar">⚕</div>
                    <h2>{viewingDoctor.name}</h2>
                    <p>{viewingDoctor.specialization}</p>

                    <div className="doctor-detail-list">
                      <p><strong>Qualification:</strong> {viewingDoctor.qualification}</p>
                      <p><strong>Experience:</strong> {viewingDoctor.experience} years</p>
                      <p><strong>Branch:</strong> {viewingDoctor.branch}</p>
                      <p><strong>Chamber:</strong> {viewingDoctor.chamber}</p>
                      <p><strong>Visiting Days:</strong> {viewingDoctor.visitingDays}</p>
                      <p><strong>Visiting Time:</strong> {viewingDoctor.visitingTime}</p>
                      <p><strong>Consultation Fee:</strong> ৳{viewingDoctor.fee}</p>
                      <p><strong>Phone:</strong> {viewingDoctor.phone}</p>
                      <p><strong>Email:</strong> {viewingDoctor.email}</p>
                    </div>

                    <button
                      className="doctor-details-btn"
                      disabled={viewingDoctor.availability !== 'Available'}
                      onClick={() => openNewAppointment(viewingDoctor)}
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* PATIENTS */}
          {activePage === 'Patients' && (
            <div className="patients-page">

              <div className="patients-heading">
                <div>
                  <h2>Patient Management</h2>
                  <p>Manage patient records and medical information.</p>
                </div>

                <button
                  className="add-patient-btn"
                  onClick={() => {
                    setPatientForm(emptyPatient);
                    setEditingPatient(null);
                    setShowPatientForm(true);
                  }}
                >
                  + Add Patient
                </button>
              </div>

              <div className="panel">

                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search by patient name, ID or phone..."
                    value={patientSearch}
                    onChange={e => setPatientSearch(e.target.value)}
                  />
                </div>

                {showPatientForm && (
                  <form
                    className="patient-form"
                    onSubmit={handlePatientSubmit}
                  >
                    <h3>
                      {editingPatient ? 'Edit Patient' : 'Add New Patient'}
                    </h3>

                    <input
                      placeholder="Patient Name"
                      value={patientForm.name}
                      onChange={e => setPatientForm({
                        ...patientForm,
                        name: e.target.value
                      })}
                      required
                    />

                    <input
                      type="number"
                      placeholder="Age"
                      value={patientForm.age}
                      onChange={e => setPatientForm({
                        ...patientForm,
                        age: e.target.value
                      })}
                      required
                    />

                    <select
                      value={patientForm.gender}
                      onChange={e => setPatientForm({
                        ...patientForm,
                        gender: e.target.value
                      })}
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>

                    <input
                      placeholder="Phone Number"
                      value={patientForm.phone}
                      onChange={e => setPatientForm({
                        ...patientForm,
                        phone: e.target.value
                      })}
                      required
                    />

                    <input
                      type="email"
                      placeholder="Email"
                      value={patientForm.email}
                      onChange={e => setPatientForm({
                        ...patientForm,
                        email: e.target.value
                      })}
                    />

                    <input
                      placeholder="Address"
                      value={patientForm.address}
                      onChange={e => setPatientForm({
                        ...patientForm,
                        address: e.target.value
                      })}
                    />

                    <select
                      value={patientForm.status}
                      onChange={e => setPatientForm({
                        ...patientForm,
                        status: e.target.value
                      })}
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>

                    <div className="form-buttons">
                      <button type="submit" className="add-patient-btn">
                        {editingPatient ? 'Update Patient' : 'Save Patient'}
                      </button>

                      <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => {
                          setShowPatientForm(false);
                          setEditingPatient(null);
                          setPatientForm(emptyPatient);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredPatients.map(patient => (
                        <tr key={patient.id}>
                          <td>{patient.id}</td>
                          <td>{patient.name}</td>
                          <td>{patient.age}</td>
                          <td>{patient.gender}</td>
                          <td>{patient.phone}</td>
                          <td>{patient.status}</td>

                          <td>
                            <button onClick={() => setViewingPatient(patient)}>
                              View
                            </button>

                            <button onClick={() => editPatient(patient)}>
                              Edit
                            </button>

                            <button onClick={() => deletePatient(patient.id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}

                      {filteredPatients.length === 0 && (
                        <tr>
                          <td colSpan="7">No patients found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {viewingPatient && (
                  <div className="panel">
                    <h3>Patient Details</h3>
                    <p><strong>Name:</strong> {viewingPatient.name}</p>
                    <p><strong>Age:</strong> {viewingPatient.age}</p>
                    <p><strong>Gender:</strong> {viewingPatient.gender}</p>
                    <p><strong>Phone:</strong> {viewingPatient.phone}</p>
                    <p><strong>Email:</strong> {viewingPatient.email}</p>
                    <p><strong>Address:</strong> {viewingPatient.address}</p>

                    <button
                      onClick={() => setViewingPatient(null)}
                      className="cancel-btn"
                    >
                      Close
                    </button>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* DOCTORS */}
          {activePage === 'Doctors' && (
            <div className="patients-page">

              <div className="patients-heading">
                <div>
                  <h2>Doctor Management</h2>
                  <p>Manage hospital doctors and their information.</p>
                </div>

                <button
                  className="add-patient-btn"
                  onClick={() => {
                    setDoctorForm(emptyDoctor);
                    setEditingDoctor(null);
                    setShowDoctorForm(true);
                  }}
                >
                  + Add Doctor
                </button>
              </div>

              <div className="panel">

                <input
                  className="search-input"
                  placeholder="Search doctors..."
                  value={doctorSearch}
                  onChange={e => setDoctorSearch(e.target.value)}
                />

                {showDoctorForm && (
                  <form
                    className="patient-form"
                    onSubmit={handleDoctorSubmit}
                  >
                    <h3>
                      {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
                    </h3>

                    <input
                      placeholder="Doctor Name"
                      value={doctorForm.name}
                      onChange={e => setDoctorForm({
                        ...doctorForm,
                        name: e.target.value
                      })}
                      required
                    />

                    <select
                      value={doctorForm.specialization}
                      onChange={e => setDoctorForm({
                        ...doctorForm,
                        specialization: e.target.value
                      })}
                    >
                      {departments.map(department => (
                        <option key={department}>{department}</option>
                      ))}
                    </select>

                    <input
                      placeholder="Qualification"
                      value={doctorForm.qualification}
                      onChange={e => setDoctorForm({
                        ...doctorForm,
                        qualification: e.target.value
                      })}
                    />

                    <input
                      type="email"
                      placeholder="Email"
                      value={doctorForm.email}
                      onChange={e => setDoctorForm({
                        ...doctorForm,
                        email: e.target.value
                      })}
                    />

                    <input
                      placeholder="Phone"
                      value={doctorForm.phone}
                      onChange={e => setDoctorForm({
                        ...doctorForm,
                        phone: e.target.value
                      })}
                    />

                    <input
                      type="number"
                      placeholder="Experience (Years)"
                      value={doctorForm.experience}
                      onChange={e => setDoctorForm({
                        ...doctorForm,
                        experience: e.target.value
                      })}
                    />

                    <select
                      value={doctorForm.branch}
                      onChange={e => setDoctorForm({
                        ...doctorForm,
                        branch: e.target.value
                      })}
                    >
                      <option>Dhanmondi</option>
                      <option>Uttara</option>
                      <option>Mirpur</option>
                      <option>Badda</option>
                      <option>Kallyanpur</option>
                    </select>

                    <input
                      placeholder="Chamber / Room"
                      value={doctorForm.chamber}
                      onChange={e => setDoctorForm({
                        ...doctorForm,
                        chamber: e.target.value
                      })}
                    />

                    <input
                      placeholder="Visiting Days"
                      value={doctorForm.visitingDays}
                      onChange={e => setDoctorForm({
                        ...doctorForm,
                        visitingDays: e.target.value
                      })}
                    />

                    <input
                      placeholder="Visiting Time"
                      value={doctorForm.visitingTime}
                      onChange={e => setDoctorForm({
                        ...doctorForm,
                        visitingTime: e.target.value
                      })}
                    />

                    <input
                      type="number"
                      placeholder="Consultation Fee"
                      value={doctorForm.fee}
                      onChange={e => setDoctorForm({
                        ...doctorForm,
                        fee: e.target.value
                      })}
                    />

                    <select
                      value={doctorForm.availability}
                      onChange={e => setDoctorForm({
                        ...doctorForm,
                        availability: e.target.value
                      })}
                    >
                      <option>Available</option>
                      <option>Unavailable</option>
                    </select>

                    <div className="form-buttons">
                      <button type="submit" className="add-patient-btn">
                        {editingDoctor ? 'Update Doctor' : 'Save Doctor'}
                      </button>

                      <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => {
                          setShowDoctorForm(false);
                          setEditingDoctor(null);
                          setDoctorForm(emptyDoctor);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Specialization</th>
                        <th>Branch</th>
                        <th>Fee</th>
                        <th>Availability</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredDoctors.map(doctor => (
                        <tr key={doctor.id}>
                          <td>{doctor.id}</td>
                          <td>{doctor.name}</td>
                          <td>{doctor.specialization}</td>
                          <td>{doctor.branch}</td>
                          <td>৳{doctor.fee}</td>
                          <td>{doctor.availability}</td>

                          <td>
                            <button onClick={() => setViewingDoctor(doctor)}>
                              View
                            </button>

                            <button onClick={() => editDoctor(doctor)}>
                              Edit
                            </button>

                            <button onClick={() => deleteDoctor(doctor.id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}

                      {filteredDoctors.length === 0 && (
                        <tr>
                          <td colSpan="7">No doctors found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          )}

          {/* APPOINTMENTS */}
          {activePage === 'Appointments' && (
            <div className="appointments-page">

              <div className="patients-heading">
                <div>
                  <h2>Appointment Management</h2>
                  <p>Book and manage patient appointments.</p>
                </div>

                <button
                  className="add-patient-btn"
                  onClick={() => openNewAppointment()}
                >
                  + Book Appointment
                </button>
              </div>

              <div className="appointment-summary-grid">
                <div className="stat-card">
                  <p>Total Appointments</p>
                  <h2>{appointments.length}</h2>
                </div>

                <div className="stat-card">
                  <p>Pending</p>
                  <h2>
                    {appointments.filter(a => a.status === 'Pending').length}
                  </h2>
                </div>

                <div className="stat-card">
                  <p>Confirmed</p>
                  <h2>
                    {appointments.filter(a => a.status === 'Confirmed').length}
                  </h2>
                </div>

                <div className="stat-card">
                  <p>Cancelled</p>
                  <h2>
                    {appointments.filter(a => a.status === 'Cancelled').length}
                  </h2>
                </div>
              </div>

              {showAppointmentForm && (
                <div className="panel appointment-form-panel">
                  <h3>
                    {editingAppointment
                      ? 'Edit Appointment'
                      : 'Book New Appointment'}
                  </h3>

                  <form
                    className="patient-form"
                    onSubmit={handleAppointmentSubmit}
                  >
                    <input
                      placeholder="Patient Name"
                      value={appointmentForm.patientName}
                      onChange={e => setAppointmentForm({
                        ...appointmentForm,
                        patientName: e.target.value
                      })}
                      required
                    />

                    <input
                      placeholder="Patient Phone"
                      value={appointmentForm.patientPhone}
                      onChange={e => setAppointmentForm({
                        ...appointmentForm,
                        patientPhone: e.target.value
                      })}
                      required
                    />

                    <select
                      value={appointmentForm.doctorId}
                      onChange={e => {
                        const doctor = doctors.find(
                          d => d.id === e.target.value
                        );

                        setAppointmentForm({
                          ...appointmentForm,
                          doctorId: e.target.value,
                          branch: doctor ? doctor.branch : ''
                        });
                      }}
                      required
                    >
                      <option value="">Select Doctor</option>
                      {doctors
                        .filter(d => d.availability === 'Available')
                        .map(doctor => (
                          <option key={doctor.id} value={doctor.id}>
                            {doctor.name} - {doctor.specialization}
                          </option>
                        ))}
                    </select>

                    <select
                      value={appointmentForm.branch}
                      onChange={e => setAppointmentForm({
                        ...appointmentForm,
                        branch: e.target.value
                      })}
                      required
                    >
                      <option value="">Select Branch</option>
                      <option>Dhanmondi</option>
                      <option>Uttara</option>
                      <option>Mirpur</option>
                      <option>Badda</option>
                      <option>Kallyanpur</option>
                    </select>

                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={appointmentForm.date}
                      onChange={e => setAppointmentForm({
                        ...appointmentForm,
                        date: e.target.value
                      })}
                      required
                    />

                    <select
                      value={appointmentForm.time}
                      onChange={e => setAppointmentForm({
                        ...appointmentForm,
                        time: e.target.value
                      })}
                      required
                    >
                      <option value="">Select Time</option>
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>12:00 PM</option>
                      <option>02:00 PM</option>
                      <option>03:00 PM</option>
                      <option>04:00 PM</option>
                      <option>05:00 PM</option>
                      <option>06:00 PM</option>
                      <option>07:00 PM</option>
                      <option>08:00 PM</option>
                    </select>

                    <input
                      placeholder="Reason for Appointment"
                      value={appointmentForm.reason}
                      onChange={e => setAppointmentForm({
                        ...appointmentForm,
                        reason: e.target.value
                      })}
                    />

                    {appointmentError && (
                      <p className="appointment-error">
                        {appointmentError}
                      </p>
                    )}

                    <div className="form-buttons">
                      <button
                        type="submit"
                        className="add-patient-btn"
                      >
                        {editingAppointment
                          ? 'Update Appointment'
                          : 'Confirm Booking'}
                      </button>

                      <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => {
                          setShowAppointmentForm(false);
                          setEditingAppointment(null);
                          setAppointmentForm(emptyAppointment);
                          setAppointmentError('');
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="panel">
                <h3>All Appointments</h3>

                <input
                  className="search-input"
                  placeholder="Search patient, doctor or appointment ID..."
                  value={appointmentSearch}
                  onChange={e => setAppointmentSearch(e.target.value)}
                />

                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Appointment ID</th>
                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Branch</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Fee</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredAppointments.map(appointment => (
                        <tr key={appointment.id}>
                          <td>{appointment.id}</td>
                          <td>{appointment.patientName}</td>
                          <td>{appointment.doctorName}</td>
                          <td>{appointment.branch}</td>
                          <td>{appointment.date}</td>
                          <td>{appointment.time}</td>
                          <td>৳{appointment.fee}</td>

                          <td>
                            <select
                              value={appointment.status}
                              onChange={e => updateAppointmentStatus(
                                appointment.id,
                                e.target.value
                              )}
                            >
                              <option>Pending</option>
                              <option>Confirmed</option>
                              <option>Cancelled</option>
                            </select>
                          </td>

                          <td>
                            <button
                              onClick={() => setViewingAppointment(appointment)}
                            >
                              View
                            </button>

                            <button
                              onClick={() => editAppointment(appointment)}
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => deleteAppointment(appointment.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}

                      {filteredAppointments.length === 0 && (
                        <tr>
                          <td colSpan="9">No appointments found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {viewingAppointment && (
                <div className="panel">
                  <h3>Appointment Details</h3>
                  <p><strong>ID:</strong> {viewingAppointment.id}</p>
                  <p><strong>Patient:</strong> {viewingAppointment.patientName}</p>
                  <p><strong>Phone:</strong> {viewingAppointment.patientPhone}</p>
                  <p><strong>Doctor:</strong> {viewingAppointment.doctorName}</p>
                  <p><strong>Branch:</strong> {viewingAppointment.branch}</p>
                  <p><strong>Date:</strong> {viewingAppointment.date}</p>
                  <p><strong>Time:</strong> {viewingAppointment.time}</p>
                  <p><strong>Fee:</strong> ৳{viewingAppointment.fee}</p>
                  <p><strong>Reason:</strong> {viewingAppointment.reason}</p>
                  <p><strong>Status:</strong> {viewingAppointment.status}</p>

                  <button
                    className="cancel-btn"
                    onClick={() => setViewingAppointment(null)}
                  >
                    Close
                  </button>
                </div>
              )}

            </div>
          )}

          {/* BILLING */}
          {activePage === 'Billing' && (
            <div className="patients-page">
              <div className="patients-heading">
                <div>
                  <h2>Billing Management</h2>
                  <p>Create, update and manage patient bills and payments.</p>
                </div>
                <button className="add-patient-btn" onClick={openNewBill}>
                  + Create New Bill
                </button>
              </div>

              <div className="appointment-summary-grid">
                <div className="stat-card">
                  <p>Total Bills</p>
                  <h2>{bills.length}</h2>
                  <span>All generated bills</span>
                </div>
                <div className="stat-card">
                  <p>Total Revenue</p>
                  <h2>৳{paidRevenue.toLocaleString('en-BD')}</h2>
                  <span>Paid bills only</span>
                </div>
                <div className="stat-card">
                  <p>Pending Amount</p>
                  <h2>৳{pendingAmount.toLocaleString('en-BD')}</h2>
                  <span>Pending and unpaid</span>
                </div>
                <div className="stat-card">
                  <p>Paid Bills</p>
                  <h2>{bills.filter(bill => bill.paymentStatus === 'Paid').length}</h2>
                  <span>Successfully paid</span>
                </div>
              </div>

              {showBillForm && (
                <div className="panel appointment-form-panel">
                  <h3>{editingBill ? 'Edit Bill' : 'Create New Bill'}</h3>
                  <form className="patient-form" onSubmit={handleBillSubmit}>
                    <select
                      value={billForm.appointmentId}
                      onChange={e => handleBillAppointmentChange(e.target.value)}
                    >
                      <option value="">Link an appointment (optional)</option>
                      {appointments.map(appointment => (
                        <option key={appointment.id} value={appointment.id}>
                          {appointment.id} - {appointment.patientName} - {appointment.doctorName}
                        </option>
                      ))}
                    </select>

                    <select
                      value={billForm.patientId}
                      onChange={e => handleBillPatientChange(e.target.value)}
                    >
                      <option value="">Select Patient</option>
                      {patients.map(patient => (
                        <option key={patient.id} value={patient.id}>
                          {patient.name} ({patient.id})
                        </option>
                      ))}
                    </select>

                    <input
                      placeholder="Patient Name"
                      value={billForm.patientName}
                      onChange={e => setBillForm({ ...billForm, patientName: e.target.value })}
                      required
                    />
                    <input
                      placeholder="Doctor Name"
                      value={billForm.doctorName}
                      onChange={e => setBillForm({ ...billForm, doctorName: e.target.value })}
                    />
                    <input
                      type="number"
                      min="1"
                      placeholder="Bill Amount (BDT)"
                      value={billForm.amount}
                      onChange={e => setBillForm({ ...billForm, amount: e.target.value })}
                      required
                    />
                    <input
                      type="date"
                      value={billForm.billDate}
                      onChange={e => setBillForm({ ...billForm, billDate: e.target.value })}
                      required
                    />
                    <select
                      value={billForm.paymentMethod}
                      onChange={e => setBillForm({ ...billForm, paymentMethod: e.target.value })}
                    >
                      <option>Cash</option>
                      <option>Card</option>
                      <option>bKash</option>
                    </select>
                    <select
                      value={billForm.paymentStatus}
                      onChange={e => setBillForm({ ...billForm, paymentStatus: e.target.value })}
                    >
                      <option>Pending</option>
                      <option>Paid</option>
                      <option>Unpaid</option>
                    </select>
                    <input
                      placeholder="Description / Notes"
                      value={billForm.description}
                      onChange={e => setBillForm({ ...billForm, description: e.target.value })}
                    />

                    <div className="form-buttons">
                      <button type="submit" className="add-patient-btn">
                        {editingBill ? 'Update Bill' : 'Save Bill'}
                      </button>
                      <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => {
                          setShowBillForm(false);
                          setEditingBill(null);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="panel">
                <h3>Billing History</h3>
                <input
                  className="search-input"
                  placeholder="Search by bill ID, patient or doctor..."
                  value={billSearch}
                  onChange={e => setBillSearch(e.target.value)}
                />
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Bill ID</th>
                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Payment Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBills.map(bill => (
                        <tr key={bill.id}>
                          <td>{bill.id}</td>
                          <td>{bill.patientName}</td>
                          <td>{bill.doctorName || 'N/A'}</td>
                          <td>{bill.billDate}</td>
                          <td>৳{Number(bill.amount).toLocaleString('en-BD')}</td>
                          <td>{bill.paymentMethod}</td>
                          <td>
                            <select
                              value={bill.paymentStatus}
                              onChange={e => updateBillStatus(bill.id, e.target.value)}
                            >
                              <option>Pending</option>
                              <option>Paid</option>
                              <option>Unpaid</option>
                            </select>
                          </td>
                          <td>
                            <button onClick={() => setViewingBill(bill)}>View</button>
                            <button onClick={() => editBill(bill)}>Edit</button>
                            <button onClick={() => deleteBill(bill.id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                      {filteredBills.length === 0 && (
                        <tr>
                          <td colSpan="8">No bills found. Click “Create New Bill” to add one.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {viewingBill && (
                <div className="panel">
                  <h3>Bill / Receipt Details</h3>
                  <p><strong>Bill ID:</strong> {viewingBill.id}</p>
                  <p><strong>Patient:</strong> {viewingBill.patientName}</p>
                  <p><strong>Doctor:</strong> {viewingBill.doctorName || 'N/A'}</p>
                  <p><strong>Appointment ID:</strong> {viewingBill.appointmentId || 'Not linked'}</p>
                  <p><strong>Bill Date:</strong> {viewingBill.billDate}</p>
                  <p><strong>Amount:</strong> ৳{Number(viewingBill.amount).toLocaleString('en-BD')}</p>
                  <p><strong>Payment Method:</strong> {viewingBill.paymentMethod}</p>
                  <p><strong>Payment Status:</strong> {viewingBill.paymentStatus}</p>
                  <p><strong>Description:</strong> {viewingBill.description || 'N/A'}</p>
                  <button className="cancel-btn" onClick={() => setViewingBill(null)}>Close</button>
                  <button className="add-patient-btn" onClick={() => window.print()}>Print Receipt</button>
                </div>
              )}
            </div>
          )}

          {/* SETTINGS */}

{/* SETTINGS */}
{activePage === 'Settings' && (
  <div className="patients-page">
    <div className="patients-heading">
      <div>
        <h2>Hospital Settings</h2>
        <p>Manage your hospital information and preferences.</p>
      </div>
    </div>

    <div className="panel">
      <h3>Hospital Information</h3>

      <form className="patient-form" onSubmit={handleSettingsSave}>
        <input
          placeholder="Hospital Name"
          value={settings.hospitalName}
          onChange={e => setSettings({
            ...settings,
            hospitalName: e.target.value
          })}
          required
        />

        <input
          placeholder="Hospital Address"
          value={settings.address}
          onChange={e => setSettings({
            ...settings,
            address: e.target.value
          })}
          required
        />

        <input
          placeholder="Contact Number"
          value={settings.phone}
          onChange={e => setSettings({
            ...settings,
            phone: e.target.value
          })}
          required
        />

        <input
          type="email"
          placeholder="Hospital Email"
          value={settings.email}
          onChange={e => setSettings({
            ...settings,
            email: e.target.value
          })}
          required
        />

        <hr />

        <h3>Admin Information</h3>

        <input
          placeholder="Admin Name"
          value={settings.adminName}
          onChange={e => setSettings({
            ...settings,
            adminName: e.target.value
          })}
          required
        />

        <hr />

        <h3>Appearance</h3>

        <select
          value={settings.theme}
          onChange={e => setSettings({
            ...settings,
            theme: e.target.value
          })}
        >
          <option value="Light">Light Theme</option>
          <option value="Dark">Dark Theme</option>
        </select>

        <div className="form-buttons">
          <button type="submit" className="add-patient-btn">
            Save Settings
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={handleSettingsReset}
          >
            Reset
          </button>
        </div>


        {settingsMessage && (
          <p style={{ color: 'green', marginTop: '15px' }}>
            {settingsMessage}
          </p>
        )}

      </form>
    </div>
  </div>
)}

        </div>
      </main>
    </div>
  );
}

export default App;


        