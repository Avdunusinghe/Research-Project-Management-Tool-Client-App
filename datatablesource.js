export const userColumns = [
  { field: "id", headerName: "Id", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "age",
    headerName: "Age",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
export const userRows = [
  {
    id: 1,
    username: "Ashen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    email: "avdunusinghe@gmail.com",
    age: 21,
  },
  {
    id: 2,
    username: "Ashen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "avdunusinghe@gmail.com",
    status: "passive",
    age: 21,
  },
  {
    id: 3,
    username: "Ashen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "avdunusinghe@gmail.com",
    status: "pending",
    age: 21,
  },
  {
    id: 4,
    username: "Ashen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "avdunusinghe@gmail.com",
    status: "active",
    age: 21,
  },
  {
    id: 5,
    username: "Ashen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "avdunusinghe@gmail.com",
    status: "passive",
    age: 21,
  },
  {
    id: 6,
    username: "Ashen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "avdunusinghe@gmail.com",
    status: "active",
    age: 21,
  },
  {
    id: 7,
    username: "Ashen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "avdunusinghe@gmail.com",
    status: "passive",
    age: 21,
  },
  {
    id: 8,
    username: "Ashen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "avdunusinghe@gmail.com",
    status: "active",
    age: 21,
  },
  {
    id: 9,
    username: "Ashen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "avdunusinghe@gmail.com",
    status: "pending",
    age: 21,
  },
  {
    id: 10,
    username: "Ashen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "avdunusinghe@gmail.com",
    status: "active",
    age: 21,
  },
];
