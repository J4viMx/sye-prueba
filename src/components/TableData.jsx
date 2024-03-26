import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CardMedia } from "@mui/material";

export const TableData = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {data.length &&
              Object.keys(data[0]).map((keys, index) => (
                <TableCell key={index}>{keys}</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 &&
            data.map((row) => (
              <TableRow key={row.id}>
                {Object.entries(row).map(([key, value]) => {
                  if (
                    typeof value === "object" &&
                    !Array.isArray(value) &&
                    value !== null
                  ) {
                    return <TableCell key={key}>{value.name}</TableCell>;
                  } else if (Array.isArray(value)) {
                    return (
                      <TableCell key={key}>
                        {value.length > 0 ? value[0] : ""}
                      </TableCell>
                    );
                  } else if (key === "image") {
                    return (
                      <TableCell key={key}>
                        <CardMedia component="img" height="50" image={value} />
                      </TableCell>
                    );
                  } else {
                    return <TableCell key={key}>{value}</TableCell>;
                  }
                })}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
