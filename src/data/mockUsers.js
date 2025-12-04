// Mock users aligned with backend schema from retail-dataset
// Data extracted from retail-dataset/users.csv
// Schema: user_id, name, surname, email, phone, created_at

export const mockUsers = [
  {
    user_id: "USER00001",
    name: "Jason",
    surname: "Ramirez",
    email: "jason.ramirez@hotmail.com",
    phone: "+14946766309",
    created_at: "2025-04-20 19:50:35"
  },
  {
    user_id: "USER00002",
    name: "Dorothy",
    surname: "Walker",
    email: "dorothy.walker@gmail.com",
    phone: "+15862321353",
    created_at: "2024-10-29 19:50:35"
  },
  {
    user_id: "USER00003",
    name: "Joshua",
    surname: "Martinez",
    email: "joshua.martinez@gmail.com",
    phone: "+12541988748",
    created_at: "2025-09-04 19:50:35"
  },
  {
    user_id: "USER00004",
    name: "Kenneth",
    surname: "Flores",
    email: "kenneth.flores@outlook.com",
    phone: "+17930939207",
    created_at: "2025-08-07 19:50:35"
  },
  {
    user_id: "USER00005",
    name: "Kimberly",
    surname: "Martin",
    email: "kimberly.martin@hotmail.com",
    phone: "+18466292639",
    created_at: "2025-02-17 19:50:35"
  },
  {
    user_id: "USER00006",
    name: "Michael",
    surname: "Campbell",
    email: "michael.campbell@gmail.com",
    phone: "+19957684205",
    created_at: "2025-10-01 19:50:35"
  },
  {
    user_id: "USER00007",
    name: "Deborah",
    surname: "Nguyen",
    email: "deborah.nguyen@yahoo.com",
    phone: "+13847136322",
    created_at: "2024-07-25 19:50:35"
  },
  {
    user_id: "USER00008",
    name: "Anthony",
    surname: "White",
    email: "anthony.white@hotmail.com",
    phone: "+13712533097",
    created_at: "2024-03-11 19:50:35"
  },
  {
    user_id: "USER00009",
    name: "Christopher",
    surname: "Robinson",
    email: "christopher.robinson@outlook.com",
    phone: "+14856616537",
    created_at: "2024-12-22 19:50:35"
  },
  {
    user_id: "USER00010",
    name: "Patricia",
    surname: "Clark",
    email: "patricia.clark@gmail.com",
    phone: "+15551234567",
    created_at: "2025-01-15 10:30:00"
  }
];

// Helper function to get user by ID
export function getUserById(userId) {
  return mockUsers.find(user => user.user_id === userId);
}

// Helper function to get user by email
export function getUserByEmail(email) {
  return mockUsers.find(user => user.email === email);
}

// Helper function to get full name
export function getUserFullName(user) {
  return `${user.name} ${user.surname}`;
}
