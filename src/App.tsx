import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { EmployeeTable } from "./components/EmpoyeeTable/EmployeeTable";
import { EmployeeLineItem } from "./interfaces/employees";
import { useEmployee } from "./hooks/useEmployee";
import EmployeeModal from "./components/EmployeeModal/EmployeeModal";
import { writeEmployeesToExcel } from "./utils/excel";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <AppComponent />
    </ThemeProvider>
  );
}

// --- If I have more time ---
// I will Extract head of the component and make seperate file Header.tsx
// and I will Extract Action Buttons to be reusable in other component
// And I will make unit testing with jest and playwright

function AppComponent() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] =
    React.useState<EmployeeLineItem>();
  const { employees, createEmployee, updateEmployee, isLoading } =
    useEmployee();

  const { darkMode, toggleTheme } = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "#333" : "#fff",
        color: darkMode ? "#fff" : "#333",
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">
          Social Pro Tech Task
          <Button
            variant="contained"
            size="small"
            sx={{ marginLeft: 1, fontSize: "0.4rem", padding: "4px 8px" }}
            onClick={() => {
              toggleTheme();
            }}
          >
            {darkMode ? "light" : "dark"}
          </Button>
        </Typography>
        <Box>
          <Button
            color="primary"
            sx={{ marginRight: 1 }}
            onClick={async () => {
              if (employees.length) {
                await writeEmployeesToExcel(employees);
                await writeEmployeesToExcel(employees);
              } else {
                alert("No employees to export");
              }
            }}
          >
            Export
          </Button>
          <Button
            color="primary"
            onClick={() => {
              setSelectedEmployee(undefined);
              setIsModalOpen(true);
            }}
          >
            Add
          </Button>
        </Box>
      </Box>
      <EmployeeTable
        loading={isLoading}
        employees={employees}
        handleEditEmployee={(employee: EmployeeLineItem): void => {
          setIsModalOpen(true);
          setSelectedEmployee(employee);
        }}
      />
      {isModalOpen ? (
        <EmployeeModal
          loading={isLoading}
          existingEmployee={selectedEmployee}
          createEmployee={createEmployee}
          updateEmployee={updateEmployee}
          handleClose={(): void => {
            setIsModalOpen(false);
            setSelectedEmployee(undefined);
          }}
        />
      ) : undefined}
    </Box>
  );
}

export default App;
