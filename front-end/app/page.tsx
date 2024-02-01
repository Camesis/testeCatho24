import { Box, Container } from "@mui/material";

export default function Home() {

  return (
    <Container maxWidth="sm">
      <Box m={2} p={4} border="1px solid #ddd" borderRadius={4} textAlign='center'>
        <h1 className="text-2xl mb-4">Bem-Vindo(a)</h1>
      </Box>
    </Container>
  );
}
